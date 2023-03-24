const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');

const createProduct = (req, res) => {
    res.send('Create Product');
};

const getAllProducts = (req, res) => {
    res.send('Get All Products');
};

const getSingleProduct = (req, res) => {
    res.send('Get Single Product');
};

const updateProduct = (req, res) => {
    res.send('Update Product');
};

const deleteProduct = (req, res) => {
    res.send('Delete Product');
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