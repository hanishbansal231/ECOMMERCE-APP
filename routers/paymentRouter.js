import { Router } from "express";
import isLoggedIn from "../middlewares/authMiddleware.js";
import { capturePayment, verifyPayment } from "../controllers/paymentController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = Router();

router.post("/capturePayment",isLoggedIn,asyncHandler(capturePayment))
router.post("/verifyPayment",isLoggedIn,asyncHandler(verifyPayment));
// router.post("/sendPaymentSuccessEmail");

export default router;