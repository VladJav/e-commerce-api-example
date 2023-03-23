const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthorizedError } = require('../errors');
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
        role: user.role,
        name
    }

    attachCookiesToResponse({res, user: tokenUser});

    res.status(StatusCodes.CREATED).json({user: tokenUser});
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({ email });

    if(!user){
        throw new UnauthorizedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        throw new UnauthorizedError('Invalid Credentials');
    }

    const tokenUser = {
        userId: user._id,
        role: user.role,
        name: user.name,
    }

    attachCookiesToResponse({res, user: tokenUser});

    res.status(StatusCodes.OK).json({user: tokenUser});
};

const logout = async (req, res) => {
    res.cookie('token', '', {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(StatusCodes.OK).send();
};

module.exports = {
    register,
    login,
    logout,
};