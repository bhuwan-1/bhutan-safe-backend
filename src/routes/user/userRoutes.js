const express = require("express");
const router = express.Router();
const {
  profile,
  forgetPassword,
} = require("../../controllers/user/userController");
const { verifyUser } = require("../../middlewares/verifyuser");
const { currentUser } = require("../../controllers/auth/authController");

router.get("/profile", verifyUser, currentUser);
router.post("/forget-password", forgetPassword);

module.exports = router;
