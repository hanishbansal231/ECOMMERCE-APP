import AppError from "../helpers/error.helpers.js"
import User from '../models/userModel.js';

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
            phone
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
        console.log(token);
        user.password = undefined;
        user.token = token;
        res.cookie('token', token, cookieOption);

       return res.status(200).json({
            success: true,
            message:'user login successfully...',
            user,
        });

    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

export {
    userRegister,
    login
}