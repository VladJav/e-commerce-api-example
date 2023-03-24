const express = require('express');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');
const { getSingleUser, updateUserPassword, updateUser, showCurrentUser, getAllUsers} = require('../controllers/userController');

const router = express.Router();

router.get('/', authenticateUser, authorizePermissions('admin'), getAllUsers);
router.get('/showMe', authenticateUser, showCurrentUser);
router.patch('/updateUser', authenticateUser, updateUser);
router.patch('/updatePassword', authenticateUser, updateUserPassword);
router.get('/:id', authenticateUser, getSingleUser);

module.exports = router;