const mongoose = require('mongoose')
const { Schema } = mongoose;



const commentschema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    postId: {
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },

    commentText: String,

}, { timestamps: true })


const Commentmodel = mongoose.model('comment', commentschema);

module.exports = Commentmodel;