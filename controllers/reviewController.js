const { StatusCodes } = require('http-status-codes');
const Review = require('../models/Review');
const Product = require('../models/Product');
const {NotFoundError, BadRequestError} = require("../errors");


const createReview = async (req, res) => {
    const { product: productId } = req.body;

    const isValidProduct = await Product.findById(productId);

    if(!isValidProduct){
        throw new NotFoundError(`No product with id: ${productId}`);
    }

    const alreadySubmitted = await Review.findOne({
        product: productId,
        user: req.user.userId,
    })

    if(alreadySubmitted){
        throw new BadRequestError('Already submitted review for this product');
    }

    req.body.user = req.user.userId;
    const review = await Review.create(req.body);

    res.status(StatusCodes.CREATED).json({review});
    res.send('Create Review');
};

const getAllReviews = async (req, res) => {
    const reviews = await Review.find({});
    res.status(StatusCodes.OK).json({reviews, count: reviews.length});
};

const getSingleReview = async (req, res) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if(!reviewId){
        throw new NotFoundError(`No review with id: ${reviewId}`);
    }

    res.status(StatusCodes.OK).json({review});
};

const updateReview = (req, res) => {
    res.send('Update Review');
};

const deleteReview = (req, res) => {
    res.send('Delete Review');
};

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};