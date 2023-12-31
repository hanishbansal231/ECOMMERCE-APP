import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
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
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'password must be at least 5 charchter'],
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: {},
        required: true,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },
    token: {
        type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,

}, { timestamps: true });


userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
        console.log(e.message);
    }
});

userSchema.methods = {
    comparePassword: async function (planeText) {
        return await bcrypt.compare(planeText, this.password);
    },
    jwtToken: async function () {
        return jwt.sign({
            id: this._id,
            role: this.role,
        }, process.env.SECRET, { expiresIn: process.env.EXPIRE })
    },
    generatePasswordResetToken: async function () {
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

        this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;
        return resetToken;
    }
}

const User = model('User', userSchema);
export default User;