const express = require('express');
const router = express.Router();
const formidable = require('express-formidable')
const { createPost } = require('../Controllers/PostController')
const { valtokenchecker, extractIdFromToken } = require('../Middlewares/Encryptiontools')



router.post('/create-post', valtokenchecker, extractIdFromToken, formidable(), createPost)


module.exports = router