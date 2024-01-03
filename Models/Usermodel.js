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
    sex: {
        type: String,
        enum: ['male', 'female'],

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
    following: [],
    likedPost: [],
    reposted: []


    //seperate comment schema created so no need for it
    // commented: [
    //     {
    //         commenter_id: String,
    //         post_id: String,
    //         commentText: String,
    //         createdAt: {
    //             type: Date,
    //             default: Date.now,
    //         }
    //     }
    // ],

}, { timestamps: true })


const Usermodel = mongoose.model('user', SocialmediaUserschema);

module.exports = Usermodel;