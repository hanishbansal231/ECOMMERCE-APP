import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { allCategory, createCategory, deleteCategory, updateCategory } from "../controllers/categoryController.js";

const route = Router();


route.post('/create-category',asyncHandler(createCategory));
route.get('/all-category',asyncHandler(allCategory));
route.delete('/delete-category/:id',asyncHandler(deleteCategory));
route.put('/update-category/:id',asyncHandler(updateCategory));

export default route;