import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, 'Name must be at least 5 charchter'],
        maxLength: [50, 'Name should be less than 50 charchters'],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            , 'Please fill in a valid email address']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minLength:[8,'password must be at least 5 charchter'],
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0,
    }
}, { timestamps: true });


const User = model('User', userSchema);
export default User;