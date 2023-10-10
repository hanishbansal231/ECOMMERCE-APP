import AppError from "../helpers/error.helpers.js";
import jwt from 'jsonwebtoken';
import asyncHandler from "./asyncHandler.js";
const isLoggedIn = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            (req.headers.authorization && req.headers.authorization.replace('Bearer ', ''));

        console.log(token);

        if (!token) {
            return next(new AppError('Token is not found', 403));
        }

        const userDetails = jwt.verify(token, process.env.SECRET);

        if (!userDetails) {
            return next('User details not found please try again...', 402);
        }
        req.user = userDetails;
        next();
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
});

export default isLoggedIn;