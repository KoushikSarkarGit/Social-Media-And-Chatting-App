const fs = require('fs')
const cloudinary = require('../Tools/CloudinarySetup')

const createBase64AndUpload = async (imagepath, imgName) => {


    try {

        const data = await fs.readFileSync(imagepath);
        const base64Image = await Buffer.from(data).toString('base64');
        let tobeuploadedimage = `data:image/jpeg;base64,${base64Image}`

        //cloudinary upload
        const uploadedfile = await cloudinary.uploader.upload(tobeuploadedimage, {
            upload_preset: 'SocialMediaApp',
            public_id: imgName

        }, function (err, result) { console.log(result) });




        return uploadedfile;

    } catch (error) {
        console.log({ success: false, msg: 'failed during processing or uploading image', err: error })
    }

}

const updateimageincloudinary = async (imagepath, imgName) => {


    try {

        const data = await fs.readFileSync(imagepath);
        const base64Image = await Buffer.from(data).toString('base64');
        let tobeuploadedimage = `data:image/jpeg;base64,${base64Image}`

        //cloudinary upload
        const uploadedfile = await cloudinary.uploader.upload(tobeuploadedimage, {
            public_id: imgName

        }, function (err, result) { console.log(result) });




        return uploadedfile;

    } catch (error) {
        console.log({ success: false, msg: 'failed during processing or uploading image', err: error })
    }

}




module.exports = { createBase64AndUpload, updateimageincloudinary };