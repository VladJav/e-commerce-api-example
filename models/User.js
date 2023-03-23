const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        unique: true,
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

userSchema.pre('save', async function (){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);