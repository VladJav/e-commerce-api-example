const { StatusCodes } = require('http-status-codes');
const Order = require('../models/Order');
const Product = require('../models/Product');
const {NotFoundError, BadRequestError} = require("../errors");
const {checkPermissions} = require("../utils");

const fakeStripeAPI = async ({amount, currency}) =>{
    const clientSecret = 'random';
    return {
        clientSecret,
        amount
    }
}
const getAllOrders = async (req, res) =>{
    const orders = await Order.find({});

    res.status(StatusCodes.OK).json({orders});
};

const getSingleOrder = async (req, res) =>{
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if(!order){
        throw new NotFoundError(`No order with id ${orderId}`);
    }

    checkPermissions(req.user, order.user);


    res.status(StatusCodes.OK).json({order});
};

const getCurrentUserOrders = (req, res) =>{
    res.send('Get Current User Orders');
};

const createOrder = async (req, res) => {
    const { items: cartItems, tax, shippingFee } = req.body;

    if(!cartItems || !cartItems.length){
        throw new BadRequestError('No Cart items provided');
    }
    if(!tax || !shippingFee){
        throw new BadRequestError('Please provide tax and shipping fee');
    }

    const orderItems = [];
    let subTotal = 0;

    for(const item of cartItems){
        const dbProduct = await Product.findById(item.product);
        if(!dbProduct){
            throw new NotFoundError(`No product with id ${item.product}`);
        }

        const { name, price, image } = dbProduct;
        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            image,
            product: item.product,
        };

        orderItems.push(singleOrderItem);
        subTotal += item.amount * price;
    }

    const totalPrice = tax + shippingFee + subTotal;

    // fake payment
    const paymentIntent = await fakeStripeAPI({
        amount:totalPrice,
        currency: 'usd',
    });

    const order = await Order.create({
        cartItems: orderItems,
        total: totalPrice,
        subTotal,
        tax,
        shippingFee,
        clientSecret: paymentIntent.clientSecret,
        user: req.user.userId ,


    });
    res.status(StatusCodes.CREATED).json({ order, clientSecret: order.clientSecret });
};

const updateOrder = (req, res) =>{
    res.send('Update Order');
};

module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
};