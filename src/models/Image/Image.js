const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId, //Referrring the Current Logged in User
        ref: 'User', //
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Image', ImageSchema);