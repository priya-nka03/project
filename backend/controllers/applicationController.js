// controllers/applicationController.js
const { v4: uuidv4 } = require('uuid');
const { readJSON, writeJSON } = require('../utils/dataStore');

async function applyToJob(req, res) {
  const { jobId, resumeId } = req.body;
  if (!jobId) return res.status(400).json({ message: 'jobId required' });

  const jobs = await readJSON('jobs.json');
  const job = jobs.find(j => j.id === jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });

  // optional: check resume belongs to user
  const resumes = await readJSON('resumes.json');
  const resume = resumeId ? resumes.find(r => r.id === resumeId && r.userId === req.user.id) : resumes.find(r => r.userId === req.user.id);
  if (!resume) return res.status(400).json({ message: 'Resume not found for user' });

  const applications = await readJSON('applications.json');
  const app = {
    id: uuidv4(),
    userId: req.user.id,
    jobId,
    resumeId: resume.id,
    status: 'applied',
    appliedAt: Date.now()
  };
  applications.push(app);
  await writeJSON('applications.json', applications);
  res.status(201).json({ message: 'Applied', application: app });
}

async function getUserApplications(req, res) {
  const applications = await readJSON('applications.json');
  const jobs = await readJSON('jobs.json');
  const userApps = applications.filter(a => a.userId === req.user.id).map(a => {
    const job = jobs.find(j => j.id === a.jobId) || {};
    return { ...a, jobTitle: job.title, company: job.company };
  });
  res.json(userApps);
}

module.exports = { applyToJob, getUserApplications };
