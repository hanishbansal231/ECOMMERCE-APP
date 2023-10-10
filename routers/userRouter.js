import { Router } from 'express';
import { login, testController, userRegister } from '../controllers/userController.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import isLoggedIn from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', asyncHandler(userRegister));
router.post('/login', asyncHandler(login));
router.get('/test', isLoggedIn, asyncHandler(testController));

export default router;