
const Usermodel = require('../Models/Usermodel')
const bcrypt = require('bcrypt')
const Postmodel = require('../Models/PostModel')
const { encrytpassword, checkpassword } = require('../Middlewares/Encryptiontools')
const { createBase64AndUpload } = require('../Tools/ImageToBase64')
const { checkAdmin } = require('../Tools/checkingFunction')
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
    const usernameOfuser = await Usermodel.findOne({ username: username });
    if (usernameOfuser) {
        return res.status(200).json({ success: false, msg: 'Username already taken, please choose another one' });

    }

    if (user) {
        return res.status(200).json({ success: false, msg: 'User already exist. Please Login' });

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
            // console.log(validity)
            validity ? res.status(200).json({ success: true, jwttoken: token, sentuser: sentuser[0], msg: 'Login Successful' }) : res.status(401).json({ success: false, msg: "Wrong Username or Password" })
        }
        else {
            res.status(401).json("User does not exists. Please Sign Up first")
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

        let [totalPostsCount] = await Postmodel.aggregate([
            { $match: { userId: userid } },
            { $count: 'totalpostno' }
        ]);
        if (!totalPostsCount || totalPostsCount.length < 1) {
            totalPostsCount = { "totalpostno": 0 }
        }

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

            // const userNameCheck = await Usermodel.findOne({ username: req.body.username }).select("_id username");
            // if (userNameCheck) {
            //     return res.status(204).json({ success: false, msg: 'Username Already Taken' });
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


//get inital 10 followers ids
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


const getUserFollowingsid = async (req, res) => {

    const { curuserid } = req.body;


    const user = await Usermodel.findById(curuserid);

    if (!user) {
        return res.status(200).json({ success: false, msg: 'User does not exist' });
    }

    try {

        let yourFollowings = await Usermodel.aggregate([
            { $match: { _id: user._id } },
            {
                $project: {
                    following: {

                        $slice: ['$following', 0, 10]
                    }
                }
            }
        ]);


        return res.status(200).json({ success: true, yourFollowings });
    } catch (error) {
        res.status(500).json({ success: false, error });
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




const getFollowingListByPage = async (req, res) => {
    const { curuserid } = req.body;

    let page = req.params.pageno

    try {
        const user = await Usermodel.findById(curuserid);

        if (!user) {
            res.status(200).json({ success: false, msg: 'User does not exist' });
        }

        if (user._id) {
            const followinglist = await Usermodel.aggregate([
                { $match: { _id: user._id } },
                {
                    $project: {
                        following: {
                            $slice: ['$following', (page - 1) * 10, 10]
                        }
                    }
                }
            ]);

            return res.status(200).json({ success: true, msg: 'follwer list fetched successful', followinglist });
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
const getFeedForLoginUser = async (req, res) => {
    // const usert = req.params.id;

    const curindex = parseInt(req.body.followerindex)
    const popularindex = parseInt(req.body.popularindex)

    const { curuserid } = req.body;
    const postsPerPage = 10;
    const followingPostsLimit = 7;

    try {
        const user = await Usermodel.findById(curuserid).select('_id following');

        if (!user) {
            res.status(200).json({ success: false, msg: 'User does not exist' });
        }

        const followingUserIds = user.following;

        // Array to store all posts
        let followingPosts = [];

        let intpage = 0
        let iterator = 0
        if (followingUserIds.length > 0) {


            for (let i = 0; followingPosts.length < followingPostsLimit && i < 7; i++) {
                // Loop through each followed user and fetch their posts
                for (const userId of followingUserIds) {
                    if (iterator < curindex) {
                        iterator++;
                        continue;
                    }

                    // Fetch the current post for the followe
                    const curpost = await Postmodel.aggregate([
                        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
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
                                            profilePicture: 1,
                                            _id: 1
                                            // Add other fields from the user model as needed
                                        }
                                    }
                                ],
                                as: 'userDetails'

                            }
                        },
                        {
                            $project: {
                                '_id': '$_id',
                                'userId': '$userId',
                                'postdescription': '$postdescription',
                                'postimage': '$postimage',
                                'postPublicID': '$postPublicID',
                                'createdAt': '$createdAt',
                                'likescount': { $size: '$likes' },
                                'repostscount': { $size: '$reposts' },
                                'tags': '$tags',
                                commentNo: 1,
                                'userDetails.username': 1,
                                'userDetails.profilePicture': 1
                            }
                        },

                        { $skip: intpage },

                        { $limit: 1 }
                    ]);

                    // Add the fetched post to followingPosts array
                    if (curpost.length > 0 && curpost !== undefined) {
                        followingPosts.push(curpost[0]);
                    }

                    // Check if the followingPostsLimit is reached
                    if (followingPosts.length >= followingPostsLimit) {
                        break;
                    }
                }

                if (followingPosts.length < followingPostsLimit) {
                    intpage++;
                }

                if (followingPosts.length >= followingPostsLimit) {
                    break;
                }
            }



        }



        const remainingTrendingPostsLimit = postsPerPage - followingPosts.length;
        const followingPostIds = followingPosts.map(post => post._id);

        let popularPosts = [];

        popularPosts = await Postmodel.aggregate([
            { $match: { _id: { $nin: followingPostIds } } },
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
                                profilePicture: 1,
                                _id: 1
                                // Add other fields from the user model as needed
                            }
                        }
                    ],
                    as: 'userDetails'

                }
            },

            {
                $project: {
                    '_id': '$_id',
                    'userId': '$userId',
                    'postdescription': '$postdescription',
                    'postimage': '$postimage',
                    'postPublicID': '$postPublicID',
                    'createdAt': '$createdAt',
                    'likescount': { $size: '$likes' },
                    'repostscount': { $size: '$reposts' },
                    'tags': '$tags',
                    commentNo: 1,
                    'userDetails.username': 1,
                    'userDetails.profilePicture': 1
                }
            },
            { $sort: { likescount: -1 } },
            { $skip: popularindex },
            { $limit: remainingTrendingPostsLimit }
        ]);



        // Combine and sort both sets of posts
        const combinedPosts = [...followingPosts, ...popularPosts];
        const sortedPosts = combinedPosts.sort((a, b) => b.createdAt - a.createdAt);

        return res.status(200).json({ success: true, feed: sortedPosts, followingpostcount: followingPosts.length, popularpostcount: popularPosts.length });



    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error });
    }

};


