const express = require("express");
const router = express.Router();
const {
  addContactToUser,
  getUserContacts,
  removeUserContact,
} = require("../../controllers/contact/contactController");
const { verifyUser } = require("../../middlewares/verifyuser");

router.post("/add-contact", verifyUser, addContactToUser);
router.get("/user-contacts", verifyUser, getUserContacts);
router.delete("/remove-contact", verifyUser, removeUserContact);

module.exports = router;
