const Usermodel = require('../Models/Usermodel')
const Postmodel = require('../Models/PostModel')
const { checkAdmin } = require('../Tools/checkingFunction')
const mongoose = require('mongoose')

const addComment = async (req, res) => {
    const postid = req.params.id;
    const { curuserid, commentdata } = await req.body;

    try {
        const thepost = await Postmodel.findById(postid);
        const ouruser = await Usermodel.findById(curuserid);

        if (!thepost) {
            res.status(401).json({ success: false, msg: 'Post Not Found' });
        }


        let newcomment = {
            commenter_id: curuserid,
            commentText: commentdata,
            createdAt: Date.now()
        }


        let newcommentforuser = {
            commenter_id: curuserid,
            commentText: commentdata,
            post_id: postid,
            createdAt: Date.now()
        }


        await ouruser.updateOne({ $push: { commented: newcommentforuser } })

        await thepost.updateOne({ $push: { comments: newcomment } })



        res.status(200).json({ success: true, msg: 'comment added', commentdata });
    } catch (error) {
        res.status(500).json({ success: false, err: error.message });
    }

};


const getcommentforthepost = async (req, res) => {
    const postid = req.params.id;
    const { curuserid, page } = await req.body;
    let skipno = 0;
    if (page) {
        skipno = page * 2
    }



    try {
        const thepostcomment = await Postmodel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(postid) } },
            {
                $project: {

                    comments: {
                        $slice: ['$comments', skipno, 2] // Skip 1 item and limit to 3 items

                    }
                }
            }
        ])


        if (!thepostcomment) {
            res.status(401).json({ success: false, msg: 'Comments/Post Not Found' });
        }



        res.status(200).json({ success: true, msg: 'comment fetched', thepostcomment, page });
    } catch (error) {
        res.status(500).json({ success: false, err: error.message });
    }

};





module.exports = { addComment, getcommentforthepost };