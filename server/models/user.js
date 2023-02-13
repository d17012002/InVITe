const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_token: {
        type: String,
        required: true,
        unique: true
    },
    reg_number: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    contactNumber: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);