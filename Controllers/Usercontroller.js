
const Usermodel = require('../Models/Usermodel')
const bcrypt = require('bcrypt')

const { encrytpassword, checkpassword } = require('../Middlewares/Encryptiontools')
const createBase64AndUpload = require('../Tools/ImageToBase64')
const { checkAdmin } = require('../Tools/checkingFunction')


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
        res.status(501).json({ success, msg: error.message });
    }
};

// user login controller

const loginBackend = async (req, res) => {
    const { email, password } = req.body
    let success = false;

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


// update user details
const updateUserDetails = async (req, res) => {
    const id = req.params.id;
    let hashednewpassword = '';
    let adminresult = null;
    const { curuserid, adminstatus, newpassword } = req.body;

    if (adminstatus) {
        adminresult = await checkAdmin(curuserid);
    }

    if (id === curuserid || adminresult) {
        try {
            if (newpassword) {
                hashednewpassword = await encrytpassword(newpassword);
            }

            const updateduser = await Usermodel.findByIdAndUpdate(id, { ...req.body, password: hashednewpassword }, {
                new: true,
            });

            res.status(200).json({ success: true, updateduser });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }


    } else {
        res.status(403).json({ success: false, msg: "Access Denied! you can only update your own profile" });
    }
};

// update profile pic

const updateProfilepic = async (req, res) => {
    const id = req.params.id;

    const { curuserid } = req.body;

    const { profilePicture } = req.files;
    let picturename = `$profilepic of ${curuserid}`
    let imageurl1 = '';
    if (profilePicture) {
        imageurl1 = await createBase64AndUpload(profilePicture.path, picturename);
    }

    let adminresult = await checkAdmin(curuserid);

    if (id === curuserid || adminresult) {
        try {

            const updateduser = await Usermodel.findByIdAndUpdate(curuserid, { profilePicture: imageurl1 }, { new: true, });

            res.status(200).json(updateduser.profilePicture);
        } catch (error) {
            res.status(500).json({ success: false, error });
        }


    } else {
        res.status(403).json({ success: false, msg: "Access Denied! you can only update your own profile" });
    }
};

// update cover pic

const updateCoverpic = async (req, res) => {
    const id = req.params.id;

    const { curuserid } = req.body;

    const { coverPicture } = req.files;
    let imageurl1 = '';
    let picturename = `$coverfilepic of ${curuserid}`

    if (coverPicture) {
        imageurl1 = await createBase64AndUpload(coverPicture.path, picturename);
    }

    let adminresult = await checkAdmin(curuserid);

    if (id === curuserid || adminresult) {
        try {

            const updateduser = await Usermodel.findByIdAndUpdate(curuserid, { coverPicture: imageurl1 }, { new: true, });

            res.status(200).json(updateduser.coverPicture);
        } catch (error) {
            res.status(500).json({ success: false, error });
        }


    } else {
        res.status(403).json({ success: false, msg: "Access Denied! you can only update your own profile" });
    }
};

// follow someone
const followSomeOne = async (req, res) => {
    const tobefollowedid = req.params.id;
    const { curuserid } = req.body;

    if (tobefollowedid === curuserid) {
        res.status(403).json({ success: false, msg: "You cannot follow your own account" });
    }

    try {
        const tobefollowed = await Usermodel.findById(tobefollowedid);
        const ouruser = await Usermodel.findByIdAndUpdate(curuserid);

        if (!tobefollowed.followers.includes(curuserid)) {
            await tobefollowed.updateOne({ $push: { followers: ouruser._id } });

            await ouruser.updateOne({ $push: { following: tobefollowed._id } });
        }

        res.status(200).json({ success: true, msg: 'user followed' });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }

};

// unfollow someone

const unfollowSomeOne = async (req, res) => {
    const tobeunfollowedid = req.params.id;
    const { curuserid } = req.body;

    if (tobeunfollowedid === curuserid) {
        return res.status(403).json({ success: false, msg: "You cannot follow your own account" });
    }

    try {
        const tobefollowed = await Usermodel.findById(tobeunfollowedid);
        const ouruser = await Usermodel.findByIdAndUpdate(curuserid);

        if (ouruser.following.includes(tobeunfollowedid)) {
            await tobefollowed.updateOne({ $pull: { followers: ouruser._id } });

            await ouruser.updateOne({ $pull: { following: tobefollowed._id } });
        }

        return res.status(200).json({ success: true, msg: 'user unfollowed' });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }

};


const deleteAccount = async (req, res) => {
    const id = req.params.id;

    const { curuserid } = req.body;

    let adminresult = await checkAdmin(curuserid);


    if (id === curuserid || adminresult) {
        try {

            const deleted = await Usermodel.findByIdAndDelete(curuserid);

            res.status(200).json({ success: true, msg: 'Account deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }


    } else {
        res.status(403).json({ success: false, msg: "Access Denied" });
    }
};



module.exports = { userRegistration, loginBackend, getSingleUser, updateUserDetails, updateProfilepic, updateCoverpic, followSomeOne, unfollowSomeOne, deleteAccount }
