const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please provide rating'],
    },
    title:{
        type: String,
        trim: true,
        required: [true, 'Please provide review title'],
        maxLength: 100,
    },
    comment:{
        type: String,
        required: [true, 'Please provide review text'],
        maxLength: 1000,
    },
    user:{
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    product:{
        ref: 'Product',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
}, {timestamps: true});

reviewSchema.index({product:1, user: 1}, {unique: true});

module.exports = mongoose.model('Review', reviewSchema);