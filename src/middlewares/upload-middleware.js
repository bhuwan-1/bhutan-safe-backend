const multer = require('multer');
const path = require('path');

//set our multer storage
// DiskStorage:
    // Gives you full control on storing files to disk.
    //Defination In which folder you want to save your image and image name
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/") // path of the storage
        //Important: need uploads folder to exists.
    },
    filename: function(req, file, cb) {
        //unique file name
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

//file filter function to check if file should be uplodaed or not.
const checkFileFilter = (req, file, cb) => {
    //check if it should accept file of type image.
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error("not an image! please upload only images"))
    }
}

//multer middleware.
module.exports = multer({ storage: storage, fileFilter: checkFileFilter, limits: 5 * 1024 * 1024 }) //file size