const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 6,
        maxlength: 20,
        unique: true,
    },

    password: {
        type: String,
    },

    admin: {
        type: Boolean,
        default: false,
    },

    name: {
        type: String,
    },

    id: {
        type: String,
    },

    birthday: {
        type: Date,
    },   

    gender: {
        type: String,
    },

    email: {
        type: String,
    },

    address: {
        type: String,
    },
});

let User = mongoose.model('User', userSchema);

module.exports = User;