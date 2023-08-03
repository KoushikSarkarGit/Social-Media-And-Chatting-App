const mongoose = require('mongoose')
const { Schema } = mongoose;




const SocialmediaUserschema = new Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    phone: {
        type: Number,

    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profilePicture: String,
    coverPicture: String,
    bio: String,
    livesin: String,
    worksAt: String,
    relationship: String,
    followers: [],
    following: []

}, { timestamps: true })


const Usermodel = mongoose.model('user', SocialmediaUserschema);

module.exports = Usermodel;