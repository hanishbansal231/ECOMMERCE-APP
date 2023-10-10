import { Router } from 'express';
import { login, userRegister,resetPasswordToken } from '../controllers/userController.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import isLoggedIn from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', asyncHandler(userRegister));
router.post('/login', asyncHandler(login));
router.post('/reset-password', asyncHandler(resetPasswordToken));

export default router;