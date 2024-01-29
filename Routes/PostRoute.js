const express = require('express');
const router = express.Router();
const formidable = require('express-formidable')
const { createPost, getPost, updatePost, deletePost, getPostbytag, getTrendingTags, getPostsOfLoggedUser, getLikedPostsOfLoggedUser, getLoggedPostByIdLite, getRepostedPostsOfLoggedUser, getPostsByKeyword, getPostsByTagKeyword } = require('../Controllers/PostController')
const { valtokenchecker, extractIdFromToken } = require('../Middlewares/Encryptiontools');




router.post('/create-post', valtokenchecker, extractIdFromToken, formidable(), createPost)

router.get('/get-post/:id', getPost)

router.put('/update-post/:id', valtokenchecker, extractIdFromToken, formidable(), updatePost)

router.delete('/delete-post/:id', valtokenchecker, extractIdFromToken, formidable(), deletePost)





// get all post of a user  by page (page*10) 

router.get('/get-posts-of-logged-user/:pageno', valtokenchecker, extractIdFromToken, getPostsOfLoggedUser)



// get all liked post of a user  by page (page*10) it gives list of postid

router.get('/get-liked-post-of-logged-user/:pageno', valtokenchecker, extractIdFromToken, getLikedPostsOfLoggedUser)


// get liter version af liked post (logged in) it gives lighter version of liked post based on the post id. used in singlepostiterable

router.get('/get-liked-post-of-logged-user-by-id/:pid', valtokenchecker, extractIdFromToken, getLoggedPostByIdLite)



// get all reposted post of a user  by page (page*10) it gives list of reposted postid

router.get('/get-reposted-post-of-logged-user/:pageno', valtokenchecker, extractIdFromToken, getRepostedPostsOfLoggedUser)

// get reposted posts list of user (logged in) it gives lighter version of reposted post based on the post id. used in singlepostiterable

router.get('/get-reposted-post-of-logged-user-by-id/:pid', valtokenchecker, extractIdFromToken, getLoggedPostByIdLite)









//API for user timeline or other peoples timeline so jwt is not required but instead curuserid or the userid will be embeded in body

// get all post of a user  by page (page*10) 

router.post('/userprofile-get-posts-of-logged-user/:pageno', getPostsOfLoggedUser)


// get all liked post of a user  by page (page*10) it gives list of postid

router.post('/userprofile-get-liked-post-of-logged-user/:pageno', getLikedPostsOfLoggedUser)


// get liter version af liked post (logged in) it gives lighter version of liked post based on the post id. used in singlepostiterable

router.post('/userprofile-get-liked-post-of-logged-user-by-id/:pid', getLoggedPostByIdLite)


// get all reposted post of a user  by page (page*10) it gives list of reposted postid

router.post('/userprofile-get-reposted-post-of-logged-user/:pageno', getRepostedPostsOfLoggedUser)

// get reposted posts list of user (logged in) it gives lighter version of reposted post based on the post id. used in singlepostiterable

router.post('/userprofile-get-reposted-post-of-logged-user-by-id/:pid', getLoggedPostByIdLite)





















// apis for searching

//get Post by keyword 

router.get('/get-post-by-keyword/:keyword/:page', getPostsByKeyword)


//get Post based on tags via searching keyword 

router.get('/get-post-by-tags-keyword/:keyword/:page', getPostsByTagKeyword)





// trending sections

//get all post by tag
router.post('/get-post-by-tag', getPostbytag)

//get trending by tags
router.get('/get-trending', getTrendingTags)



module.exports = router