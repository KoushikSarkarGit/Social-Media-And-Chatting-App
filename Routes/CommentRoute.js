const express = require('express');
const { valtokenchecker, extractIdFromToken } = require('../Middlewares/Encryptiontools');
const { addComment, getcommentforthepost, deleteComment } = require('../Controllers/CommentController');
const router = express.Router();


// add a comment
router.post('/add-comment/:id', valtokenchecker, extractIdFromToken, addComment);

//get all comments of a post
router.post('/get-comments/:id', valtokenchecker, extractIdFromToken, getcommentforthepost);


//delete a comment 
router.delete('/delete-comment/:commentId', valtokenchecker, extractIdFromToken, deleteComment);


module.exports = router