const mongoose = require('mongoose');
const { blue } = require("colorette");
require('dotenv').config();

const connectDB = () => {
    return mongoose.connect(process.env.DATABASE_URL).then(() => {
        console.log(`${blue('Connected to the database')}`);
    })
};

module.exports = connectDB;
