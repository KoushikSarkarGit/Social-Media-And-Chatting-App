
const Usermodel = require('../Models/Usermodel')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');
const { encrytpassword, checkpassword } = require('../Middlewares/Encryptiontools')
const jwt = require('jsonwebtoken')
require('dotenv').config();



// user registration/creation controller
const userRegistration = async (req, res) => {
    const { username, password, firstname, email, lastname } = req.body;

    let success = false;

    const user = await Usermodel.findOne({ email: email });

    if (user) {
        res.status(200).json({ success: true, msg: 'User already exist. Please Login' })
    }

    try {

        const finalhashedpassword = await encrytpassword(password)

        const CreatedUser = await Usermodel.create({
            username,
            email,
            password: finalhashedpassword,
            firstname,
            lastname,
        });

        // const { password, ...sendingdata } = await CreatedUser;
        // delete CreatedUser.password;
        return res.status(200).json({ success: true, CreatedUser, msg: 'Registration successful' });

    } catch (error) {
        res.status(501).json({ success, message: error.message });
    }
};



// user login controller

const loginBackend = async (req, res) => {
    const { email, password } = req.body
    let success = false;

    // const valerror = validationResult(req);
    // if (!valerror.isEmpty()) {
    //     return res.status(400).json({ success, msg: "please fill the form in instructed format", curerr: valerror.array() });
    // }

    try {
        const user = await Usermodel.findOne({ email: email })

        if (user) {
            const validity = await checkpassword(password, user.password)

            const token = jwt.sign({ id: user._id }, process.env.jwt_secret_key, { expiresIn: '14d' });

            validity ? res.status(200).json({ success, jwttoken: token, user, msg: 'Login Successful' }) : res.status(400).json({ success: false, msg: "Wrong Username or Password" })
        }
        else {
            res.status(404).json("User does not exists. Please Sign Up first")
        }
    } catch (error) {
        res.status(500).json({ success, msg: error.message });
    }
}



// get a User controller
const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const curuser = await Usermodel.findById(id).select('-password');

        if (curuser) {
            res.status(200).json({ success: true, msg: 'user fetched successfully', curuser });
        } else {
            res.status(404).json({ success: true, msg: "User does not exist" });
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'user fetching unsuccessful', error });
    }
};

























module.exports = { userRegistration, loginBackend, getSingleUser }
