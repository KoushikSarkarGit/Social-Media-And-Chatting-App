const Usermodel = require('../Models/Usermodel')
const Postmodel = require('../Models/PostModel')
const { checkAdmin } = require('../Tools/checkingFunction')
const mongoose = require('mongoose');
const Commentmodel = require('../Models/CommentModel');

const addComment = async (req, res) => {
    const postid = req.params.id;
    const { curuserid, commentdata } = await req.body;

    try {
        const thepost = await Postmodel.findById(postid);
        const ouruser = await Usermodel.findById(curuserid);

        if (!thepost) {
            res.status(401).json({ success: false, msg: 'Post Not Found' });
        }

        if (!ouruser) {
            res.status(401).json({ success: false, msg: 'User Not Found' });
        }


        const commentcreated = await Commentmodel.create({
            userId: curuserid,
            postId: postid,
            commentText: commentdata
        })

        // await ouruser.updateOne({ $push: { commented: newcommentforuser } })
        await Postmodel.findOneAndUpdate(
            { _id: postid },
            { $inc: { commentNo: 1 } },
            { new: true }
        );



        res.status(200).json({ success: true, msg: 'comment added', commentdata });
    } catch (error) {
        res.status(500).json({ success: false, err: error.message });
    }

};


const getcommentforthepost = async (req, res) => {
    const postid = req.params.id;
    const { curuserid, page } = await req.body;

    // const postcheck = await Postmodel.findById(postid)

    // if (!postcheck) {
    //     return res.status(401).json({ success: false, msg: 'Post Does not exist' });
    // }


    try {

        let convertedPostId = new mongoose.Types.ObjectId(postid)

        const thepostcomment = await Commentmodel.aggregate([
            { $match: { postId: convertedPostId } },
            { $skip: (page - 1) * 10 },
            { $limit: 10 }
        ])


        if (!thepostcomment) {
            return res.status(401).json({ success: false, msg: 'Comments/Post Not Found' });
        }

        return res.status(200).json({ success: true, msg: 'comment fetched', thepostcomment, page });



    } catch (error) {
        return res.status(500).json({ success: false, err: error.message });
    }

};



const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    const { curuserid } = await req.body;



    try {
        // Find the comment to be deleted
        const commentToDelete = await Commentmodel.findById(commentId);

        if (!commentToDelete) {
            return res.status(404).json({ success: false, msg: 'Comment not found' });
        }

        if (!commentToDelete.userId == curuserid) {
            return res.status(404).json({ success: false, msg: 'Unauthorized User' });
        }

        // Find the corresponding post
        const thepost = await Postmodel.findById(commentToDelete.postId);

        if (thepost) {
            // Update commentNo in the post, ensuring it doesn't go below 0
            await Postmodel.findByIdAndUpdate(
                thepost._id,
                { $inc: { commentNo: thepost.commentNo > 0 ? -1 : 0 } },
                { new: true }
            );
        }

        // Delete the comment
        await Commentmodel.findByIdAndDelete(commentId);

        return res.status(200).json({ success: true, msg: 'Comment deleted successfully' });

    } catch (error) {
        return res.status(500).json({ success: false, err: error.message });
    }
};





module.exports = { addComment, getcommentforthepost, deleteComment };