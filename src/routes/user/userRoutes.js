const express = require("express");
const router = express.Router();
const {profile} = require("../../controllers/user/userController");
const {authenticate} = require("../../middlewares/auth");

router.get("/profile", authenticate, profile);

module.exports = router;
