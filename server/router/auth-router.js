const express = require('express');
const { authenticate, register } = require('../controller/auth-controller'); // Import your controllers
const router = express.Router();

// Define routes
router.route('/authenticate').post(authenticate); // Route for the home controller
router.route('/register').post(register); // Route for the register controller

// Export the router
module.exports = router;
