import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DBURI; // Connection URL

const ConnectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to the Database");
    } catch (error) {
        console.error("Error connecting to the Database:", error);
        process.exit(1);
    }
};

export default ConnectDB;
