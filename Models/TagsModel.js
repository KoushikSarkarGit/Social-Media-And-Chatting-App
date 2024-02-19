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

    count: {
        type: Number,
        default: 1
    },


    countHistory: [
        {
            count: {
                type: Number,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]

}, { timestamps: true })


const Tagmodel = mongoose.model('tag', tagschema);

module.exports = Tagmodel;