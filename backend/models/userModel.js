const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema( {
    fullName: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema);