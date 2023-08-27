const express = require('express');
const router = express.Router();
const formidable = require('express-formidable')
const { createPost, getPost, updatePost, deletePost } = require('../Controllers/PostController')
const { valtokenchecker, extractIdFromToken } = require('../Middlewares/Encryptiontools');
const { json } = require('body-parser');



router.post('/create-post', valtokenchecker, extractIdFromToken, formidable(), createPost)

router.get('/get-post/:id', getPost)

router.put('/update-post/:id', valtokenchecker, extractIdFromToken, formidable(), updatePost)

router.delete('/delete-post/:id', valtokenchecker, extractIdFromToken, formidable(), deletePost)

router.post('/test', valtokenchecker, extractIdFromToken, formidable(), (req, res) => {

    req.fields.tags = JSON.parse(req.fields.tags)

    // console.log(this.toString(req.fields.tags))

    // let newdata = []
    // req.fields.tags.forEach(item => {
    //     newdata.push(1);
    // })
    return res.status(200).json({ before: req.fields })
})




module.exports = router