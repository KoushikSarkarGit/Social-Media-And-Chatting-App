
const Usermodel = require('../Models/Usermodel')
const bcrypt = require('bcrypt')
const Postmodel = require('../Models/PostModel')
const { encrytpassword, checkpassword } = require('../Middlewares/Encryptiontools')
const { createBase64AndUpload } = require('../Tools/ImageToBase64')
const { checkAdmin } = require('../Tools/checkingFunction')
const { getTrendingTags } = require('../Controllers/TagsController');
const Tagsmodel = require("../Models/TagsModel")

const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
require('dotenv').config();



// user registration/creation controller
const userRegistration = async (req, res) => {
    const { username, password, firstname, email, lastname } = req.body;

    let success = false;

    console.log(username, password, firstname, email, lastname);


    const user = await Usermodel.findOne({ email: email });

    if (user) {
        return res.status(200).json({ success: true, msg: 'User already exist. Please Login' });

    }

    try {

        const finalhashedpassword = await encrytpassword(password)

        const CreatedUser = await Usermodel.create({
            username,
            email,
            password: finalhashedpassword,
            firstname,
            lastname,
        });

        // const { password, ...sendingdata } = await CreatedUser;
        // delete CreatedUser.password;


        return res.status(200).json({ success: true, CreatedUser, msg: 'Registration successful' });

    } catch (error) {
        return res.status(501).json({ success, msg: error.message });
    }
};

// user login controller

const loginBackend = async (req, res) => {
    const { email, password } = req.body
    let success = false;

    try {
        const user = await Usermodel.findOne({ email: email })

        if (user) {
            const validity = await checkpassword(password, user.password)

            const token = await jwt.sign({ id: user._id }, process.env.jwt_secret_key, { expiresIn: '30d' });

            const sentuser = await Usermodel.aggregate([
                { $match: { email: email } },
                {
                    $project: {
                        _id: 1,
                        firstname: 1,
                        lastname: 1,
                        sex: 1,
                        email: 1,
                        isAdmin: 1,
                        phone: 1,
                        username: 1,
                        profilePicture: 1,
                        coverPicture: 1,
                        bio: 1,
                        livesin: 1,
                        worksAt: 1,
                        relationship: 1,
                        followersCount: { $size: "$followers" },
                        followingCount: { $size: "$following" },
                        likedPostCount: { $size: "$likedPost" },
                        repostedCount: { $size: "$reposted" }
                    }
                }
            ]);

            validity ? res.status(200).json({ success: true, jwttoken: token, sentuser: sentuser[0], msg: 'Login Successful' }) : res.status(400).json({ success: false, msg: "Wrong Username or Password" })
        }
        else {
            res.status(404).json("User does not exists. Please Sign Up first")
        }
    } catch (error) {
        res.status(500).json({ success, msg: error.message });
    }
}

// user login controller
const refershLoggedUserData = async (req, res) => {

    const { curuserid } = req.body;


    try {

        const MyUserId = await new mongoose.Types.ObjectId(curuserid)

        const refreshedUserdetails = await Usermodel.aggregate([
            { $match: { _id: MyUserId } },
            {
                $project: {
                    _id: 1,
                    firstname: 1,
                    lastname: 1,
                    sex: 1,
                    email: 1,
                    isAdmin: 1,
                    phone: 1,
                    username: 1,
                    profilePicture: 1,
                    coverPicture: 1,
                    bio: 1,
                    livesin: 1,
                    worksAt: 1,
                    relationship: 1,
                    followersCount: { $size: "$followers" },
                    followingCount: { $size: "$following" },
                    likedPostCount: { $size: "$likedPost" },
                    repostedCount: { $size: "$reposted" }
                }
            }
        ]);


        return res.status(201).json({ success: true, refreshedUserdetails: refreshedUserdetails[0] });

    } catch (error) {
        console.log('error happened', error.message)
        return res.status(500).json({ success: false, msg: error.message });
    }
}










// get a User controller
const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const curuser = await Usermodel.findById(id).select('-password');

        if (curuser) {
            return res.status(200).json({ success: true, msg: 'user fetched successfully', curuser });
        } else {
            return res.status(404).json({ success: true, msg: "User does not exist" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'user fetching unsuccessful', error });
    }
};


