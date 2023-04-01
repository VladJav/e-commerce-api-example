const express = require('express');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');
const { getAllOrders, updateOrder, createOrder, getCurrentUserOrders, getSingleOrder} = require('../controllers/orderController');

const router = express.Router();

router.use(authenticateUser);

router.get('/', authorizePermissions('admin'), getAllOrders);
router.post('/', createOrder);
router.get('/showAllMyOrders', getCurrentUserOrders);
router.get('/:orderId', getSingleOrder);
router.patch('/:orderId', updateOrder);

module.exports = router;