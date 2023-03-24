const express = require('express');
const {
    uploadImage,
    createProduct,
    deleteProduct,
    updateProduct,
    getSingleProduct,
    getAllProducts
} = require('../controllers/productController');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', authenticateUser, authorizePermissions('admin'), createProduct);
router.post('/uploadImage', authenticateUser, authorizePermissions('admin'), uploadImage);
router.get('/:productId', getSingleProduct);
router.delete('/:productId', authenticateUser, authorizePermissions('admin'), deleteProduct);
router.patch('/:productId', authenticateUser, authorizePermissions('admin'), updateProduct);

module.exports = router;