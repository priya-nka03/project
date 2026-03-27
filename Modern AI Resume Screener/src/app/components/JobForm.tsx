import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, X, Sparkles, AlertCircle } from 'lucide-react';
import { BackButton } from './BackButton';

interface JobFormProps {
  onBack: () => void;
  onPublish: (jobData: any) => void;
}

export const JobForm: React.FC<JobFormProps> = ({ onBack, onPublish }) => {
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Tailwind CSS']);
  const [newSkill, setNewSkill] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('Entry Level (0-2 years)');
  const [workMode, setWorkMode] = useState('Remote');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handlePublish = () => {
    const jobData = {
      id: Date.now().toString(),
      title: jobTitle || 'Senior Frontend Engineer',
      company: 'Your Company',
      location: location || 'San Francisco, CA',
      type: workMode,
      salary: salary || '$120k - $180k',
      experience: experience,
      description: description || 'No description provided',
      skills: skills,
      posted: 'Just now',
      applicants: 0,
      status: 'Active'
    };
    onPublish(jobData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32">
      <div className="flex items-center gap-4">
        <BackButton onClick={onBack} />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Create New Job</h1>
      </div>

      <div className="glass rounded-3xl p-8 space-y-8">
        {/* Job Title */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Senior Frontend Engineer"
            className="w-full text-2xl font-bold rounded-xl border-none bg-slate-50 px-6 py-4 focus:ring-2 focus:ring-primary dark:bg-slate-800/50 dark:text-white placeholder:text-slate-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experience */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Years of Experience</label>
            <select 
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
            >
              <option>Entry Level (0-2 years)</option>
              <option>Mid Level (3-5 years)</option>
              <option>Senior Level (6-10 years)</option>
              <option>Director/VP (10+ years)</option>
            </select>
          </div>

          {/* Location/Type */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Work Mode</label>
            <div className="flex gap-2">
              {['Remote', 'Hybrid', 'On-site'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setWorkMode(mode)}
                  className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all ${
                    mode === workMode
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-slate-200 bg-transparent text-slate-500 hover:border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Salary and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Salary Range</label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. $120k - $180k"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. San Francisco, CA"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
            />
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Job Description</label>
            <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:opacity-80 transition-opacity">
              <Sparkles size={14} />
              AI Generate with ScreenAI
            </button>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the role, responsibilities, and requirements..."
            rows={8}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-900 focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
          />
        </div>

        {/* Skills Tag Input */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Required Skills</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill) => (
              <motion.span
                layout
                key={skill}
                className="flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {skill}
                <button onClick={() => removeSkill(skill)} className="hover:text-rose-500">
                  <X size={14} />
                </button>
              </motion.span>
            ))}
          </div>
          <form onSubmit={addSkill} className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
            />
            <button 
              type="submit"
              className="rounded-xl bg-slate-900 px-6 py-3 font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Add
            </button>
          </form>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-6 flex justify-center lg:left-64">
        <div className="glass flex w-full max-w-2xl items-center justify-between rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center gap-4 w-full justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePublish}
              className="flex-1 sm:flex-none rounded-xl gradient-primary px-8 py-3 font-bold text-white shadow-lg"
            >
              Publish Job
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};