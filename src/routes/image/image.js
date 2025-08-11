const express = require('express');
const uploadMiddleware = require('./../../middlewares/upload-middleware');
const { uploadImage: uploadImageController } = require('../../controllers/image/imageController');
const router = express.Router();
const { verifyUser } = require("../../middlewares/verifyuser");


//upload the image
//use multer middleware:
router.post('/upload', uploadMiddleware.single('image'), uploadImageController);

//to get all the images
module.exports = router;