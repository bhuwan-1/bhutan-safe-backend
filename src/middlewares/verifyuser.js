const jwt = require('jsonwebtoken');

async function verifyUser(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        next(new Error('Please login again'));
        return;
    };
    const user = (jwt.verify(token, process.env.JWT_SECRET));
    req.currentUser = user;
    next();
}

module.exports = { verifyUser };

