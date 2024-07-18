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
  return res.json({ message: "Password reset." });
};

module.exports = { profile, resetPassword, forgetPassword };
