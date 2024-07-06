const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    photoUrl : {
        type: String,
        required: false
    },
    });

module.exports = mongoose.model("User", UserSchema);