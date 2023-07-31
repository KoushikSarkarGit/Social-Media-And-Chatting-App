require('dotenv').config();

const cloudinaryModule = require('cloudinary');

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloudinary_API_key,
    api_secret: process.env.cloudinary_API_Secret
});


module.exports = cloudinary