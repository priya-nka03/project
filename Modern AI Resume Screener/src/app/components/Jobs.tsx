import React from 'react';
import { Briefcase, MoreVertical, TrendingUp, Filter, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface JobsProps {
  createdJobs: any[];
  onJobClick?: (job: any) => void;
}

const defaultJobs = [
  { id: 1, title: 'Senior Product Designer', applicants: 48, status: 'Active', posted: '2 days ago', company: 'TechFlow', location: 'San Francisco, CA', type: 'Remote' },
  { id: 2, title: 'Fullstack Engineer (React)', applicants: 124, status: 'Active', posted: '5 days ago', company: 'DesignCo', location: 'New York, NY', type: 'Hybrid' },
  { id: 3, title: 'Growth Marketing Manager', applicants: 32, status: 'Active', posted: '1 week ago', company: 'SaaSify', location: 'Austin, TX', type: 'Remote' },
  { id: 4, title: 'Customer Success Lead', applicants: 15, status: 'Closed', posted: '2 weeks ago', company: 'CloudBase', location: 'Boston, MA', type: 'On-site' },
  { id: 5, title: 'Senior Backend Engineer', applicants: 67, status: 'Active', posted: '3 weeks ago', company: 'DataFlow', location: 'Seattle, WA', type: 'Remote' },
  { id: 6, title: 'UI/UX Designer', applicants: 89, status: 'Closed', posted: '1 month ago', company: 'CreativeHub', location: 'Los Angeles, CA', type: 'Hybrid' },
];

export const Jobs: React.FC<JobsProps> = ({ createdJobs, onJobClick }) => {
  // Combine all jobs (created jobs first, then default jobs)
  const allJobs = [...createdJobs, ...defaultJobs];
  
  const activeJobs = allJobs.filter(job => job.status === 'Active');
  const closedJobs = allJobs.filter(job => job.status === 'Closed');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">
            Job Postings
          </h1>
          <p className="font-medium text-slate-800 dark:text-slate-300 mt-1">
            Manage all your job postings in one place
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <Briefcase size={24} />
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-emerald-500">
              <TrendingUp size={16} />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Jobs</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{allJobs.length}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <Briefcase size={24} />
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-emerald-500">
              <TrendingUp size={16} />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Jobs</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{activeJobs.length}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-500/10 text-slate-500">
              <Briefcase size={24} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Closed Jobs</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{closedJobs.length}</p>
          </div>
        </motion.div>
      </div>

      {/* Active Jobs */}
      {activeJobs.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Active Jobs
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {activeJobs.length} {activeJobs.length === 1 ? 'job' : 'jobs'} currently active
              </p>
            </div>
            <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <Filter size={16} />
              Filter
            </button>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {activeJobs.map((job) => (
              <div 
                key={job.id} 
                onClick={() => onJobClick && onJobClick(job)}
                className="flex items-center justify-between p-6 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`hidden h-10 w-10 items-center justify-center rounded-lg sm:flex ${
                    createdJobs.some(cJob => cJob.id === job.id)
                      ? 'bg-gradient-to-br from-primary/20 to-accent/20 text-primary dark:bg-primary/20'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                  }`}>
                    <Briefcase size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{job.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 flex-wrap">
                      <span className="font-medium text-primary">{job.company}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{job.location}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{job.type}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{job.applicants}</p>
                    <p className="text-xs text-slate-500">Applicants</p>
                  </div>
                  <span className="hidden sm:inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
                    Active
                  </span>
                  <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Closed Jobs */}
      {closedJobs.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Closed Jobs
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {closedJobs.length} {closedJobs.length === 1 ? 'job' : 'jobs'} no longer accepting applications
              </p>
            </div>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {closedJobs.map((job) => (
              <div 
                key={job.id}
                onClick={() => onJobClick && onJobClick(job)}
                className="flex items-center justify-between p-6 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 opacity-75 cursor-pointer"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="hidden h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-400 dark:bg-slate-800 sm:flex">
                    <Briefcase size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{job.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 flex-wrap">
                      <span className="font-medium text-slate-400">{job.company}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{job.location}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{job.type}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-lg font-bold text-slate-500 dark:text-slate-400">{job.applicants}</p>
                    <p className="text-xs text-slate-500">Applicants</p>
                  </div>
                  <span className="hidden sm:inline-flex items-center rounded-full bg-slate-500/10 px-3 py-1 text-xs font-semibold text-slate-500">
                    Closed
                  </span>
                  <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};