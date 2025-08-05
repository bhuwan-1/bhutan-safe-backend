const express = require("express");
const router = express.Router();
const {register, login, currentUser, logout, passwordChange} = require("../../controllers/auth/authController");
const { verifyUser } = require("../../middlewares/verifyuser");

router.post('/register', register );
router.post('/login', login);
router.get('/currentUser', verifyUser, currentUser);
router.post('/logout', logout);
router.post('/change-password',verifyUser, passwordChange);

module.exports = router;