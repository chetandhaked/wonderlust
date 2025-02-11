const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// config mean jodna ... backend ko cloud ke sath jodna 
cloudinary.config({
    cloud_name: process.env.COLUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

//cloud per store kerne ke lie folder banana...
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Wanderlust_DEV',
      allowerdFormats: ["png","jpg","jpeg"]
    },
  });

  module.exports={
    cloudinary,
    storage

  }