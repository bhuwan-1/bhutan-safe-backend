const express = require("express");
const router = express.Router();
const {
  forgetPassword,
  profileUpdate,
} = require("../../controllers/user/userController");
const { verifyUser } = require("../../middlewares/verifyuser");
const { currentUser } = require("../../controllers/auth/authController");

router.get("/profile", verifyUser, currentUser);
router.post("/forget-password", forgetPassword);
router.put("/profile", verifyUser, profileUpdate);

module.exports = router;
