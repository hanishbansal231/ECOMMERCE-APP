import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { allProducts, createProduct, deleteProduct, filterProduct, productCount, productList, updateProduct } from "../controllers/productController.js";
import isLoggedIn from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const route = Router();

route.post('/create-product', isLoggedIn,upload.single('photo'), asyncHandler(createProduct));
route.get('/all-product', asyncHandler(allProducts));
route.delete('/delete-product/:id', isLoggedIn, asyncHandler(deleteProduct));
route.put('/updated-product/:id', isLoggedIn,upload.single('photo'), asyncHandler(updateProduct));
route.post('/filter-product', asyncHandler(filterProduct));
route.get('/count-product', asyncHandler(productCount));
route.get('/list-product/:page', asyncHandler(productList));

export default route;