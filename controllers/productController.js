import Product from "../models/productMode.js";
// import Category from "../models/categoryModel";
import AppError from "../helpers/error.helpers.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';


const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, quantity } = req.body;
        console.log(req.body);
        console.log(name, description, price, category, quantity);
        if (!name || !description || !price || !category || !quantity) {
            return next(new AppError('All field mandatory...', 402));
        }

        const products = await Product.create({
            name,
            description,
            price,
            category,
            quantity,
            photo: {
                public_id: 'Dummy',
                secure_url: 'Dummy'
            }
        });

        if (!products) {
            return next(new AppError('Product not created please try again...', 403));
        }

        if (req.file) {
            try {
                console.log(req.file);
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: process.env.FOLDER,
                });
                console.log(result);
                if (result) {
                    products.photo.public_id = result.public_id;
                    products.photo.secure_url = result.secure_url;

                    fs.rm(`uploads/${req.file.filename}`);
                }

            } catch (e) {
                return next(new AppError(e.message, 500));
            }
        }

        await products.save();

        return res.status(200).json({
            success: true,
            message: 'Product Created Succeffully...',
            products,
        });

    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

const allProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});

        if (!products) {
            return next(new AppError('Products not found...', 403));
        }

        return res.status(200).json({
            success: true,
            message: 'Product Found...',
            products
        });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

const deleteProduct = async (req,res,next) => {
    try{
        const {id} = req.params;

        if(!id){
            return next(new AppError('Id is not found...',402));
        }

        const product = await Product.findById({_id:id});

        if(!product){
            return next(new AppError('product is not found...',403));
        }

        await cloudinary.v2.uploader.destroy(product.photo.public_id);
        await Product.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success: true,
            message: 'Deleted Successfully...',
        });

    }catch(e){
        return next(new AppError(e.message, 500));
    }
}

const updateProduct = async (req,res,next) => {
    try{
        const {id} = req.params;

        if(!id){
            return next(new AppError('Id is not found...',402));
        }

        const product = await Product.findById({_id:id});

        if(!product){
            return next(new AppError('product is not found...',403));
        }

        const updateProduct = await Product.findByIdAndUpdate({_id:id},{
            $set: req.body,
        },{new: true});

        if(req.file){
            try{
                const result = await cloudinary.v2.uploader.upload(req.file.path,{
                    folder: process.env.FOLDER,
                });

                if(result){
                    updateProduct.photo.public_id = result.public_id;
                    updateProduct.photo.secure_url = result.secure_url;

                    fs.rm(`uploads/${req.file.filname}`);
                }
            }catch(e){
                return next(new AppError(e.message, 500));
            }
        }

        await updateProduct.save();

        return res.status(200).json({
            success: true,
            message: 'Updated Product',
            updateProduct,
        });


    }catch(e){
        return next(new AppError(e.message, 500));
    }
}

export {
    createProduct,
    allProducts,
    deleteProduct,
    updateProduct
}