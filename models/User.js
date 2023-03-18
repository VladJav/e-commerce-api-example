const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxLength: 30,
    },
    email:{
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            message: 'Please provide valid email',
            validator: validator.isEmail,
        },
    },
    password:{
        type: String,
        required: [true, 'Please provide password'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
});

module.exports = mongoose.model('User', userSchema);