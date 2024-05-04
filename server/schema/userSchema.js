const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            default: "",
        },
        lastname: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        img: {
            type: String,
            default: "",
        },
        links: {
            type: [String],
            default: []
        }
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;