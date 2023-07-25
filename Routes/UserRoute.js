const express = require('express');
const { userRegistration } = require('../Controllers/Usercontroller');
const router = express.Router();


router.post('/register', userRegistration)


module.exports = router