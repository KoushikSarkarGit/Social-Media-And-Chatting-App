const { default: mongoose } = require('mongoose');
const Postmodel = require('../Models/PostModel')
const Usermodel = require('../Models/Usermodel')
const Tagmodel = require('../Models/TagsModel')
const cloudinary = require('../Tools/CloudinarySetup')

const { createBase64AndUpload, updateimageincloudinary } = require('../Tools/ImageToBase64')

require('dotenv').config();


const createPost = async (req, res) => {

    const { curuserid } = req.body
    const { postdescription, hashtags } = req.fields;
    const currentDate = new Date();
    let picturename = `Post Of ${curuserid} on ${currentDate}`;
    let finalpublicid = picturename;

    try {
        let { postimage } = await req.files;
        let posturl = null;

        if (postimage) {
            const uploadedfile = await createBase64AndUpload(postimage.path, picturename);
            posturl = uploadedfile.url
            finalpublicid = uploadedfile.public_id
        }



        const newpost = await Postmodel.create({ userId: curuserid, postdescription: postdescription, postimage: posturl, postPublicID: finalpublicid, tags: JSON.parse(req.fields.hashtags) })


        if (hashtags) {
            req.fields.hashtags = await JSON.parse(req.fields.hashtags)

            let newhashtags = req.fields.hashtags


            for (const element of newhashtags) {

                const iftagexist = await Tagmodel.find({ tagname: element.tagname })

                if (iftagexist.length < 1) {
                    let relatedpostdata = [];
                    relatedpostdata.push(newpost._id)

                    await Tagmodel.create({ tagname: element.tagname, relatedpost: relatedpostdata })
                }
                else {

                    await Tagmodel.updateOne(
                        { tagname: element.tagname },
                        { $inc: { count: 1 }, $push: { relatedpost: new mongoose.Types.ObjectId(newpost._id) } },
                        { new: true }
                    );
                }
            }
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

const getPostbytag = async (req, res) => {

    const { tagintrending } = req.body;

    try {

        const fetchedpost = await Postmodel.find({ tags: { $elemMatch: { tagname: tagintrending } } });
        return res.status(200).json({ success: true, tagintrending, msg: 'Post fetched based on tags successfully', fetchedpost });

    } catch (error) {

        return res.status(500).json({ success: false, msg: error.message });
    }

}

const getTrendingTags = async (req, res) => {


    try {

        const currentTrending = await Tagmodel.find().select('-relatedpost').sort({ count: -1 });
        return res.status(200).json({ success: true, msg: 'Trending tags fethced successfully', currentTrending });

    } catch (error) {

        return res.status(500).json({ success: false, msg: error.message });
    }

}





const getPostsOfLoggedUser = async (req, res) => {

    const { curuserid } = req.body
    const page = req.params.pageno

    try {
        const userId = new mongoose.Types.ObjectId(curuserid);

        const [totalPostsCount] = await Postmodel.aggregate([
            { $match: { userId: userId } },
            { $count: 'totalpostno' }
        ]);

        const fetchedpost = await Postmodel.aggregate([
            { $match: { userId: userId } },
            {
                $lookup: {
                    from: 'users', // my user model is named 'user' so it becomes users
                    let: { userId: '$userId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$_id', '$$userId'] }
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                profilePicture: 1
                                // Add other fields from the user model as needed
                            }
                        }
                    ],
                    as: 'userDetails'

                }
            },
            {
                $project: {
                    userId: 1,
                    postdescription: 1,
                    postimage: 1,
                    postPublicID: 1,
                    likesCurrentUser: { $in: [userId, '$likes'] },
                    repostsCurrentUser: { $in: [userId, '$reposts'] },
                    likesCount: { $size: '$likes' },
                    repostsCount: { $size: '$reposts' },
                    tags: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    'userDetails.username': 1,
                    'userDetails.profilePicture': 1
                }
            },
            { $skip: (page - 1) * 10 },
            { $limit: 10 }
        ]);

        return res.status(200).json({
            success: true,
            msg: 'Post fetched successfully',
            totalPostsCount,
            fetchedpost
        });

    } catch (error) {

        return res.status(500).json({ success: false, msg: error.message });
    }

}





