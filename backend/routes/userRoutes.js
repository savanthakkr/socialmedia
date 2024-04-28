const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require("../middlewares/roleMiddleware");

const { registerUser, loginUser, getUserProfile, getImage, OTPVerify, sendPasswordOTP, OTPVerifyEmail, updatepassword } = userController; 

// Register a new user
router.post('/users/register', registerUser);

router.post('/users/passwordOTP', sendPasswordOTP);

router.post('/users/otpEmail', OTPVerifyEmail);

router.post('/users/otp', OTPVerify);

// Login
router.post('/users/login', loginUser);

// Get user profile by id
router.get('/users/profile/:id',verifyToken, getUserProfile);

// Update user profile 
router.put('/users/editProfile/:id',verifyToken, getImage); 


router.put('/users/updatePass',verifyToken, updatepassword); 

module.exports = router;
