const Postmodel = require('../Models/PostModel')


const createBase64AndUpload = require('../Tools/ImageToBase64')

require('dotenv').config();


const createPost = async (req, res) => {

    try {
        const { curuserid } = req.body

        const { postdescription } = req.fields;
        const currentDate = await new Date();

        let { postimage } = req.files;
        let posturl = null;
        let picturename = await `Post Of ${curuserid} on ${currentDate}`;
        if (postimage) {

            posturl = await createBase64AndUpload(postimage.path, picturename);
        }


        const newpost = await Postmodel.create({ userId: curuserid, postdescription: postdescription, postimage: posturl, postPublicID: picturename })

        return res.status(200).json({ success: true, msg: 'Post created successfully', newpost });

    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }

}




module.exports = { createPost }