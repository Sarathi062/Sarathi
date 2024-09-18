import mongoose from 'mongoose';

const uri ='mongodb+srv://yashrajdhamale:JYCyk4W7a5JASivj@mentor.7x8l1.mongodb.net/Sarathi'; // Connection URL

const ConnectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to the Database");
    } catch (error) {
        console.error("Error connecting to the Database:", error);
        process.exit(1);
    }
};

// Export function using ES module syntax
export default ConnectDB;
