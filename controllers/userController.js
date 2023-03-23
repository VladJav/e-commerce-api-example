const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

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
    res.send('SHOW CURRENT USER');
};

const updateUserPassword = ( req, res ) => {
    res.send('UPDATE USER PASSWORD');
};

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    showCurrentUser,
    updateUserPassword,
};