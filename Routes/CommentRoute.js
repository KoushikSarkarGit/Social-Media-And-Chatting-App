const express = require('express');
const { valtokenchecker, extractIdFromToken } = require('../Middlewares/Encryptiontools');
const { addComment, getcommentforthepost, deleteComment, getCommentOfLoggedUser } = require('../Controllers/CommentController');
const router = express.Router();


// add a comment
router.post('/add-comment/:id', valtokenchecker, extractIdFromToken, addComment);

//get all comments of a post by page
router.get('/get-comments/:id/:page', valtokenchecker, extractIdFromToken, getcommentforthepost);


//get all comments of a user by page
router.get('/get-comments-of-logged-user/:page', valtokenchecker, extractIdFromToken, getCommentOfLoggedUser);

//delete a comment 
router.delete('/delete-comment/:commentId', valtokenchecker, extractIdFromToken, deleteComment);


module.exports = router