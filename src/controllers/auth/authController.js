const User = require("../../models/users/User");
const {
  registerService,
  loginService,
  changePassword,
} = require("./../../services/auth.service");

const register = async (req, res) => {
  try {
    const exisitingUser = await User.findOne({ email: req?.body?.email });
    if (exisitingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please try with different email",
      });
    }
    await registerService(req?.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log("Error registering user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const currentUser = async (req, res) => {
  res.status(200).json({
    user: req.currentUser,
  });
};

const login = async (req, res) => {
  try {
    const accessToken = await loginService(req?.body);
    res.status(200).json({
      message: "signed in",
      token: accessToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(401).json({
      success: false,
      message: err.message || "Invalid credentials",
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({
    message: "User logged out successfully",
  });
};

const passwordChange = async (req, res) => {
  try {
    await changePassword(req);
    res.status(200).json({
      message: "Password Changed Successfully!",
    });
  } catch (err) {
    console.error("Password change error:", err);
    res.status(400).json({
      success: false,
      message: err.message || "Failed to change password",
    });
  }
};

module.exports = { register, login, currentUser, logout, passwordChange };
