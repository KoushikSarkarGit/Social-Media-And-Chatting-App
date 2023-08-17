const Postmodel = require('../Models/PostModel')
const Tagmodel = require('../Models/TagsModel')
const cloudinary = require('../Tools/CloudinarySetup')

const { createBase64AndUpload, updateimageincloudinary } = require('../Tools/ImageToBase64')

require('dotenv').config();


const createPost = async (req, res) => {

    const { curuserid } = req.body
    const { postdescription, hashtags } = req.fields;
    const currentDate = await new Date();
    let picturename = await `Post Of ${curuserid} on ${currentDate}`;
    let finalpublicid = picturename;

    try {
        let { postimage } = await req.files;
        let posturl = null;

        if (postimage) {
            const uploadedfile = await createBase64AndUpload(postimage.path, picturename);
            posturl = uploadedfile.url
            finalpublicid = uploadedfile.public_id
        }



        const newpost = await Postmodel.create({ userId: curuserid, postdescription: postdescription, postimage: posturl, postPublicID: finalpublicid, tags: hashtags })


        if (hashtags) {
            hashtags.array.forEach(async (element) => {
                let iftagexist = await Tagmodel.find({ tagname: element })

                if (!iftagexist) {
                    await Tagmodel.create({ tagname: element, relatedpost: newpost._id })
                }
                else {
                    await Tagmodel.updateOne(
                        { tagname: element },
                        { $inc: { count: 1 }, $push: { relatedpost: newpost._id } }
                    );
                }

            });

        }




        return res.status(200).json({ success: true, msg: 'Post created successfully', newpost });

    } catch (error) {
        // this one for failed cases where image is uploaded but post creation is failed. so we have to delete the image from cloud to save space
        await cloudinary.uploader.destroy(finalpublicid);
        return res.status(500).json({ success: false, msg: error.message });
    }

}

const getPost = async (req, res) => {

    const id = req.params.id;

    try {

        const fetchedpost = await Postmodel.findById(id);
        return res.status(200).json({ success: true, msg: 'Post fetched successfully', fetchedpost });

    } catch (error) {

        return res.status(500).json({ success: false, msg: error.message });
    }

}


const updatePost = async (req, res) => {
    const postid = req.params.id;
    const { curuserid } = req.body

    let existingpost = await Postmodel.findById(postid);

    if (existingpost.userId != curuserid) {
        return res.status(500).json({ success: false, msg: 'Unauthorized Access. You Can Only Update Your Own Post', postid: existingpost.userId, curuserid });
    }
    else {

        const { upostdescription } = req.fields;

        try {
            let { upostimage } = await req.files;
            let uposturl = existingpost.postimage;
            let upicturename = existingpost.postPublicID;

            if (upostimage) {
                const updatedcl = await updateimageincloudinary(upostimage.path, upicturename)
                uposturl = updatedcl.url;
            }

            const updatedpost = await Postmodel.findByIdAndUpdate(existingpost._id, { postdescription: upostdescription, postimage: uposturl }, {
                new: true,
            })
            return res.status(200).json({ success: true, msg: 'Post Updated successfully', updatedpost });

        } catch (error) {
            return res.status(500).json({ success: false, msg: error.message });
        }

    }


}


const deletePost = async (req, res) => {
    const postid = req.params.id;
    const { curuserid } = req.body

    let existingpost = await Postmodel.findById(postid);

    if (!existingpost) {
        return res.status(500).json({ success: false, msg: 'Post Does Not Exist' });
    }

    if (existingpost.userId != curuserid) {
        return res.status(500).json({ success: false, msg: 'Unauthorized Access. You Can Only Update Your Own Post', postid: existingpost.userId, curuserid });
    }
    else {

        try {

            let deleteresult = await cloudinary.uploader.destroy(existingpost.postPublicID, function (err, result) { console.log(result) });
            const deletedpost = await Postmodel.findByIdAndDelete(existingpost._id)

            return res.status(200).json({ success: true, msg: 'Post Deleted successfully', deletedpost, postpublicid: existingpost.postPublicID });



        } catch (error) {
            return res.status(500).json({ success: false, msg: error.message });
        }

    }


}







module.exports = { createPost, getPost, updatePost, deletePost }