const getLikedPostsOfLoggedUser = async (req, res) => {

    const { curuserid } = req.body
    const page = req.params.pageno

    try {
        const userId = new mongoose.Types.ObjectId(curuserid);

        const fetchedLikedPost = await Usermodel.aggregate([
            { $match: { _id: userId } },
            {
                $project: {
                    likedposts: {
                        $slice: ['$likedPost', (page - 1) * 10, 10]
                    },
                    totalLikecount: { $size: '$likedPost' }

                }
            }
        ]);






        // aggregate([
        //     { $match: { _id: userId } },

        //     {
        //         $project: {

        //             likedPost: 1,
        //             likedpostCount: { $size: '$likedPost' },
        //         }
        //     },
        //     { $skip: (page - 1) * 10 },
        //     { $limit: 10 }
        // ]);

        return res.status(200).json({
            success: true,
            msg: 'Liked Post fetched successfully',

            fetchedLikedPost
        });

    } catch (error) {

        return res.status(500).json({ success: false, msg: error.message });
    }

}



const getLoggedPostByIdLite = async (req, res) => {

    const { curuserid } = req.body
    const pid = req.params.pid

    try {
        const postId = new mongoose.Types.ObjectId(pid);
        const userId = new mongoose.Types.ObjectId(curuserid);

        const fetchedLitePost = await Postmodel.aggregate([
            { $match: { _id: postId } },

            {
                $lookup: {
                    from: 'users', // my user model is named 'user' so it becomes users
                    let: { userId: '$userId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$_id', '$$userId'] }
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                profilePicture: 1
                                // Added other fields from the user model as needed
                            }
                        }
                    ],
                    as: 'userDetails'

                }
            },
            {
                $project: {
                    userId: 1,
                    postdescription: 1,
                    postimage: 1,
                    postPublicID: 1,
                    tags: 1,
                    likedByCurrentUser: { $in: [userId, '$likes'] },
                    repostedByCurrentUser: { $in: [userId, '$reposts'] },
                    likeCount: { $size: '$likes' },
                    repostCount: { $size: '$reposts' },
                    createdAt: 1,
                    'userDetails.username': 1,
                    'userDetails.profilePicture': 1
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            msg: 'Liked Post fetched successfully',
            fetchedLitePost
        });

    } catch (error) {

        return res.status(500).json({ success: false, msg: error.message });
    }

}




const getRepostedPostsOfLoggedUser = async (req, res) => {

    const { curuserid } = req.body
    const page = req.params.pageno

    try {
        const userId = new mongoose.Types.ObjectId(curuserid);

        const fetchedRepostedPosts = await Usermodel.aggregate([
            { $match: { _id: userId } },
            {
                $project: {
                    repostedposts: {
                        $slice: ['$reposted', (page - 1) * 10, 10]
                    },
                    totalrepostcount: { $size: '$reposted' }

                }
            }
        ]);

        return res.status(200).json({
            success: true,
            msg: 'reposted Post ids fetched successfully',
            fetchedRepostedPosts
        });

    } catch (error) {

        return res.status(500).json({ success: false, msg: error.message });
    }

}





//get posts by keyword

const getPostsByKeyword = async (req, res) => {
    try {
        const keyword = req.params.keyword;

        const page = req.params.page || 1;
        const pageSize = 10; // Adjust as needed




        // Using regex to perform a case-insensitive search on postdescription
        const regex = new RegExp(keyword, 'i');

        const matchingPosts = await Postmodel.aggregate([
            {
                $match: {
                    postdescription: { $regex: regex }
                }
            },
            {
                $project: {
                    postdescription: 1,
                    postimage: 1,
                    postPublicID: 1,
                    likescount: { $size: { $ifNull: ["$likes", []] } },
                    repostscount: { $size: { $ifNull: ["$reposts", []] } },
                    commentscount: { $size: { $ifNull: ["$comments", []] } },
                    tags: 1
                }
            },
            { $skip: (page - 1) * pageSize },
            { $limit: 10 }
        ]);

        return res.status(200).json({ success: true, matchingPosts });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
};


//get tagwise posts by keyword


const getPostsByTagKeyword = async (req, res) => {
    try {
        const keyword = req.params.keyword;

        // Using regex to perform a case-insensitive search on tags
        const regex = new RegExp(keyword, 'i');

        const matchingPosts = await Postmodel.aggregate([
            {
                $match: {
                    tags: { $regex: regex }
                }
            },
            {
                $project: {
                    postdescription: 1,
                    postimage: 1,
                    postPublicID: 1,
                    likescount: { $size: "$likes" },
                    repostscount: { $size: "$reposts" },
                    commentscount: { $size: "$comments" },
                    tags: 1
                }
            },
            { $limit: 20 }
        ]);




        return res.status(200).json({ success: true, matchingPosts: matchingPosts[0] });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
};







module.exports = { createPost, getPost, updatePost, deletePost, getPostbytag, getTrendingTags, getPostsOfLoggedUser, getLikedPostsOfLoggedUser, getLoggedPostByIdLite, getRepostedPostsOfLoggedUser, getPostsByKeyword, getPostsByTagKeyword }