const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();






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

const valtokenchecker = async (req, res, next) => {
    const reqtoken = await req.headers.token;
    let success = false;
    try {
        var tokencheck = await jwt.verify(reqtoken, process.env.jwt_secret_key);
        if (!tokencheck) {
            return res.status(400).json({ success: false, msg: "invalid token. Please LogOut and Login again" })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, msg: "error happened in valtokenchecker", err: error.message })
    }
}

const extractIdFromToken = async (req, res, next) => {
    try {
        const decode = await jwt.verify(
            req.headers.token,
            process.env.jwt_secret_key
        );
        req.body.curuserid = decode.id;

        next();
    } catch (error) {
        console.log(error);
        return res.status(507).json({ success: false, msg: "error happened in extractIdFromToken" })
    }
};




module.exports = { encrytpassword, checkpassword, valtokenchecker, extractIdFromToken }