// get a User with less info
const getSingleUserLite = async (req, res) => {
    const id = req.params.id;

    try {
        const curuser = await Usermodel.findById(id).select('-password -followers -following -likedPost -reposted -commented');

        if (curuser) {
            return res.status(200).json({ success: true, msg: 'user fetched successfully', curuser });
        } else {
            return res.status(404).json({ success: true, msg: "User does not exist" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'user fetching unsuccessful', error });
    }
};



// get a User detals with mideum details
const getSingleUserMedium = async (req, res) => {
    const id = req.params.id;

    try {

        let userid = await new mongoose.Types.ObjectId(id)
        const userdetails = await Usermodel.aggregate([
            { $match: { _id: userid } },
            {
                $project: {
                    firstname: 1,
                    lastname: 1,
                    sex: 1,
                    username: 1,
                    profilePicture: 1,
                    coverPicture: 1,
                    bio: 1,
                    livesin: 1,
                    worksAt: 1,
                    relationship: 1,
                    followersCount: { $size: "$followers" },
                    followingCount: { $size: "$following" },
                    likedPostCount: { $size: "$likedPost" },
                    repostedCount: { $size: "$reposted" }
                }
            }
        ]);

        const [totalPostsCount] = await Postmodel.aggregate([
            { $match: { userId: userid } },
            { $count: 'totalpostno' }
        ]);


        const finaldata = {

            ...userdetails[0],
            totalPostsCount
        };


        if (userdetails) {
            return res.status(200).json({ success: true, msg: 'user fetched successfully', finaldata });
        } else {
            return res.status(404).json({ success: true, msg: "User does not exist" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'user fetching unsuccessful', err: error.message });
    }
};



// update user details
const updateUserDetails = async (req, res) => {
    const id = req.params.id;
    // let hashednewpassword = '';
    let adminresult = null;
    const { curuserid, adminstatus } = req.body;

    if (adminstatus) {
        adminresult = await checkAdmin(curuserid);
    }

    if (id === curuserid || adminresult) {
        try {
            // if (newpassword) {
            //     hashednewpassword = await encrytpassword(newpassword);
            // }

            const updateduser = await Usermodel.findByIdAndUpdate(id, { ...req.body }, {
                new: true,
                select: '-password -reposted -likedPost -following -followers'
            });

            return res.status(200).json({ success: true, msg: 'Update successful', updateduser });
        } catch (error) {
            return res.status(500).json({ success: false, msg: error.message });
        }


    } else {
        return res.status(403).json({ success: false, msg: "Access Denied! you can only update your own profile" });
    }
};

// update profile pic

const updateProfilepic = async (req, res) => {
    const id = req.params.id;

    const { curuserid } = req.body;

    const { profilePicture } = req.files;
    let picturename = `$profilepic of ${curuserid}`
    let imageurl1 = '';

    if (profilePicture) {

        const cloudresponse = await createBase64AndUpload(profilePicture.path, picturename);

        imageurl1 = cloudresponse.url;

    }

    let adminresult = await checkAdmin(curuserid);

    if (id === curuserid || adminresult) {
        try {

            const updateduser = await Usermodel.findByIdAndUpdate(curuserid, { profilePicture: imageurl1 }, { new: true, });

            res.status(200).json({ success: true, imageurl: updateduser.profilePicture });
        } catch (error) {
            res.status(500).json({ success: false, error });
        }


    } else {
        res.status(403).json({ success: false, msg: "Access Denied! you can only update your own profile" });
    }
};

// update cover pic

const updateCoverpic = async (req, res) => {
    const id = req.params.id;

    const { curuserid } = req.body;

    const { coverPicture } = req.files;
    let imageurl1 = '';
    let picturename = `$coverfilepic of ${curuserid}`

    if (coverPicture) {
        imageurl1 = await createBase64AndUpload(coverPicture.path, picturename);
    }

    let adminresult = await checkAdmin(curuserid);

    if (id === curuserid || adminresult) {
        try {

            const updateduser = await Usermodel.findByIdAndUpdate(curuserid, { coverPicture: imageurl1.url }, { new: true, });

            res.status(200).json({ success: true, imageurl: updateduser.coverPicture });
        } catch (error) {
            res.status(500).json({ success: false, error });
        }


    } else {
        res.status(403).json({ success: false, msg: "Access Denied! you can only update your own profile" });
    }
};


// get followerlist

const getFollowerListByPage = async (req, res) => {
    const { curuserid } = req.body;

    let page = req.params.pageno

    try {
        const user = await Usermodel.findById(curuserid);

        if (!user) {
            res.status(200).json({ success: false, msg: 'User does not exist' });
        }

        if (user._id) {
            const myuser = await Usermodel.aggregate([
                { $match: { _id: user._id } },
                {
                    $project: {
                        followers: {
                            $slice: ['$followers', (page - 1) * 10, 10]
                        }
                    }
                }
            ]);

            return res.status(200).json({ success: true, msg: 'follwer list fetched successful', myuser });
        }

    } catch (error) {
        res.status(500).json({ success: false, error });
    }

};

// follow someone
const followSomeOne = async (req, res) => {
    const tobefollowedid = req.params.id;
    const { curuserid } = req.body;

    if (tobefollowedid === curuserid) {
        res.status(403).json({ success: false, msg: "You cannot follow your own account" });
    }

    try {
        const tobefollowed = await Usermodel.findById(tobefollowedid);
        const ouruser = await Usermodel.findByIdAndUpdate(curuserid);

        if (!tobefollowed.followers.includes(curuserid)) {
            await tobefollowed.updateOne({ $push: { followers: ouruser._id } });

            await ouruser.updateOne({ $push: { following: tobefollowed._id } });
        }

        res.status(200).json({ success: true, msg: 'user followed' });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }

};

// unfollow someone

const unfollowSomeOne = async (req, res) => {
    const tobeunfollowedid = req.params.id;
    const { curuserid } = req.body;

    if (tobeunfollowedid === curuserid) {
        return res.status(403).json({ success: false, msg: "You cannot follow your own account" });
    }

    try {
        const tobefollowed = await Usermodel.findById(tobeunfollowedid);
        const ouruser = await Usermodel.findByIdAndUpdate(curuserid);

        if (ouruser.following.includes(tobeunfollowedid)) {
            await tobefollowed.updateOne({ $pull: { followers: ouruser._id } });

            await ouruser.updateOne({ $pull: { following: tobefollowed._id } });
        }

        return res.status(200).json({ success: true, msg: 'user unfollowed' });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }

};


const deleteAccount = async (req, res) => {
    const id = req.params.id;

    const { curuserid } = req.body;

    let adminresult = await checkAdmin(curuserid);


    if (id === curuserid || adminresult) {
        try {

            const deleted = await Usermodel.findByIdAndDelete(curuserid);

            res.status(200).json({ success: true, msg: 'Account deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }


    } else {
        res.status(403).json({ success: false, msg: "Access Denied" });
    }
};



// Like post
const likePost = async (req, res) => {
    const tobeLikedPostid = req.params.id;
    const { curuserid } = req.body;

    try {
        const tobeLiked = await Postmodel.findById(tobeLikedPostid);

        if (!tobeLiked) {
            return res.status(500).json({ success: false, msg: 'Post does not exist' });
        }

        const ouruser = await Usermodel.findById(curuserid);

        if (!ouruser.likedPost.includes(tobeLiked._id)) {
            await tobeLiked.updateOne({ $push: { likes: ouruser._id } });

            await ouruser.updateOne({ $push: { likedPost: tobeLiked._id } });
        }

        res.status(200).json({ success: true, msg: 'Post Liked' });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }

};


// unlike post

const unlikePost = async (req, res) => {
    const tobeLikedPostid = req.params.id;
    const { curuserid } = req.body;

    try {
        const tobeLiked = await Postmodel.findById(tobeLikedPostid);
        const ouruser = await Usermodel.findById(curuserid);

        if (ouruser.likedPost.includes(tobeLiked._id)) {
            await tobeLiked.updateOne({ $pull: { likes: ouruser._id } });

            await ouruser.updateOne({ $pull: { likedPost: tobeLiked._id } });
        }

        res.status(200).json({ success: true, msg: 'post unliked' });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }

};

// repost a  post
const rePost = async (req, res) => {
    const toberepostedid = req.params.id;
    const { curuserid } = req.body;

    try {
        const tobereposted = await Postmodel.findById(toberepostedid);
        const ouruser = await Usermodel.findById(curuserid);

        if (!ouruser.reposted.includes(tobereposted._id)) {
            await tobereposted.updateOne({ $push: { reposts: ouruser._id } });

            await ouruser.updateOne({ $push: { reposted: tobereposted._id } });
        }

        res.status(200).json({ success: true, msg: 'Post reposted' });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }

};


// unrepost a  post
const unrePost = async (req, res) => {
    const toberepostedid = req.params.id;
    const { curuserid } = req.body;

    try {
        const tobereposted = await Postmodel.findById(toberepostedid);

        if (!tobereposted) {
            res.status(200).json({ success: false, msg: 'Post does not exist' });
        }


        const ouruser = await Usermodel.findById(curuserid);

        if (ouruser.reposted.includes(tobereposted._id)) {
            await tobereposted.updateOne({ $pull: { reposts: ouruser._id } });

            await ouruser.updateOne({ $pull: { reposted: tobereposted._id } });
        }

        res.status(200).json({ success: true, msg: 'Post unreposted' });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }

};


// feed for logged in user
const getTimelineForLoginUser = async (req, res) => {
    const usert = req.params.id;
    const page = req.params.page
    const { curuserid } = req.body;
    const postsPerPage = 10;
    const followingPostsLimit = 5;

    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    const TenDaysAgo = new Date();
    TenDaysAgo.setDate(TenDaysAgo.getDate() - 20)

    try {
        const user = await Usermodel.findById(curuserid);

        if (!user) {
            res.status(200).json({ success: false, msg: 'User does not exist' });
        }


        const followingPosts = await Usermodel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(user._id) } },
            {
                $lookup: {
                    from: 'post',
                    localField: 'following',
                    foreignField: 'userId',
                    as: 'followingposts'
                }
            },
            { $unwind: '$followingposts' },
            {
                $project: {
                    '_id': '$followingposts._id',
                    'userId': '$followingposts.userId',
                    'postdescription': '$followingposts.postdescription',
                    'postimage': '$followingposts.postimage',
                    'postPublicID': '$followingposts.postPublicID',
                    'createdAt': '$followingposts.createdAt',
                    'likescount': { $size: '$followingposts.likes' },
                    'repostedcount': { $size: '$followingposts.reposts' },
                    'tags': '$followingposts.tags'
                }
            },
            { $sort: { 'createdAt': -1 } }, // Sort by timestamp in descending order
            { $skip: page * followingPostsLimit },
            { $limit: followingPostsLimit } // Adjust the limit as needed for pagination
        ]);


        const remainingTrendingPostsLimit = postsPerPage - followingPosts.length;


        const totalTagsUpdatedinpast5days = await Tagsmodel.countDocuments({
            updatedAt: { $gte: fiveDaysAgo }
        });



        const totalTagsUpdatedinpast10days = await Tagsmodel.countDocuments({
            updatedAt: { $gte: TenDaysAgo }
        });


        let mytrendingTags;

        if (totalTagsUpdatedinpast5days > 0) {

            mytrendingTags = await Tagsmodel.aggregate([
                {
                    $match: {
                        updatedAt: { $gte: fiveDaysAgo }
                    }
                },
                {
                    $addFields: {
                        countHistoryWithin5Days: {
                            $filter: {
                                input: {
                                    $ifNull: ["$countHistory", []] // Provide an empty array if countHistory is null
                                },
                                as: "entry",
                                cond: { $gte: ["$$entry.timestamp", fiveDaysAgo] }
                            }
                        }
                    }
                },
                {
                    $addFields: {
                        fiveDaysAgoCount: { $size: "$countHistoryWithin5Days" }
                    }
                },
                {
                    $project: {
                        tagname: 1,
                        fiveDaysAgoCount: 1,

                        count: 1
                    }
                },
                {
                    $sort: { fiveDaysAgoCount: -1, count: -1 }
                },


                {
                    $limit: 10 // Adjust the limit as per your requirement
                }
            ]);


        }
        else if (totalTagsUpdatedinpast10days > 0) {


            mytrendingTags = await Tagsmodel.aggregate([
                {
                    $match: {
                        updatedAt: { $gte: TenDaysAgo }
                    }
                },
                {
                    $addFields: {
                        countHistoryWithin10Days: {
                            $filter: {
                                input: {
                                    $ifNull: ["$countHistory", []] // Provide an empty array if countHistory is null
                                },
                                as: "entry",
                                cond: { $gte: ["$$entry.timestamp", TenDaysAgo] }
                            }
                        }
                    }
                },
                {
                    $addFields: {
                        tenDaysAgoCount: { $size: "$countHistoryWithin10Days" }
                    }
                },
                {
                    $project: {
                        tagname: 1,
                        tenDaysAgoCount: 1,

                        count: 1
                    }
                },
                {
                    $sort: { tenDaysAgoCount: -1, count: -1 }
                },


                {
                    $limit: 10 // Adjust the limit as per your requirement
                }
            ]);


        }
        else {


            mytrendingTags = await Tagsmodel.find({}).sort({ count: -1 }).limit(20).select('tagname count');

        }









        const trendingTags = mytrendingTags.length > 0 ? mytrendingTags : [];


        const trendingPosts = [];
        for (const tag of trendingTags) {
            const tagDocument = await Tagsmodel.findOne({ tagname: tag.tagname });
            if (tagDocument && tagDocument.relatedpost && tagDocument.relatedpost.length > 0) {
                const postFromTag = await Postmodel.findById(tagDocument.relatedpost[0]); // Fetch the first related post
                if (postFromTag) {
                    trendingPosts.push(postFromTag);
                    if (trendingPosts.length === remainingTrendingPostsLimit) {
                        break; // Break the loop when the limit is reached
                    }
                }
            }
        }






        // Combine and sort both sets of posts
        const combinedPosts = [...followingPosts, ...trendingPosts];
        const sortedPosts = combinedPosts.sort((a, b) => b.createdAt - a.createdAt);

        return res.status(200).json({ success: true, feed: sortedPosts });










    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error });
    }

};


