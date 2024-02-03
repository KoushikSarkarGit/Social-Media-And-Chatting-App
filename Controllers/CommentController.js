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
    // const { curuserid } = await req.body;
    const page = req.params.page;
    // const postcheck = await Postmodel.findById(postid)

    // if (!postcheck) {
    //     return res.status(401).json({ success: false, msg: 'Post Does not exist' });
    // }


    try {

        let convertedPostId = await new mongoose.Types.ObjectId(postid)

        const totalCommentCount = await Commentmodel.countDocuments({ postId: convertedPostId });

        const thepostcomment = await Commentmodel.aggregate([
            { $match: { postId: convertedPostId } },


            {
                $lookup: {
                    from: 'users', // The name of the Usermodel collection
                    localField: 'userId', // The field from Commentmodel
                    foreignField: '_id', // The field from Usermodel
                    as: 'userDetails'
                }
            },
            {
                $unwind: '$userDetails' // Deconstruct the array produced by $lookup
            },
            {
                $project: {
                    commentText: 1, // Include comment details
                    createdAt: 1,
                    userId: 1,
                    postId: 1,

                    'userDetails.profilePicture': 1,
                    'userDetails.username': 1,
                    'userDetails.firstname': 1,
                    'userDetails.lastname': 1
                }
            },


            { $skip: (page - 1) * 10 },
            { $limit: 10 }
        ])


        if (!thepostcomment) {
            return res.status(401).json({ success: false, msg: 'Comments/Post Not Found' });
        }

        return res.status(200).json({ success: true, msg: 'comment fetched', thepostcomment, page, totalCommentCount: totalCommentCount });



    } catch (error) {
        return res.status(500).json({ success: false, err: error.message });
    }

};


const getCommentOfLoggedUser = async (req, res) => {

    const { curuserid } = await req.body;
    const page = req.params.page;
    try {
        let LoggeduserId = new mongoose.Types.ObjectId(curuserid)
        const totalCommentCount = await Commentmodel.countDocuments({ userId: LoggeduserId });
        const LoggedUserComments = await Commentmodel.aggregate([
            { $match: { userId: LoggeduserId } },
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * 10 },
            { $limit: 10 }
        ])

        return res.status(200).json({ success: true, msg: 'comments of user fetched', LoggedUserComments, totalCommentCount });

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






const getCommentCountOfPost = async (req, res) => {

    const pid = req.params.pId

    try {
        let convertedpid = new mongoose.Types.ObjectId(pid)
        const totalCommentCount = await Commentmodel.countDocuments({ postId: convertedpid });


        return res.status(200).json({ success: true, msg: 'comment count of post fetched', totalCommentCount });

    } catch (error) {
        return res.status(500).json({ success: false, err: error.message });
    }
};



module.exports = { addComment, getcommentforthepost, getCommentOfLoggedUser, deleteComment, getCommentCountOfPost };