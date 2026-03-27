// controllers/jobController.js
const { v4: uuidv4 } = require('uuid');
const { readJSON, writeJSON } = require('../utils/dataStore');

async function listJobs(req, res) {
  const { title, location, skill } = req.query;
  let jobs = await readJSON('jobs.json');

  if (title) jobs = jobs.filter(j => j.title.toLowerCase().includes(title.toLowerCase()));
  if (location) jobs = jobs.filter(j => (j.location || '').toLowerCase().includes(location.toLowerCase()));
  if (skill) jobs = jobs.filter(j => (j.skills || []).map(s=>s.toLowerCase()).includes(skill.toLowerCase()));

  res.json(jobs);
}

async function createJob(req, res) {
  const { title, company, location, skills = [], salary = null, description = '' } = req.body;
  if (!title || !company) return res.status(400).json({ message: 'Missing title or company' });

  const jobs = await readJSON('jobs.json');
  const job = { id: uuidv4(), title, company, location, skills, salary, description, postedAt: Date.now() };
  jobs.push(job);
  await writeJSON('jobs.json', jobs);
  res.status(201).json(job);
}

async function getJob(req, res) {
  const jobs = await readJSON('jobs.json');
  const job = jobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
}

module.exports = { listJobs, createJob, getJob };
