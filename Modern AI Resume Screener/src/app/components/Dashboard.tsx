import React from 'react';
import { Plus, Users, Briefcase, Clock, ChevronRight, MoreVertical, TrendingUp, Upload, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  persona: 'applicant' | 'recruiter';
  onCreateJob: () => void;
  onNavigate: (view: string) => void;
  createdJobs: any[];
  onJobClick?: (job: any) => void;
}

const recentJobs = [
  { id: 1, title: 'Senior Product Designer', applicants: 48, status: 'Active', posted: '2 days ago', company: 'TechFlow' },
  { id: 2, title: 'Fullstack Engineer (React)', applicants: 124, status: 'Active', posted: '5 days ago', company: 'DesignCo' },
  { id: 3, title: 'Growth Marketing Manager', applicants: 32, status: 'Active', posted: '1 week ago', company: 'SaaSify' },
  { id: 4, title: 'Customer Success Lead', applicants: 15, status: 'Closed', posted: '2 weeks ago', company: 'CloudBase' },
];

const recruiterStats = [
  { label: 'Active Jobs', value: '12', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Total Applicants', value: '1,429', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Pending Reviews', value: '84', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
];

const applicantStats = [
  { label: 'Applied Jobs', value: '24', icon: Briefcase, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Profile Views', value: '156', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Interviews', value: '3', icon: Clock, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
];

export const Dashboard: React.FC<DashboardProps> = ({ persona, onCreateJob, onNavigate, createdJobs, onJobClick }) => {
  const isRecruiter = persona === 'recruiter';
  const [uploadedFileName, setUploadedFileName] = React.useState<string>('');
  const [jobDescription, setJobDescription] = React.useState<string>('');
  
  // Combine created jobs with default jobs
  const allJobs = [...createdJobs, ...recentJobs];
  
  // Update stats with actual job count
  const recruiterStatsUpdated = [
    { label: 'Active Jobs', value: createdJobs.length.toString(), icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Total Applicants', value: createdJobs.reduce((sum, job) => sum + job.applicants, 0).toString(), icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Pending Reviews', value: '84', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];
  
  const stats = isRecruiter ? recruiterStatsUpdated : applicantStats;

  const handleFileUpload = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Uploaded file:', file.name);
        setUploadedFileName(file.name);
        // Don't navigate immediately - let user add job description
      }
    };
    input.click();
  };

  const handleAnalyzeResume = () => {
    // Navigate to user dashboard with resume and job description
    if (onNavigate && uploadedFileName) {
      // Store data in sessionStorage to pass to UserDashboard
      sessionStorage.setItem('resumeData', JSON.stringify({
        fileName: uploadedFileName,
        jobDescription: jobDescription
      }));
      onNavigate('user-dashboard');
    }
  };

  const handleStatClick = (statLabel: string) => {
    // Navigate to track-applications page when Applied Jobs or Interviews is clicked
    if (!isRecruiter && (statLabel === 'Applied Jobs' || statLabel === 'Interviews') && onNavigate) {
      onNavigate('track-applications');
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">
            Hello, {isRecruiter ? 'Sarah' : 'Alex'}
          </h1>
          <p className="font-medium text-slate-800 dark:text-slate-300">
            {isRecruiter 
              ? "Here's what's happening with your recruitment today." 
              : "Let's find your next dream job together."}
          </p>
        </div>
        {isRecruiter && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCreateJob}
            className="flex items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/20"
          >
            <Plus size={20} />
            Post New Job
          </motion.button>
        )}
      </header>

      {/* Automated Resume Screening System - Only for Applicants */}
      {!isRecruiter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-sm dark:border-primary/30"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3">
              Automated Resume Screening System
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Upload your resume and let our AI-powered screening system analyze your qualifications, 
              match you with the best opportunities, and provide personalized recommendations to boost your career.
            </p>
            
            <div className="flex flex-col gap-4 items-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFileUpload}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-bold text-white shadow-lg hover:bg-primary-dark transition-all w-full sm:w-auto"
              >
                <Upload size={20} />
                Upload Resume
              </motion.button>
              
              {/* Job Description Input */}
              <div className="w-full max-w-xl">
                <textarea
                  placeholder="Paste job description..."
                  rows={4}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-500 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder:text-slate-500 resize-none"
                />
              </div>
              
              {/* Analyze Resume Button */}
              {uploadedFileName && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAnalyzeResume}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-bold text-white shadow-lg hover:bg-primary-dark transition-all w-full sm:w-auto"
                >
                  <CheckCircle size={20} />
                  Analyze Resume
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => {
          const isClickable = !isRecruiter && (stat.label === 'Applied Jobs' || stat.label === 'Interviews');
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleStatClick(stat.label)}
              className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${
                isClickable ? 'cursor-pointer hover:border-primary hover:shadow-md dark:hover:border-primary transition-all' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-emerald-500">
                  <TrendingUp size={16} />
                  +12%
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</h3>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
              {isClickable && (
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
                  View Details
                  <ChevronRight size={14} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Recent Jobs - Only for Recruiters */}
      {isRecruiter && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Recent Job Postings
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {allJobs.filter(job => job.status === 'Active').slice(0, 5).length} most recent active {allJobs.filter(job => job.status === 'Active').slice(0, 5).length === 1 ? 'job' : 'jobs'}
              </p>
            </div>
            <button 
              onClick={() => onNavigate && onNavigate('jobs')}
              className="text-sm font-semibold text-primary hover:underline"
            >
              View All
            </button>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {allJobs.filter(job => job.status === 'Active').slice(0, 5).map((job) => (
              <div 
                key={job.id} 
                onClick={() => onJobClick && onJobClick(job)}
                className="flex items-center justify-between p-6 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`hidden h-10 w-10 items-center justify-center rounded-lg sm:flex ${
                    createdJobs.some(cJob => cJob.id === job.id)
                      ? 'bg-gradient-to-br from-primary/20 to-accent/20 text-primary dark:bg-primary/20'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                  }`}>
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{job.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-medium text-primary">{job.company}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{job.posted}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="font-medium text-emerald-500">
                        {job.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{job.applicants}</p>
                    <p className="text-xs text-slate-500">Applicants</p>
                  </div>
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