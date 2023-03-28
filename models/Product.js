const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide product name'],
        maxLength: [100, 'Name can not be more that 100 characters'],
    },
    price: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: [true, 'Please provide product description'],
        maxLength: [1000, 'Description can not be more that 100 characters'],
    },
    image: {
        type: String,
        default: '/uploads/example.jpg',
    },
    category: {
        type: String,
        required: [true, 'Please provide product category'],
        enum: ['office', 'kitchen', 'bedroom'],
    },
    company: {
        type: String,
        required: [true, 'Please provide product company'],
        enum: {
            values: ['ikea', 'liddy', 'marcos'],
            message: '{VALUE} is not supported'
        },
    },
    colors: {
        type: [String],
        required: [true, 'Please provide product colors'],
        default: ['#233'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    freeShipping: {
        type: Boolean,
        default: false,
    },
    inventory: {
        type: Number,
        required: true,
        default: 15,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true, toJSON: {virtuals: true}});

productSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false,
});

productSchema.pre(
    'deleteOne',
    { document: true, query: false },
    async function() {
        console.log("hs")
        await this.model('Review').deleteMany({ product: this._id });
    }
);

module.exports = mongoose.model('Product', productSchema);