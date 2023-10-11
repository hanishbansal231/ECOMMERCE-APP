import { Router } from 'express';
import { login, userRegister,resetPasswordToken, forgotPassword } from '../controllers/userController.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import isLoggedIn from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', asyncHandler(userRegister));
router.post('/login', asyncHandler(login));
router.post('/reset-password', asyncHandler(resetPasswordToken));
router.post('/forgot-password', asyncHandler(forgotPassword));

export default router;