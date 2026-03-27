// routes/applications.js
const express = require('express');
const router = express.Router();
const { applyToJob, getUserApplications } = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');

router.post('/apply', protect, applyToJob);
router.get('/', protect, getUserApplications);

module.exports = router;
