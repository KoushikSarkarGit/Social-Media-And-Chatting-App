const express = require('express');
const router = express.Router();
const formidable = require('express-formidable')
const { createPost, getPost, updatePost, deletePost } = require('../Controllers/PostController')
const { valtokenchecker, extractIdFromToken } = require('../Middlewares/Encryptiontools');




router.post('/create-post', valtokenchecker, extractIdFromToken, formidable(), createPost)

router.get('/get-post/:id', getPost)

router.put('/update-post/:id', valtokenchecker, extractIdFromToken, formidable(), updatePost)

router.delete('/delete-post/:id', valtokenchecker, extractIdFromToken, formidable(), deletePost)

// trending sections

//get all post by tag

//get trending by tags




module.exports = router