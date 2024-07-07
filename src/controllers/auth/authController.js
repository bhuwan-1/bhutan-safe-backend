const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/users/User");

const register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.log("Error registering user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register };
