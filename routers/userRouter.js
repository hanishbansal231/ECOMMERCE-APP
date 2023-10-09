import {Router} from 'express';
import { login, userRegister } from '../controllers/userController.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const router = Router();

router.post('/register',asyncHandler(userRegister));
router.post('/login',asyncHandler(login));

export default router;