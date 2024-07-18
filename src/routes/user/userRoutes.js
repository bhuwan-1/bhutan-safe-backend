const express = require("express");
const router = express.Router();
const {
  profile,
  forgetPassword,
} = require("../../controllers/user/userController");
const { authenticate } = require("../../middlewares/auth");

router.get("/profile", authenticate, profile);
router.post("/forget-password", forgetPassword);

module.exports = router;
