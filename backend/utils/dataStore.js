// utils/dataStore.js
const fs = require('fs-extra');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
fs.ensureDirSync(dataDir);

async function readJSON(filename) {
  const p = path.join(dataDir, filename);
  try {
    const exists = await fs.pathExists(p);
    if (!exists) {
      await fs.writeJson(p, []);
      return [];
    }
    return await fs.readJson(p);
  } catch (err) {
    return [];
  }
}

async function writeJSON(filename, data) {
  const p = path.join(dataDir, filename);
  await fs.writeJson(p, data, { spaces: 2 });
}

module.exports = { readJSON, writeJSON };
