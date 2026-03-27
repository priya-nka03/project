// controllers/resumeController.js
const fs = require('fs-extra');
const path = require('path');
const pdf = require('pdf-parse');
const { v4: uuidv4 } = require('uuid');
const { readJSON, writeJSON } = require('../utils/dataStore');

const SKILLS = ['javascript','node','express','react','python','java','aws','docker','sql','nosql','typescript','c++','c#'];

// upload middleware handled in route; here we analyze
async function uploadResume(req, res) {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const filePath = req.file.path;
  const dataBuffer = await fs.readFile(filePath);
  let text = '';

  try {
    const data = await pdf(dataBuffer);
    text = (data.text || '').toLowerCase();
  } catch (err) {
    // if pdf-parse fails, fallback: empty text
    text = '';
  }

  // simple analysis: detect skills & experience
  const foundSkills = SKILLS.filter(skill => text.includes(skill));
  const yearsMatch = text.match(/([0-9]+)\s*\+?\s*(years|yrs)/i);
  const years = yearsMatch ? parseInt(yearsMatch[1], 10) : 0;

  // score: base 50 + 8 per skill + 2 per year experience, capped 100
  let score = 50 + foundSkills.length * 8 + years * 2;
  if (score > 100) score = 100;

  const resumeRecord = {
    id: uuidv4(),
    userId: req.user.id,
    originalName: req.file.originalname,
    path: filePath,
    uploadedAt: Date.now(),
    analysis: {
      score,
      skills: foundSkills,
      years,
      breakdown: {
        base: 50,
        skillsPoints: foundSkills.length * 8,
        experiencePoints: years * 2
      }
    }
  };

  const resumes = await readJSON('resumes.json');
  resumes.push(resumeRecord);
  await writeJSON('resumes.json', resumes);

  res.json({ message: 'Resume uploaded and analyzed', resume: resumeRecord });
}

async function getDashboard(req, res) {
  const resumes = await readJSON('resumes.json');
  const applications = await readJSON('applications.json');
  const userResumes = resumes.filter(r => r.userId === req.user.id).sort((a,b)=>b.uploadedAt-a.uploadedAt);
  const userApps = applications.filter(a => a.userId === req.user.id);

  const latest = userResumes[0] || null;
  const summary = {
    latestResume: latest ? {
      id: latest.id,
      uploadedAt: latest.uploadedAt,
      analysis: latest.analysis
    } : null,
    applicationsCount: userApps.length,
    applications: userApps // list
  };

  res.json(summary);
}

module.exports = { uploadResume, getDashboard };
