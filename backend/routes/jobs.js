// routes/jobs.js
const express = require('express');
const router = express.Router();
const { listJobs, createJob, getJob } = require('../controllers/jobController');
const { protect } = require('../middleware/auth');

router.get('/', listJobs);
router.post('/', protect, createJob); // simple: only authenticated users can post jobs
router.get('/:id', getJob);

module.exports = router;
