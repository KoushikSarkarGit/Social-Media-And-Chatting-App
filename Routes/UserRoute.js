const express = require('express');
const { userRegistration, loginBackend, getSingleUser } = require('../Controllers/Usercontroller');
const router = express.Router();
const cloudinary = require('../Tools/CloudinarySetup')

//user authentication
router.post('/register', userRegistration);
router.post('/login', loginBackend)

// user crud operation
router.get('/getuser/:id', getSingleUser)


//test photo upload
router.post('/photo-upload', async (req, res) => {
    const uploadedfile = await cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
        {
            upload_preset: "SocialMediaApp",
            public_id: "olympic_flag",

        },);

    res.send(uploadedfile)
})

module.exports = router