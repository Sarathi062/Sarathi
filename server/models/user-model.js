const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
    ,

    experienceLevel: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },

    gmail: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    }
    ,

    password: {
        type: String,
        required: true
    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;