const express = require('express');
const router = express.Router();
const formidable = require('express-formidable')
const { createPost, getPost, updatePost, deletePost, getPostbytag, getTrendingTags, getPostsOfLoggedUser, getLikedPostsOfLoggedUser, getLoggedPostByIdLite } = require('../Controllers/PostController')
const { valtokenchecker, extractIdFromToken } = require('../Middlewares/Encryptiontools');




router.post('/create-post', valtokenchecker, extractIdFromToken, formidable(), createPost)

router.get('/get-post/:id', getPost)

router.put('/update-post/:id', valtokenchecker, extractIdFromToken, formidable(), updatePost)

router.delete('/delete-post/:id', valtokenchecker, extractIdFromToken, formidable(), deletePost)

// get all post of a user  by page (page*10)

router.get('/get-posts-of-logged-user/:pageno', valtokenchecker, extractIdFromToken, getPostsOfLoggedUser)

// get all liked post of a user  by page (page*10)

router.get('/get-liked-post-of-logged-user/:pageno', valtokenchecker, extractIdFromToken, getLikedPostsOfLoggedUser)


// get liter version af liked post (logged in)

router.get('/get-liked-post-of-logged-user-by-id/:pid', valtokenchecker, extractIdFromToken, getLoggedPostByIdLite)

// trending sections

//get all post by tag
router.post('/get-post-by-tag', getPostbytag)

//get trending by tags
router.get('/get-trending', getTrendingTags)



module.exports = router