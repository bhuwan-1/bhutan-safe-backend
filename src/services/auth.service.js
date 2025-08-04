const bcrypt = require("bcrypt");
const User = require("../models/users/User");
const { generateToken } = require('../helpers/generateToken');

const registerService = async (requestBody) => {
    const { name, email, password, phone } = requestBody;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword, phone });
    await newUser.save();
    const token = await generateToken(newUser);
    return token;
};

module.exports = { registerService };