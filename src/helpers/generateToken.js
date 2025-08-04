const jwt = require('jsonwebtoken');

async function generateToken(user) {
  return jwt.sign({ name: user?.name, email: user?.email, phone: user?.phone, id: user?._id }, process.env.JWT_SECRET, {
    expiresIn: '1y',
  });
}

module.exports = { generateToken };
