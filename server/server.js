//this is node.js with express.js

require('dotenv').config();
const express = require('express');
const router = require('./router/auth-router'); // Import your router
const connectDB = require('./utils/db'); // Import your DB connection logic
const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors()); // Add this line to allow all CORS requests

app.use(express.json()); // Middleware to parse JSON requests

app.use('/', router); // Set initial route to use your router

// Start the server after connecting to the database
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
