const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const User = require('../models/User');
const { attachCookiesToResponse } = require('../utils');

const register = async (req, res) => {
    const { email, name, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });

    if(emailAlreadyExists){
        throw new BadRequestError('Email already exists');
    }

    // first registered user is an admin
    const isFirstAccount = await User.countDocuments({}) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const user = await User.create({email, name, password, role});

    const tokenUser = {
        userId: user._id,
        email,
        name
    }

    attachCookiesToResponse({res, user: tokenUser});

    res.status(StatusCodes.CREATED).json({user: tokenUser});
};

const login = async (req, res) => {
    res.send('Login');
};

const logout = async (req, res) => {
    res.send('Logout');
};

module.exports = {
    register,
    login,
    logout,
};