const cloudinary = require('cloudinary').v2;
const config = require('../config');

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API,
  api_secret: config.CLOUDINARY_SECRET
});

module.exports = cloudinary;