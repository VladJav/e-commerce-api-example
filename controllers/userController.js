const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError, UnauthenticatedError} = require('../errors');

const getAllUsers = async ( req, res ) => {
    const users = await User.find({role:"user"}).select('-password');
    res.status(StatusCodes.OK).json({users});
};

const getSingleUser = async ( req, res ) => {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if(!user){
        throw new NotFoundError(`User with id: ${id} does not exists`);
    }
    res.status(StatusCodes.OK).json({user});
};

const updateUser = ( req, res ) => {
    res.send('UPDATE USER');
};

const showCurrentUser = ( req, res ) => {
    res.status(StatusCodes.OK).json({user: req.user});
};

const updateUserPassword = async ( req, res ) => {
    const {userId} = req.user;
    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword){
        throw new BadRequestError('Provide your old password and new password');
    }
    const user = await User.findById(userId);
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Please provide correct old password');
    }
    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({msg: 'Password Updated!'});
};

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    showCurrentUser,
    updateUserPassword,
};