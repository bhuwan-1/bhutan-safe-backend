const User = require("../../models/users/User");
const jwt = require("jsonwebtoken");
const EmailService = require("../../helpers/mailer");

const profile = async (req, res) => {
  return res.json({ message: "User profile after auth middleware." });
};

const forgetPassword = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    //send email
    const subject = "Password Reset";
    const text = `Hi,\n\nClick on the following link to reset your password:${process.env.LOCAL_APP_URL}${token}`;
    const recipients = { to: [req.body.email] };

    try {
      EmailService.sendSimpleEmail(subject, text, recipients);
    } catch (err) {
      throw new Error(`Failed to send reset email: ${err.message}`);
    }
  } catch (err) {
    return res.status(201).send({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    // Verify the token sent by the user
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET_KEY
    );

    // If the token is invalid, return an error
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // find the user with the id from the token
    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      return res.status(401).send({ message: "no user found" });
    }

    // Hash the new password
    const salt = await bycrypt.genSalt(10);
    req.body.newPassword = await bycrypt.hash(req.body.newPassword, salt);

    // Update user's password, clear reset token and expiration time
    user.password = req.body.newPassword;
    await user.save();

    // Send success response
    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    // Send error response if any error occurs
    res.status(500).send({ message: err.message });
  }
};

module.exports = { profile, resetPassword, forgetPassword };
