const User = require("../../models/users/User");
const Contact = require("../../models/contact/Contact");
const mongoose = require("mongoose");

const addContactToUser = async (req, res) => {
  try {
    const { name, email, phone, photoUrl } = req.body;
    const userId = req.currentUser.id;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If email is provided, check for existing contact with that email
    let contact = null;
    if (email) {
      contact = await Contact.findOne({ email });
    }

    if (contact) {
      if (user.contacts.includes(contact._id)) {
        return res.status(400).json({
          success: false,
          message: "Contact is already added to this user",
        });
      }
    } else {
      contact = new Contact({
        name,
        email: email || "",
        phone,
        photoUrl: photoUrl || "",
        users: [userId],
      });
      await contact.save();
    }

    user.contacts.push(contact._id);
    await user.save();

    if (!contact.users.includes(userId)) {
      contact.users.push(userId);
      await contact.save();
    }

    return res.status(200).json({
      success: true,
      message: "Contact added to user successfully",
      data: {
        userId,
        contact: {
          _id: contact._id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          photoUrl: contact.photoUrl,
        },
      },
    });
  } catch (error) {
    console.error("Error adding contact to user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getUserContacts = async (req, res) => {
  try {
    const userId = req.currentUser.id;

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format",
      });
    }

    const user = await User.findById(userId).populate("contacts");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User contacts retrieved successfully",
      data: {
        userId: user._id,
        contacts: user.contacts,
      },
    });
  } catch (error) {
    console.error("Error getting user contacts:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const removeUserContact = async (req, res) => {
  try {
    const { contactId } = req.body;
    const userId = req.currentUser.id;

    if (!contactId) {
      return res.status(400).json({
        success: false,
        message: "Contact ID is required",
      });
    }

    // Validate if userId and contactId are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Contact ID format",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    if (!user.contacts.includes(contactId)) {
      return res.status(400).json({
        success: false,
        message: "Contact is not in user's contact list",
      });
    }

    user.contacts = user.contacts.filter((id) => id.toString() !== contactId);
    await user.save();

    contact.users = contact.users.filter((id) => id.toString() !== userId);
    await contact.save();

    return res.status(200).json({
      success: true,
      message: "Contact removed from user successfully",
      data: {
        userId,
        contactId,
      },
    });
  } catch (error) {
    console.error("Error removing contact from user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addContactToUser,
  getUserContacts,
  removeUserContact,
};