const getGeneralFeed = async (req, res) => {

    try {
        const page = req.params.page

        let yourFeed = [];

        yourFeed = await Postmodel.aggregate([

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
                                profilePicture: 1,
                                _id: 1
                                // Add other fields from the user model as needed
                            }
                        }
                    ],
                    as: 'userDetails'

                }
            },

            {

                $project: {
                    '_id': '$_id',
                    'userId': '$userId',
                    'postdescription': '$postdescription',
                    'postimage': '$postimage',
                    'postPublicID': '$postPublicID',
                    'createdAt': '$createdAt',
                    'likescount': { $size: '$likes' },
                    'repostscount': { $size: '$reposts' },
                    'tags': '$tags',
                    commentNo: 1,
                    'userDetails.username': 1,
                    'userDetails.profilePicture': 1
                }
            },
            { $sort: { likescount: -1 } },
            { $skip: (page - 1) * 10 },
            { $limit: 10 }
        ]);

        res.status(200).json({ success: true, feed: yourFeed });
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












const getNewPeople = async (req, res) => {

    try {
        const page = req.params.page;
        const USER_ID = req.body.userId;

        let newpeople = [];

        if (USER_ID) {


            const user = await Usermodel.findById(USER_ID).select('_id following');

            if (!user) {
                res.status(200).json({ success: false, msg: 'User does not exist' });
            }

            let followingUserIds = user.following;
            await followingUserIds.push(user._id);


            newpeople = await Usermodel.aggregate([
                { $match: { _id: { $nin: followingUserIds } } },
                {
                    $project: {
                        username: 1,
                        firstname: 1,
                        lastname: 1,
                        profilePicture: 1,
                        'createdAt': '$createdAt',
                        followerscount: { $size: { $ifNull: ["$followers", []] } }
                    }
                },
                { $sort: { followerscount: -1 } },
                { $skip: (page - 1) * 10 },
                { $limit: 10 }
            ]);

        }
        else {

            newpeople = await Usermodel.aggregate([
                {
                    $project: {
                        username: 1,
                        firstname: 1,
                        lastname: 1,
                        profilePicture: 1,
                        'createdAt': '$createdAt',
                        followerscount: { $size: { $ifNull: ["$followers", []] } }
                    }
                },
                { $sort: { followerscount: -1 } },
                { $skip: (page - 1) * 10 },
                { $limit: 10 }
            ]);
        }





        res.status(200).json({ success: true, newpeople });
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





module.exports = { userRegistration, loginBackend, getSingleUser, updateUserDetails, updateProfilepic, updateCoverpic, followSomeOne, unfollowSomeOne, deleteAccount, likePost, unlikePost, rePost, unrePost, getFeedForLoginUser, getGeneralFeed, getUserFollowersid, getFollowerListByPage, getSingleUserLite, checkfrontendtoken, getSingleUserMedium, getPeopleByKeyword, getStatusIfPostIsLiked, getStatusIfPostIsReposted, refershLoggedUserData, checkIfLoggedUserFollowsUser, getNewPeople, getUserFollowingsid, getFollowingListByPage }
