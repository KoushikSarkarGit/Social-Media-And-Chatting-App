const express = require('express');
const { userRegistration, loginBackend, getSingleUser, updateUserDetails, updateProfilepic, updateCoverpic, followSomeOne, unfollowSomeOne, deleteAccount, likePost, unlikePost, rePost, unrePost, getTimelineForLoginUser, getGeneralTimeline, getUserFollowersid, getFollowerListByPage, getSingleUserLite, checkfrontendtoken, getSingleUserMedium, getPeopleByKeyword, getPostsByKeyword } = require('../Controllers/Usercontroller');
const router = express.Router();
const formidable = require('express-formidable')
const { valtokenchecker, extractIdFromToken } = require('../Middlewares/Encryptiontools')




//user authentication
router.post('/register', userRegistration);
router.post('/login', loginBackend)

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




//get timeline for logged in user

router.get('/get-feed/:id', valtokenchecker, extractIdFromToken, getTimelineForLoginUser)

//get timeline for non logged in user

router.get('/get-general-feed/', getGeneralTimeline)


//get people by keyword 

router.get('/get-people-by-keyword/:keyword/:page', getPeopleByKeyword)






// get followers id

router.get('/get-followersOf-user', valtokenchecker, extractIdFromToken, getUserFollowersid)


//checking token for frontend
router.post('/check-validity-of-jwttoken-from-client', checkfrontendtoken)








module.exports = router