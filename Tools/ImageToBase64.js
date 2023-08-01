const fs = require('fs')
const cloudinary = require('../Tools/CloudinarySetup')

const createBase64AndUpload = async (imagepath) => {


    try {

        const data = await fs.readFileSync(imagepath);
        const base64Image = await Buffer.from(data).toString('base64');
        let tobeuploadedimage = `data:image/jpeg;base64,${base64Image}`

        //cloudinary upload
        const uploadedfile = await cloudinary.uploader.upload(tobeuploadedimage, {
            upload_preset: 'SocialMediaApp',

        });

        return uploadedfile.url;

    } catch (error) {
        console.log({ success: false, msg: 'failed during processing or uploading image', err: error })
    }

}

module.exports = createBase64AndUpload;