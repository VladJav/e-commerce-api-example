const mongoose = require('mongoose');

const singleCartItems = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    price:{
        type:  Number,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    product:{
        ref: 'Product',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

const orderSchema = new mongoose.Schema({
    tax:{
        type: Number,
        required: true,
    },
    shippingFee:{
        type: Number,
        required: true,
    },
    subTotal:{
        type: Number,
        required: true,
    },
    total:{
        type: Number,
        required: true,
    },
    cartItems:  [singleCartItems],
    status:{
        type: String,
        enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
        default: 'pending',
    },
    user:{
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    clientSecret:{
        type:String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);