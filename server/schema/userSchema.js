const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    img: { data: Buffer, contentType: String }, // Store image data as Buffer
    links: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Links',
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;