import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Calendar, ChevronRight, AlertCircle, Circle } from 'lucide-react';

interface ApplicationTrackerProps {
  onNavigate?: (view: string, data?: any) => void;
}

const applications = [
  { 
    id: 1, 
    title: 'Senior Product Designer', 
    company: 'TechFlow', 
    status: 'Interview Scheduled', 
    date: 'Applied Jan 24, 2026', 
    color: 'text-indigo-500', 
    bg: 'bg-indigo-500/10',
    location: 'San Francisco, CA (Remote)',
    salary: '$140k - $180k',
    type: 'Full-time',
    experience: '5-7 years',
  },
  { 
    id: 2, 
    title: 'UX Engineer', 
    company: 'DesignCo', 
    status: 'Shortlisted', 
    date: 'Applied Feb 1, 2026', 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-500/10',
    location: 'New York, NY (Hybrid)',
    salary: '$130k - $170k',
    type: 'Full-time',
    experience: '3-5 years',
  },
  { 
    id: 3, 
    title: 'Lead Developer', 
    company: 'InnovateX', 
    status: 'Pending', 
    date: 'Applied Feb 8, 2026', 
    color: 'text-amber-500', 
    bg: 'bg-amber-500/10',
    location: 'Austin, TX (Remote)',
    salary: '$160k - $200k',
    type: 'Full-time',
    experience: '7-10 years',
  },
  { 
    id: 4, 
    title: 'Mobile Developer', 
    company: 'AppWorks', 
    status: 'Accepted', 
    date: 'Applied Jan 15, 2026', 
    color: 'text-primary', 
    bg: 'bg-primary/10',
    location: 'Seattle, WA (Remote)',
    salary: '$145k - $185k',
    type: 'Full-time',
    experience: '5-7 years',
  },
];

// Function to get progress steps based on status
const getProgressSteps = (status: string) => {
  const allSteps = [
    { label: 'Applied', key: 'applied' },
    { label: 'Screening', key: 'screening' },
    { label: 'Interview', key: 'interview' },
    { label: 'Offer', key: 'offer' },
  ];

  let completedUntil = 0;

  switch (status) {
    case 'Pending':
      completedUntil = 1; // Applied only
      break;
    case 'Shortlisted':
      completedUntil = 2; // Applied + Screening
      break;
    case 'Interview Scheduled':
      completedUntil = 3; // Applied + Screening + Interview
      break;
    case 'Accepted':
      completedUntil = 4; // All steps
      break;
    default:
      completedUntil = 1;
  }

  return allSteps.map((step, index) => ({
    ...step,
    completed: index < completedUntil,
    current: index === completedUntil - 1,
  }));
};

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({ onNavigate }) => {
  const handleViewDetails = (app: any) => {
    if (onNavigate) {
      onNavigate('job-profile', {
        jobData: {
          id: app.id,
          title: app.title,
          company: app.company,
          location: app.location,
          salary: app.salary,
          type: app.type,
          experience: app.experience,
          applicationStatus: app.status,
        },
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Track Applications</h1>
        <p className="font-medium text-slate-600 dark:text-slate-400">Keep an eye on your progress with current opportunities.</p>
      </div>

      <div className="grid gap-6">
        {applications.map((app, i) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-col p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${app.bg} ${app.color}`}>
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{app.title}</h3>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-400">{app.company}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Calendar size={12} />
                    {app.date}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col items-start gap-4 sm:mt-0 sm:items-end">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${app.bg} ${app.color}`}>
                  <Clock size={12} />
                  {app.status}
                </span>
                <button className="flex items-center gap-1 text-sm font-bold text-primary hover:underline" onClick={() => handleViewDetails(app)}>
                  View Details
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Tracker Bar */}
            <div className="border-t border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-800/20">
              <div className="relative flex justify-between">
                <div className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-slate-200 dark:bg-slate-800" />
                {getProgressSteps(app.status).map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full border-4 border-white dark:border-slate-900 ${
                      step.completed ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-800'
                    }`}>
                      {step.completed ? <CheckCircle2 size={16} /> : <div className="h-2 w-2 rounded-full bg-current" />}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-tight ${
                      step.completed ? 'text-primary' : 'text-slate-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};