const express = require('express');
const { userRegistration, loginBackend, getSingleUser } = require('../Controllers/Usercontroller');
const router = express.Router();


router.post('/register', userRegistration);
router.post('/login', loginBackend)

router.get('/getuser/:id', getSingleUser)

module.exports = router