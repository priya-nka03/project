// middleware/auth.js
const jwt = require('jsonwebtoken');
const { readJSON } = require('../utils/dataStore');

const JWT_SECRET = process.env.JWT_SECRET || 'replace_with_a_real_secret';

// middleware to protect routes
async function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const users = await readJSON('users.json');
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = { id: user.id, name: user.name, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
}

module.exports = { protect, JWT_SECRET };
