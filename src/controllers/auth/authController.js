const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/users/User");
const { registerService, loginService } = require('./../../services/auth.service');
const { sendTokenToCookie } = require("../../helpers/cookier.helper");

const register = async (req, res) => {
  try {
    const exisitingUser = await User.findOne({email: req?.body?.email });
    if (exisitingUser) {
      return res.status(400).json({
        success: false,
        message: 'User is already exists. Please try with different email'
      });
    };
    const token = await registerService(req?.body);
    sendTokenToCookie(res, token);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log("Error registering user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const currentUser = async (req, res) => {
  res.status(200).json({
    user: req.currentUser
  });
};

const login = async (req, res ) => {
  try{
    const accessToken = await loginService(req?.body)
    sendTokenToCookie(res, accessToken);
    res.status(200).json({
      message: 'signed in'
    });
  } catch(err){
    console.error(err)
    return res.status(201).json({message: "Internal Server Error"})
  }
}

module.exports = { register, login, currentUser };
