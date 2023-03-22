const express = require('express');
const { getSingleUser, updateUserPassword, updateUser, showCurrentUser, getAllUsers} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/showMe', showCurrentUser);
router.post('/updateUser', updateUser);
router.post('/updatePassword', updateUserPassword);
router.get('/:id', getSingleUser);

module.exports = router;