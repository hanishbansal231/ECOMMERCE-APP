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

        await user.save();

        const resetPasswordUrl = `http://localhost:3000/forgot-password/${resetToken}`

        const subject = 'Reset Password';
        const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

        try {
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

const forgotPassword = async (req, res, next) => {
    try {
        const { newPassword, confirmPassword, resetToken } = req.body;

        // Check if newPassword, confirmPassword, and resetToken are present in the request
        if (!newPassword || !confirmPassword || !resetToken) {
            return next(new AppError('All fields are required', 403));
        }

        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            return next(new AppError('Password does not match, please try again...', 402));
        }

        // Hash the resetToken to match the stored value in the database
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Find the user with the matching resetToken that hasn't expired
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpiry: { $gt: Date.now() },
        });

        // Log the user and resetToken for debugging
        // console.log('User:', user);
        // console.log('resetToken:', resetToken);
        // console.log('resetPasswordToken:', resetPasswordToken);

        // If no user is found, return an error
        if (!user) {
            return next(new AppError('Token is invalid or expired', 400));
        }

        // Update the user's password and reset token-related fields
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;

        // Save the changes and send a success response
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Password Change Successful...',
        });

    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

export {
    userRegister,
    login,
    resetPasswordToken,
    forgotPassword
}