// controllers/userController.js
const { readJSON, writeJSON } = require('../utils/dataStore');

async function getProfile(req, res) {
  const users = await readJSON('users.json');
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { password, ...rest } = user;
  res.json(rest);
}

async function updateProfile(req, res) {
  const { name } = req.body;
  const users = await readJSON('users.json');
  const idx = users.findIndex(u => u.id === req.user.id);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  if (name) users[idx].name = name;
  await writeJSON('users.json', users);
  const { password, ...rest } = users[idx];
  res.json(rest);
}

module.exports = { getProfile, updateProfile };
