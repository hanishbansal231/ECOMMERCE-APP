import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
    ],
    payment: {},
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    }

}, { timestamps: true });


const Order = model('Order', orderSchema);
export default Order;