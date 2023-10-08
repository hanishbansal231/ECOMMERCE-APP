import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
        if (connection) {
            console.log(`Connected to MongoDB: ${connection.host}`)
        }
    } catch (e) {
        console.log(e);
        console.error(e);
        process.exit(1);
    }
}

export default connectDb;