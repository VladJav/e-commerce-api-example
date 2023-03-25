const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');
const { NotFoundError, BadRequestError } = require('../errors');
const path = require("path");

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

const uploadImage = async (req, res) => {
    if(!req.files.image){
        throw new BadRequestError('No File Upload');
    }

    const productImage = req.files.image;
    const maxSize = 1024*1024;

    if(!productImage.mimetype.startsWith('image') || productImage.size > maxSize){
        throw new BadRequestError('Bad Image Upload');
    }

    const imagePath = path.join(__dirname, `../public/uploads/${productImage.name}`);
    await productImage.mv(imagePath);

    res.status(StatusCodes.OK).json({image: `/uploads/${productImage.name}`});
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
};