import mongoose, { Schema, model } from "mongoose";


const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    quantity: {
        type: Number,
        requird: true
    },
    photo: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },
    shipping: {
        type: Boolean
    }
}, { timestamps: true });


const Product = model('Product', productSchema);
export default Product;