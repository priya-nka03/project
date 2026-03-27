import React from 'react';
import { Plus, Users, Briefcase, Clock, ChevronRight, MoreVertical, TrendingUp, Upload, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  onGetStarted: () => void;
  isAuthenticated?: boolean;
  onLoginRequired?: () => void;
}

const recentJobs = [
  { id: 1, title: 'Senior Product Designer', applicants: 48, status: 'Active', posted: '2 days ago', company: 'TechFlow' },
  { id: 2, title: 'Fullstack Engineer (React)', applicants: 124, status: 'Active', posted: '5 days ago', company: 'DesignCo' },
  { id: 3, title: 'Growth Marketing Manager', applicants: 32, status: 'Active', posted: '1 week ago', company: 'SaaSify' },
  { id: 4, title: 'Customer Success Lead', applicants: 15, status: 'Closed', posted: '2 weeks ago', company: 'CloudBase' },
];

const publicStats = [
  { label: 'Active Jobs', value: '1,200+', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Companies Hiring', value: '350+', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Success Stories', value: '5,000+', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
];

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted, isAuthenticated, onLoginRequired }) => {
  const handleStatClick = (label: string) => {
    if (!isAuthenticated && onLoginRequired) {
      onLoginRequired();
    }
    // If authenticated, could navigate to specific pages later
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">
            Welcome to ScreenAI
          </h1>
          <p className="font-medium text-slate-800 dark:text-slate-300">
            Your intelligent recruitment and career platform
          </p>
        </div>
      </header>

      {/* Hero Section */}
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGetStarted}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-transparent px-8 py-3.5 font-bold text-primary hover:bg-primary hover:text-white transition-all w-full sm:w-auto"
            >
              <Upload size={20} />
              Upload Resume
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGetStarted}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-bold text-white shadow-lg hover:bg-primary-dark transition-all w-full sm:w-auto"
            >
              Get Started
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {publicStats.map((stat, i) => (
          <motion.button
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleStatClick(stat.label)}
            className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-left w-full ${
              (stat.label === 'Active Jobs' || stat.label === 'Companies Hiring') 
                ? 'cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all' 
                : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-emerald-500">
                <TrendingUp size={16} />
                Growing
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              {(stat.label === 'Active Jobs' || stat.label === 'Companies Hiring') && !isAuthenticated && (
                <p className="mt-2 text-xs font-semibold text-primary">Click to view details →</p>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Recent Jobs */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Featured Job Postings
          </h2>
          <button 
            onClick={onGetStarted}
            className="text-sm font-semibold text-primary hover:underline"
          >
            View All
          </button>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {recentJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-6 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <div className="flex items-center gap-4">
                <div className="hidden h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 sm:flex">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{job.title}</h4>
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-medium text-primary">{job.company}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{job.posted}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className={`font-medium ${job.status === 'Active' ? 'text-emerald-500' : 'text-slate-400'}`}>
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
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};