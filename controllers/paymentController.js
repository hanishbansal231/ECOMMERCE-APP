import instance from "../config/razorpay.js";
import Order from "../models/orderModel.js";
import Product from "../models/productMode.js";
import User from "../models/userModel.js";
import sendEmail from "../helpers/emailSend.js";
import AppError from "../helpers/error.helpers.js";
import mongoose from "mongoose";
import crypto from 'crypto';

const capturePayment = async (req, res, next) => {
    const { products } = req.body;
    const userId = req.user.id;
    console.log(products);
    if (products.length === 0) {
        return next(new AppError('Please Provide Product ID', 403));
    }

    let total_amount = 0;

    for (const product_id of products) {
        let product;
        try {

            product = await Product.findById(product_id);

            if (!product) {
                return next(new AppError('Could not find the product', 403));
            }

            total_amount += product?.price;

        } catch (e) {
            return next(new AppError(e.message, 500));
        }
    }

    const option = {
        amount: total_amount * 100,
        currency: 'USD',
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse = await instance.orders.create(option);
        console.log(paymentResponse);

        return res.json({
            success: true,
            data: paymentResponse,
        });

    } catch (e) {
        return next(new AppError(e.message, 500));
    }

}

const verifyPayment = async (req,res,next) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const products = req.body?.products;

    const userId = req.user.id

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !products || // Change 'courses' to 'products'
        !userId
    ) {
        return next(new AppError('Payment Failed', 403));
    }
    

      let body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")

      if (expectedSignature === razorpay_signature) {

        const order = await new Order({
            products: products,
            buyer: userId,
        }).save();        

        return res.status(200).json({ success: true, message: "Payment Verified" });
      }
      return next(new AppError('Payment Failed',403));
}

export {
    capturePayment,
    verifyPayment
}