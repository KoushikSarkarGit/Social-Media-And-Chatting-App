const express = require('express');
const { userRegistration, loginBackend, getSingleUser, updateUserDetails, updateProfilepic, updateCoverpic, followSomeOne, unfollowSomeOne, deleteAccount, likePost, unlikePost, rePost, unrePost, getUserFollowersid, getFollowerListByPage, getSingleUserLite, checkfrontendtoken, getSingleUserMedium, getPeopleByKeyword, getPostsByKeyword, getStatusIfPostIsLiked, getStatusIfPostIsReposted, refershLoggedUserData, checkIfLoggedUserFollowsUser, getFeedForLoginUser, getGeneralFeed } = require('../Controllers/Usercontroller');
const router = express.Router();
const formidable = require('express-formidable')
const { valtokenchecker, extractIdFromToken } = require('../Middlewares/Encryptiontools')




//user authentication
router.post('/register', userRegistration);
router.post('/login', loginBackend)

// refreshing localstorage data

router.get('/refresh-logged-user-data', valtokenchecker, extractIdFromToken, refershLoggedUserData)


// user crud operation
router.get('/getuser/:id', getSingleUser)
// get less info of user
router.get('/get-user-light/:id', getSingleUserLite)

// get medium info of user
router.get('/get-user-medium/:id', getSingleUserMedium)



//update user details
router.put('/update-userdetails/:id', valtokenchecker, extractIdFromToken, updateUserDetails)

// update profile picture
router.put('/update-profilepic/:id', valtokenchecker, extractIdFromToken, formidable(), updateProfilepic)

// update cover picture
router.put('/update-coverpic/:id', valtokenchecker, extractIdFromToken, formidable(), updateCoverpic)

// delete user account
router.delete('/delete-user-account/:id', valtokenchecker, extractIdFromToken, deleteAccount)





// get followers of a user by page
router.get('/get-follower-list/:pageno', valtokenchecker, extractIdFromToken, getFollowerListByPage)

// follow a user
router.put('/follow-user/:id', valtokenchecker, extractIdFromToken, followSomeOne)

// unfollow a user
router.put('/unfollow-user/:id', valtokenchecker, extractIdFromToken, unfollowSomeOne)






// like a post
router.put('/like-post/:id', valtokenchecker, extractIdFromToken, likePost)

// like a post
router.put('/unlike-post/:id', valtokenchecker, extractIdFromToken, unlikePost)

// repost a post
router.put('/repost/:id', valtokenchecker, extractIdFromToken, rePost)

// unrepost a post
router.put('/unrepost/:id', valtokenchecker, extractIdFromToken, unrePost)




//get feed for logged in user

router.post('/get-feed/:id', valtokenchecker, extractIdFromToken, getFeedForLoginUser)

//get feed for non logged in user

router.get('/get-general-feed/:page', getGeneralFeed)










//get people by keyword 

router.get('/get-people-by-keyword/:keyword/:page', getPeopleByKeyword)






// get followers id

router.get('/get-followersOf-user', valtokenchecker, extractIdFromToken, getUserFollowersid)


//checking token for frontend
router.post('/check-validity-of-jwttoken-from-client', checkfrontendtoken)

//checking if logged user follows user

router.get('/check-if-logged-user-follows-user/:id', valtokenchecker, extractIdFromToken, checkIfLoggedUserFollowsUser)


//checking if user likes / retweeted / etc


//checking if user liked the post
router.get('/check-if-user-likes-post/:postId', valtokenchecker, extractIdFromToken, getStatusIfPostIsLiked)

//checking if user  reposted the post
router.get('/check-if-user-reposted-post/:postId', valtokenchecker, extractIdFromToken, getStatusIfPostIsReposted)




module.exports = router