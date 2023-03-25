const createReview = (req, res) => {
    res.send('Create Review');
};

const getAllReviews = (req, res) => {
    res.send('Get All Reviews');
};

const getSingleReview = (req, res) => {
    res.send('Get Single Review');
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