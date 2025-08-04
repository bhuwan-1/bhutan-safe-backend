const mongoose = require('mongoose');
const { blue } = require("colorette");

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URI || '').then(() => {
        console.log(`${blue('Connected to the database')}`);
    })
};

module.exports = connectDB;
