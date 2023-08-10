const express = require('express');
const { valtokenchecker, extractIdFromToken } = require('../Middlewares/Encryptiontools');
const { addComment, getcommentforthepost } = require('../Controllers/CommentController');
const router = express.Router();


// add a comment
router.post('/add-comment/:id', valtokenchecker, extractIdFromToken, addComment);

//get all comments of a post
router.post('/get-comments/:id', valtokenchecker, extractIdFromToken, getcommentforthepost);


module.exports = router