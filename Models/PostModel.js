const mongoose = require('mongoose')
const { Schema } = mongoose;



const postschema = new Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'user',
        required: true
    },
    postdescription: { type: String, required: true },
    postimage: String,
    postPublicID: String,
    likes: [],
    reposts: [],

    comments: [
        {
            commenter_id: String,
            commentText: String
        }
    ]

}, { timestamps: true })


const Postmodel = mongoose.model('post', postschema);

module.exports = Postmodel;