const getGeneralTimeline = async (req, res) => {

    try {

        let yourtimeline = await Postmodel.find().sort({ "createdAt": -1 })


        res.status(200).json({ success: true, yourtimeline });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }

};



//get people by keyword

const getPeopleByKeyword = async (req, res) => {
    try {
        const keyword = req.params.keyword;

        const page = req.params.page || 1;
        const pageSize = 10; // Adjust as needed
        // Using regex to perform a case-insensitive search on firstname, lastname, and username
        const regex = new RegExp(keyword, 'i');

        const totalResults = await Usermodel.countDocuments({
            $or: [
                { firstname: { $regex: regex } },
                { lastname: { $regex: regex } },
                { username: { $regex: regex } },
            ]
        });




        const matchingUsers = await Usermodel.aggregate([
            {
                $match: {
                    $or: [
                        { firstname: { $regex: regex } },
                        { lastname: { $regex: regex } },
                        { username: { $regex: regex } },
                    ]
                }
            },
            {
                $project: {
                    _id: 1,
                    firstname: 1,
                    lastname: 1,
                    username: 1,
                    profilePicture: 1,
                    bio: 1,
                    likescount: { $size: { $ifNull: ["$likedPost", []] } },
                    repostscount: { $size: { $ifNull: ["$reposted", []] } },
                    followerscount: { $size: "$followers" },
                    followingcount: { $size: "$following" },
                }
            },
            { $skip: (page - 1) * pageSize },
            { $limit: 10 }
        ]);

        return res.status(200).json({ success: true, matchingUsers, totalResults, pageSize });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
};











const getUserFollowersid = async (req, res) => {

    const { curuserid } = req.body;


    const user = await Usermodel.findById(curuserid);

    if (!user) {
        return res.status(200).json({ success: false, msg: 'User does not exist' });
    }

    try {

        let yourFollowers = await Usermodel.aggregate([
            { $match: { _id: user._id } },
            {
                $project: {
                    followers: {

                        $slice: ['$followers', 0, 10]
                    }
                }
            }
        ]);


        return res.status(200).json({ success: true, yourFollowers });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }

};




const checkfrontendtoken = async (req, res) => {

    const reqtoken = await req.headers.token;
    try {
        let tokencheck = await jwt.verify(reqtoken, process.env.jwt_secret_key);
        if (!tokencheck) {
            return res.status(400).json({ success: false, msg: "invalid token. Please LogOut and Login again" })
        }



        const decode = await jwt.verify(
            req.headers.token,
            process.env.jwt_secret_key
        );
        const curuserid = decode.id;
        const user = await Usermodel.findById(curuserid).select('_id');
        if (!user) {
            return res.status(400).json({ success: false, msg: 'User does not exist' });
        }




        return res.status(200).json({ success: true, msg: 'valid token' });
    } catch (error) {
        return res.status(200).json({ success: false, error });
    }

};




const getStatusIfPostIsLiked = async (req, res) => {
    const { curuserid } = req.body;
    const postid = await req.params.postId;
    let likedByCurrentUser = false;
    try {



        const curId = new mongoose.Types.ObjectId(curuserid)
        const post_Id = new mongoose.Types.ObjectId(postid)

        const postLikedByUser1 = await Usermodel.exists({
            _id: curuserid,
            likedPost: { $elemMatch: { $eq: post_Id } }
        });
        const postLikedByUser2 = await Postmodel.exists({
            _id: postid,
            likes: { $elemMatch: { $eq: curId } }
        });


        if (postLikedByUser1 || postLikedByUser2) {
            likedByCurrentUser = true
        }



        return res.status(200).json({ success: true, msg: 'post liked by user', likedByCurrentUser });
    } catch (error) {
        return res.status(200).json({ success: false, error });
    }

};



const getStatusIfPostIsReposted = async (req, res) => {
    const { curuserid } = req.body;
    const postid = await req.params.postId;
    let repostedByCurrentUser = false;
    try {



        const curId = new mongoose.Types.ObjectId(curuserid)
        const post_Id = new mongoose.Types.ObjectId(postid)

        const postRepostedByUser1 = await Usermodel.exists({
            _id: curuserid,
            reposted: { $elemMatch: { $eq: post_Id } }
        });
        const postRepostedByUser2 = await Postmodel.exists({
            _id: postid,
            reposts: { $elemMatch: { $eq: curId } }
        });


        if (postRepostedByUser1 || postRepostedByUser2) {
            repostedByCurrentUser = true
        }



        return res.status(200).json({ success: true, msg: 'post liked by user', repostedByCurrentUser });
    } catch (error) {
        return res.status(200).json({ success: false, error });
    }

};



const checkIfLoggedUserFollowsUser = async (req, res) => {
    const { curuserid } = req.body;
    const userid = await req.params.id;
    let followedbyuser = false;
    try {

        const curId = new mongoose.Types.ObjectId(curuserid)
        const User_Id = new mongoose.Types.ObjectId(userid)

        const userfollowed = await Usermodel.exists({
            _id: curuserid,
            following: { $elemMatch: { $eq: User_Id } }
        });
        const userfollowed2 = await Usermodel.exists({
            _id: User_Id,
            followers: { $elemMatch: { $eq: curId } }
        });


        if (userfollowed || userfollowed2) {
            followedbyuser = true
        }



        return res.status(200).json({ success: true, msg: 'post liked by user', followedbyuser });
    } catch (error) {
        return res.status(200).json({ success: false, error });
    }

};





module.exports = { userRegistration, loginBackend, getSingleUser, updateUserDetails, updateProfilepic, updateCoverpic, followSomeOne, unfollowSomeOne, deleteAccount, likePost, unlikePost, rePost, unrePost, getTimelineForLoginUser, getGeneralTimeline, getUserFollowersid, getFollowerListByPage, getSingleUserLite, checkfrontendtoken, getSingleUserMedium, getPeopleByKeyword, getStatusIfPostIsLiked, getStatusIfPostIsReposted, refershLoggedUserData, checkIfLoggedUserFollowsUser }
