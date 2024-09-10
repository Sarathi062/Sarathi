const mongoose = require('mongoose');


// MongoDB URL
const URL = process.env.MONGO_URI;

// Connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(URL)
        console.log('MongoDB is connected');
    }

    catch (error) {
        console.log('Error while connecting to MongoDB', error);
        process.exit(1); // Exit the process if the connection fails
    }
}

module.exports = connectDB; // Export the connection function
