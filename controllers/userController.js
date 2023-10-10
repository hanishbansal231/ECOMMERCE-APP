import sendEmail from "../helpers/emailSend.js";
import AppError from "../helpers/error.helpers.js"
import User from '../models/userModel.js';
import crypto from 'crypto';
const cookieOption = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
}

const userRegister = async (req, res, next) => {
    try {
        const { name, email, password, address, phone } = req.body;

        if (!name || !email || !password || !address || !phone) {
            return next(new AppError('All field are required', 403));
        }

        const existUser = await User.findOne({ email });

        if (existUser) {
            return next(new AppError('User is already registered', 402));
        }

        const user = await User.create({
            name,
            email,
            password,
            address,
            phone,
            image: {
                public_id: email,
                secure_url: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
            }
        });

        if (!user) {
            return next(new AppError('User is not registered please try again after some time', 403));
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'User registered successfully...',
            user,
        });

    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('All field are required...', 403));
        }

        const user = await User.findOne({ email });

        if (!user) {
            return next(new AppError('User is not registered please registered this account', 402));
        }

        if (!await user.comparePassword(password)) {
            return next(new AppError('Password is incorrect...', 403));
        }

        const token = await user.jwtToken();

        user.password = undefined;
        user.token = token;
        res.cookie('token', token, cookieOption);

        return res.status(200).json({
            success: true,
            message: 'user login successfully...',
            user,
        });

    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

const resetPasswordToken = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return next(new AppError('Email is required', 403));
        }

        const user = await User.findOne({ email });

        if (!user) {
            return next(new AppError('User is not registered', 402));
        }

        const resetToken = await user.generatePasswordResetToken();
        console.log(resetToken);
        await user.save();
        console.log(resetToken);
        const url = `http://localhost:3000/forgot-password/${resetToken}`
        console.log(url);
        const subject = 'Reset Password';
        const message = `You can reset your password by clicking <a href=${url} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${url}.\n If you have not requested this, kindly ignore.`;

        try {
            console.log('Starting');
            await sendEmail(email, subject, message);
            res.status(200).json({
                success: true,
                message: `Reset Password token has been sent to ${email} successfully`,
            })
        } catch (e) {
            user.resetPasswordExpiry = undefined;
            user.resetPasswordToken = undefined;
            await user.save();
            return next(new AppError(e.message, 500));
        }

    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}


export {
    userRegister,
    login,
    resetPasswordToken
}