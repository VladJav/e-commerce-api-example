const express = require('express');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');
const { getSingleUser, updateUserPassword, updateUser, showCurrentUser, getAllUsers} = require('../controllers/userController');

const router = express.Router();

router.get('/', authenticateUser, authorizePermissions('admin'), getAllUsers);
router.get('/showMe', showCurrentUser);
router.patch('/updateUser', updateUser);
router.patch('/updatePassword', updateUserPassword);
router.get('/:id', getSingleUser);

module.exports = router;