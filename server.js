import app from './app.js';
import connectDb from './config/dbConnection.js';
import { config } from 'dotenv';
config();
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    console.log(`Server is Starting port number is ${PORT}`)
    await connectDb();
});