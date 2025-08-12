const Image = require("../../models/Image/Image");
const uploadToCloudinary = require("../../helpers/cloudinary.helper");
const fs = require("fs");

const uploadImage = async (req, res) => {
  try {
    //Check if file is missing in req object
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image",
      });
    }

    //upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req?.file?.path);

    //Store the image url and public id along with uploaded userID to database.
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.currentUser.id,
    });
    await newlyUploadedImage.save();

    //delete file from local storage once the image is saved to cloudinary
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Image Uploaded successfully",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const fetchALlImagesController = async (req, res) => {
  try {
    const images = await Image.find({ uploadedBy: req.currentUser.id });
    if (images) {
      res.status(200).json({
        success: true,
        data: images,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

module.exports = {
  uploadImage,
  fetchALlImagesController,
};
