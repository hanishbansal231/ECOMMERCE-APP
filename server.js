import app from './app.js';
import connectDb from './config/dbConnection.js';
import cloudinary from 'cloudinary';
import { config } from 'dotenv';
config();
const PORT = process.env.PORT || 8080;

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, async () => {
    console.log(`Server is Starting port number is ${PORT}`)
    await connectDb();
});