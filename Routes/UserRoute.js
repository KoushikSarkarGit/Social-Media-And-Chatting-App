const express = require('express');
const { userRegistration, loginBackend, getSingleUser, updateUserDetails, updateProfilepic, updateCoverpic } = require('../Controllers/Usercontroller');
const router = express.Router();
const formidable = require('express-formidable')
const { valtokenchecker, extractIdFromToken } = require('../Middlewares/Encryptiontools')




//user authentication
router.post('/register', userRegistration);
router.post('/login', loginBackend)

// user crud operation
router.get('/getuser/:id', getSingleUser)

//update user details
router.put('/update-userdetails/:id', valtokenchecker, extractIdFromToken, updateUserDetails)

// update profile picture
router.put('/update-profilepic/:id', valtokenchecker, extractIdFromToken, formidable(), updateProfilepic)

// update cover picture
router.put('/update-coverpic/:id', valtokenchecker, extractIdFromToken, formidable(), updateCoverpic)





module.exports = router