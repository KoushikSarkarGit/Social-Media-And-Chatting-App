
const Usermodel = require('../Models/Usermodel')
const bcrypt = require('bcrypt')
const { encrytpassword } = require('../Middlewares/Encryptiontools')





// user registration controller
const userRegistration = async (req, res) => {
    const { username, password, firstname, email, lastname } = req.body;

    let success = false;

    try {

        const finalhashedpassword = await encrytpassword(password)

        const CreatedUser = await Usermodel.create({
            username,
            email,
            password: finalhashedpassword,
            firstname,
            lastname,
        });

        return res.status(200).json({ success: true, CreatedUser });

    } catch (error) {
        res.status(501).json({ success, message: error.message });
    }
};


module.exports = { userRegistration }