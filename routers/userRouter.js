import { Router } from 'express';
import { login, userRegister,resetPasswordToken, forgotPassword, imageUpdate, updateProfile, changePassword, deleteAccount } from '../controllers/userController.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import isLoggedIn from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';

const router = Router();

router.post('/register', asyncHandler(userRegister));
router.post('/login', asyncHandler(login));
router.post('/reset-password', asyncHandler(resetPasswordToken));
router.post('/forgot-password', asyncHandler(forgotPassword));
router.post('/image-update', isLoggedIn,upload.single('image'),asyncHandler(imageUpdate));
router.put('/profile-update', isLoggedIn,asyncHandler(updateProfile));
router.post('/change-password', isLoggedIn,asyncHandler(changePassword));
router.post('/delete-account', isLoggedIn,asyncHandler(deleteAccount));

export default router;