const express = require("express");
const router = express.Router();
const {register, login, currentUser, logout} = require("../../controllers/auth/authController");
const { verifyUser } = require("../../middlewares/verifyuser");

router.post('/register', register );
router.post('/login', login);
router.get('/', verifyUser, currentUser);
router.post('/logout', logout);

module.exports = router;