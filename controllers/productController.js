const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');
const { NotFoundError } = require('../errors');
const {raw} = require("express");

const createProduct = async (req, res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body);

    res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
    const products = await Product.find({});

    res.status(StatusCodes.OK).json({products});
};

const getSingleProduct = async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if(!product){
        throw new NotFoundError(`Product with ${productId} does not exists`);
    }

    res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findByIdAndUpdate(productId, req.body, {
            runValidators: true,
            new: true
        });

    if(!product){
        throw new NotFoundError(`Product with ${productId} does not exists`);
    }

    res.status(StatusCodes.OK).json({product});
};

const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findOne({_id:productId});

    if(!product){
        throw new NotFoundError(`Product with ${productId} does not exists`);
    }
    await Product.deleteOne({_id:productId});

    res.status(StatusCodes.OK).json({msg: 'Product Removed'});
};

const uploadImage = (req, res) => {
    res.send('Upload Image');
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
};