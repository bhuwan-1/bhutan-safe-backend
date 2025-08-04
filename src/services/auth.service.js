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

const loginService = async (requestBody) => {
    const {nameOrPassword, password} = requestBody;
    let user = await User.findOne({email: nameOrPassword});
    if (!user) user = await User.findOne({phone: nameOrPassword});
    if (!user) throw new Error("Invalid Credentails");
    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch) throw new Error("Invalid Credentails");
    return await generateToken(user);
}

module.exports = { registerService, loginService };