const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    links: [
        {
            title: String,
            url: String,
        }
    ]
});

module.exports = mongoose.model('Links', linkSchema);