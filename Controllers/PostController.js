const Postmodel = require('../Models/PostModel')


const createBase64AndUpload = require('../Tools/ImageToBase64')

require('dotenv').config();


const createPost = async (req, res) => {

    try {

        const { postdescription, curuserid } = req.body
        const currentDate = new Date();

        let { postimage } = req.files;
        let picturename = `Post Of ${curuserid} on `
        let posturl = await createBase64AndUpload(postimage.path, picturename);

        const newpost = await Postmodel.create({ userId: curuserid, postdescription, postimage: posturl })

        return res.status(200).json({ success: true, msg: 'Post created successfully' });

    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }

}




module.exports = { createPost }