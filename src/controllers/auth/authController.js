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


const login = async (req, res ) => {
  const {email, password} = req.body;
  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({message: "User not found"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({message: "Invalid credentials"})
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    res.status(200).json({message: "Login successful", token});

  } catch(err){
    console.error(err)
    return res.status(201).json({message: "Internal Server Error"})
  }
}

module.exports = { register, login };
