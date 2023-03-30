const { StatusCodes } = require('http-status-codes');
const Review = require('../models/Review');
const Product = require('../models/Product');
const {NotFoundError, BadRequestError} = require("../errors");
const {checkPermissions} = require("../utils");
const {raw} = require("express");

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
};

const getAllReviews = async (req, res) => {
    const reviews = await Review.find({}).populate({path:'product', select: '_id name price company'});
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

const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, title, comment } = req.body;

    const review = await Review.findById(reviewId);

    if(!review){
        throw new NotFoundError(`No review with id: ${reviewId}`);
    }

    checkPermissions(req.user, review.user);

    review.rating = rating;
    review.title = title;
    review.comment = comment;

    await review.save();

    res.status(StatusCodes.OK).json({review});
};

const deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if(!review){
        throw new NotFoundError(`No review with id: ${reviewId}`);
    }

    checkPermissions(req.user, review.user);

    await review.deleteOne();
    res.json(StatusCodes.OK);
};

const getSingleProductReviews = async (req, res) => {
    const { productId } = req.params;
    const reviews = await Review.find({product: productId});

    res.status(StatusCodes.OK).json({reviews, count: reviews.length});

}

module.exports = {
    getSingleProductReviews,
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};