const express = require('express');
const { userRegistration, loginBackend, getSingleUser } = require('../Controllers/Usercontroller');
const router = express.Router();
const cloudinary = require('../Tools/CloudinarySetup')
const formidable = require('express-formidable')
const path = require('path')
//temporary
const fs = require('fs')


const generateBase64Image = async (imagePath) => {
    try {
        const data = await fs.readFileSync(imagePath);
        const base64Image = Buffer.from(data).toString('base64');
        return base64Image;
    } catch (err) {
        console.error('Error reading file:', err);
        throw err;
    }

}



//user authentication
router.post('/register', userRegistration);
router.post('/login', loginBackend)

// user crud operation
router.get('/getuser/:id', getSingleUser)


//test photo upload
router.post('/photo-upload', formidable(), async (req, res) => {
    // const uploadedfile = await cloudinary.uploader.upload("https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000",
    //     {
    //         upload_preset: "SocialMediaApp",
    //         public_id: "olympic_flag",

    //     },);


    const { image } = req.files;

    if (!image) {
        res.status(400).json({ error: 'Image file not provided.' });
        return;
    }

    const tempImagePath = image.path;
    const finalimage = await generateBase64Image(tempImagePath);
    try {


        let upl = `data:image/jpeg;base64,${finalimage}`
        const uploadedfile = await cloudinary.uploader.upload(upl, {
            upload_preset: 'SocialMediaApp',
            public_id: 'olympic_flag',
        });



        return res.send(uploadedfile);
    } catch (err) {
        console.error('Error processing the image:', err);
        res.status(500).json({ error: 'Error processing the image.' });
    }


})

module.exports = router