const getAllUsers = ( req, res ) => {
    res.send('GET ALL USERS');
};
const getSingleUser = ( req, res ) => {
    res.send('GET SINGLE USER');
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