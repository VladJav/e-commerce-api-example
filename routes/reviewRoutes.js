const express = require('express');
const {
    getSingleReview,
    deleteReview,
    updateReview,
    getAllReviews,
    createReview
} = require('../controllers/reviewController');
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router();

router.get('/', getAllReviews);
router.post('/', authenticateUser, createReview);
router.get('/:reviewId', getSingleReview);
router.delete('/:reviewId', authenticateUser, deleteReview);
router.patch('/:reviewId', authenticateUser, updateReview);

module.exports = router;