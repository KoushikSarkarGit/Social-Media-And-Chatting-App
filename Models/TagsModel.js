const mongoose = require('mongoose')
const { Schema } = mongoose;



const tagschema = new Schema({


    tagname: {
        type: String,
        unique: true
    },
    relatedpost: [{
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true
    }],

    count: Number

}, { timestamps: true })


const Tagmodel = mongoose.model('tag', tagschema);

module.exports = Tagmodel;