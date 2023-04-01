const Order = require('../models/Order');

const getAllOrders = (req, res) =>{
    res.send('Get All Orders');
};

const getSingleOrder = (req, res) =>{
    res.send('Get Single Order');
};

const getCurrentUserOrders = (req, res) =>{
    res.send('Get Current User Orders');
};

const createOrder = (req, res) =>{
    res.send('Create Order');
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