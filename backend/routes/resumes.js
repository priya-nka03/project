// routes/resumes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

const { protect } = require('../middleware/auth');
const { uploadResume, getDashboard } = require('../controllers/resumeController');

// ensure uploads dir
const uploadDir = path.join(__dirname, '..', 'uploads');
fs.ensureDirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, unique);
  }
});
const upload = multer({ storage, fileFilter: (req, file, cb) => {
  if (file.mimetype !== 'application/pdf') return cb(new Error('Only PDFs allowed'), false);
  cb(null, true);
}});

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/dashboard', protect, getDashboard);

module.exports = router;
