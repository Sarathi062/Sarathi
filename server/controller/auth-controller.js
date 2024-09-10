const User = require('../models/user-model');

const authenticate = async (req, res) => {
    try {
        const { gmail, password } = req.body;

        const user = await User.findOne({ gmail });

        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid password" });
        }

        res.status(200).json({ message: user });

    } catch (error) {
        res.status(500).json({ error: "Error occurred" });
    }
}

const register = async (req, res) => { //this is the controller function that will be called when the client sends a POST request to the /register endpoint
    //and returns a response to the client
    try {
        const { name, title, experienceLevel, language, gmail, password } = req.body;

        const userExist = await User.findOne({ gmail });

        if (userExist) {
            return res.status(400).json({ error: "User already exists" }); //this i the response that will be sent to the client if the user already exists
        }
        const newUser = await User.create({ name, title, experienceLevel, language, gmail, password });


        res.status(200).json({ message: newUser }); //this is the response that will be sent to the client if the user is successfully created

    } catch (error) {
        res.status(500).json({ error: "Error occurred" }); //this is the response that will be sent to the client if an error occurs
    }
}

module.exports = { authenticate, register };
