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

const changePassword = async (req) => {
  if (!req?.currentUser?.id) throw new Error("Not authenticated");

  const user = await User.findById(req.currentUser.id);
  if (!user) throw new Error("User not found");

  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new Error("Old and new passwords are required");
  }

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    throw new Error("Old password is incorrect! Please try again");
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  return { message: "Password changed successfully" };
};


module.exports = { registerService, loginService, changePassword };