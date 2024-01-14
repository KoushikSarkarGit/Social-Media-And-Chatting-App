const mongoose = require('mongoose')
const { Schema } = mongoose;



const postschema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    postdescription: { type: String, required: true },
    postimage: String,
    postPublicID: String,
    likes: [],
    reposts: [],

    //no need for this as i have created comment schema seperately
    // comments: [
    //     {
    //         commenter_id: String,
    //         commentText: String,
    //         createdAt: {
    //             type: Date,
    //             default: Date.now,
    //         },
    //     }
    // ],

    commentNo: {
        type: Number,
        default: 0
    },

    tags: []

}, { timestamps: true })


const Postmodel = mongoose.model('post', postschema);

module.exports = Postmodel;