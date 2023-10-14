import AppError from "../helpers/error.helpers.js";
import Category from "../models/categoryModel.js";


const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            return next(new AppError('Name is required...', 403));
        }

        const existCategory = await Category.findOne({name});

        if(existCategory){
            return next(new AppError('Category Already Exists',403));
        }

        const category = await Category.create({ name: name });

        if(!category){
            return next(new AppError('Create Category is failed...',403));
        }

        await category.save();

        return res.status(200).json({
            success: true,
            message: 'Category Created Successfully...',
            category,
        })

    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

const allCategory = async (req,res,next) =>{
    try{
        const category = await Category.find({});

        if(!category){
            return next(new AppError('Category is not found...',403));
        }

        return res.status(200).json({
            success: true,
            message:'Find All Category...',
            category,
        });

    }catch(e){
        return next(new AppError(e.message, 500));
    }
}

const deleteCategory = async (req,res,next) => {
    try{
        const id = req.params.id;


        if(!id){
            return next(new AppError('Id is not found...',402));
        }

        await Category.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success: true,
            message: 'deleted successfully...',
        })

    }catch(e){
        return next(new AppError(e.message, 500));
    }
}

const updateCategory = async (req,res,next) => {
    try{
        const id = req.params.id;
        const {name} = req.body;

        if(!id){
            return next(new AppError('Id is not found...',402));  
        }

        const editCategory = await Category.findByIdAndUpdate(
            {_id:id},
            {name:name},
            {new:true});

            if(!editCategory){
                return next(new AppError('Update category failed...',401));;
            }

            return res.status(200).json({
                success: true,
                message: 'Updated successfully...',
                editCategory,
            })

    }catch(e){
        return next(new AppError(e.message, 500));
    }
}

export {
    createCategory,
    allCategory,
    deleteCategory,
    updateCategory
}