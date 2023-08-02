const express = require('express');
const { userRegistration, loginBackend, getSingleUser, updateUserDetails } = require('../Controllers/Usercontroller');
const router = express.Router();
const formidable = require('express-formidable')
const { valtokenchecker, extractIdFromToken } = require('../Middlewares/Encryptiontools')




//user authentication
router.post('/register', userRegistration);
router.post('/login', loginBackend)

// user crud operation
router.get('/getuser/:id', getSingleUser)

//update user details
router.post('/update-userdetails/:id', valtokenchecker, extractIdFromToken, updateUserDetails)

module.exports = router