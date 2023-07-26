const bcrypt = require('bcrypt');
// const Usermodel = require('../Models/Usermodel');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();









const encrytpassword = async (password) => {
    try {

        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash(password, saltRounds);
        return hashedpassword;

    } catch (error) {
        console.log(error)
    }
}

const checkpassword = async (password, hashedpassword) => {
    const result = bcrypt.compare(password, hashedpassword);
    return result;
}



module.exports = { encrytpassword, checkpassword }