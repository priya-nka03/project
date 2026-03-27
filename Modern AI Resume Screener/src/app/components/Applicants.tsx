import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, MapPin, DollarSign, Clock, Users, MoreVertical, Eye, XCircle, ArrowLeft, TrendingUp, CheckCircle2, Mail, Phone, FileText, Filter, ChevronDown } from 'lucide-react';

interface ApplicantsProps {
  createdJobs: any[];
  onCloseJob: (jobId: string) => void;
}

// Mock applicant data
const mockApplicants = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 234-5678',
    appliedDate: 'Mar 5, 2026',
    status: 'Under Review',
    experience: '5 years',
    matchScore: 92,
    resume: 'sarah_resume.pdf'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 876-5432',
    appliedDate: 'Mar 7, 2026',
    status: 'Interview Scheduled',
    experience: '7 years',
    matchScore: 88,
    resume: 'michael_resume.pdf'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 345-6789',
    appliedDate: 'Mar 8, 2026',
    status: 'Shortlisted',
    experience: '4 years',
    matchScore: 85,
    resume: 'emily_resume.pdf'
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 987-6543',
    appliedDate: 'Mar 9, 2026',
    status: 'Under Review',
    experience: '6 years',
    matchScore: 90,
    resume: 'david_resume.pdf'
  },
  {
    id: 5,
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@email.com',
    phone: '+1 (555) 456-7890',
    appliedDate: 'Mar 10, 2026',
    status: 'New',
    experience: '3 years',
    matchScore: 78,
    resume: 'jennifer_resume.pdf'
  }
];

export const Applicants: React.FC<ApplicantsProps> = ({ createdJobs, onCloseJob }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const handleMenuToggle = (jobId: string) => {
    setOpenMenuId(openMenuId === jobId ? null : jobId);
  };

  const handleViewDetails = (job: any) => {
    setSelectedJob(job);
    setOpenMenuId(null);
  };

  const handleCloseApplication = (jobId: string) => {
    if (window.confirm('Are you sure you want to close this job posting? No further applications will be accepted.')) {
      onCloseJob(jobId);
      setOpenMenuId(null);
    }
  };

  const handleBackToList = () => {
    setSelectedJob(null);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  const filterApplicants = (applicants: any[]) => {
    if (selectedFilter === 'All') return applicants;
    
    return applicants.filter((applicant) => {
      const score = applicant.matchScore;
      switch (selectedFilter) {
        case '80-100':
          return score >= 80 && score <= 100;
        case '60-80':
          return score >= 60 && score < 80;
        case '50-60':
          return score >= 50 && score < 60;
        default:
          return true;
      }
    });
  };

  const filteredApplicants = filterApplicants(mockApplicants);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/10 text-blue-500';
      case 'Under Review':
        return 'bg-amber-500/10 text-amber-500';
      case 'Interview Scheduled':
        return 'bg-indigo-500/10 text-indigo-500';
      case 'Shortlisted':
        return 'bg-emerald-500/10 text-emerald-500';
      case 'Rejected':
        return 'bg-rose-500/10 text-rose-500';
      default:
        return 'bg-slate-500/10 text-slate-500';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-slate-500';
  };

  if (selectedJob) {
    return (
      <div className="space-y-8">
        {/* Back Button */}
        <button
          onClick={handleBackToList}
          className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <ArrowLeft size={18} />
          Back to Job Postings
        </button>

        {/* Job Details Header */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedJob.title}</h1>
              <p className="mt-2 text-lg font-semibold text-primary">{selectedJob.company}</p>
            </div>
            <span className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${
              selectedJob.status === 'Active' 
                ? 'bg-emerald-500/10 text-emerald-500' 
                : 'bg-rose-500/10 text-rose-500'
            }`}>
              {selectedJob.status}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Location</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedJob.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                <DollarSign size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Salary</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedJob.salary}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Experience</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedJob.experience}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Users size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Applicants</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedJob.applicants}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">Job Description</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {selectedJob.description}
            </p>
          </div>

          {selectedJob.skills && selectedJob.skills.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Applicants Table */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Applicants ({filteredApplicants.length})
            </h2>
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <Filter size={16} />
                {selectedFilter === 'All' ? 'Filter' : selectedFilter + '%'}
                <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full z-10 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="p-1">
                      <button
                        onClick={() => handleFilterSelect('All')}
                        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                          selectedFilter === 'All'
                            ? 'bg-primary/10 text-primary'
                            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                        }`}
                      >
                        All Scores
                        {selectedFilter === 'All' && <CheckCircle2 size={16} />}
                      </button>
                      <button
                        onClick={() => handleFilterSelect('80-100')}
                        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                          selectedFilter === '80-100'
                            ? 'bg-primary/10 text-primary'
                            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                        }`}
                      >
                        80-100%
                        {selectedFilter === '80-100' && <CheckCircle2 size={16} />}
                      </button>
                      <button
                        onClick={() => handleFilterSelect('60-80')}
                        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                          selectedFilter === '60-80'
                            ? 'bg-primary/10 text-primary'
                            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                        }`}
                      >
                        60-80%
                        {selectedFilter === '60-80' && <CheckCircle2 size={16} />}
                      </button>
                      <button
                        onClick={() => handleFilterSelect('50-60')}
                        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                          selectedFilter === '50-60'
                            ? 'bg-primary/10 text-primary'
                            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                        }`}
                      >
                        50-60%
                        {selectedFilter === '50-60' && <CheckCircle2 size={16} />}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="pb-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Name</th>
                  <th className="pb-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Contact</th>
                  <th className="pb-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Applied Date</th>
                  <th className="pb-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Match Score</th>
                  <th className="pb-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="pb-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Resume</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map((applicant) => (
                  <tr 
                    key={applicant.id}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800/50 dark:hover:bg-slate-800/30"
                  >
                    <td className="py-4">
                      <p className="font-semibold text-slate-900 dark:text-white">{applicant.name}</p>
                    </td>
                    <td className="py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Mail size={14} />
                          {applicant.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Phone size={14} />
                          {applicant.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{applicant.appliedDate}</p>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-emerald-500"
                            style={{ width: `${applicant.matchScore}%` }}
                          />
                        </div>
                        <span className={`text-sm font-bold ${getMatchScoreColor(applicant.matchScore)}`}>
                          {applicant.matchScore}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusColor(applicant.status)}`}>
                        {applicant.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                        <FileText size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Applicants</h1>
          <p className="mt-2 font-medium text-slate-600 dark:text-slate-400">
            Manage your job postings and review applicants
          </p>
        </div>
      </header>

      {/* Recent Job Postings */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Job Postings</h2>
        
        {createdJobs.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Briefcase className="mx-auto mb-4 text-slate-400" size={48} />
            <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">No Job Postings Yet</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Create your first job posting to start receiving applications
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {createdJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                        <Briefcase size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{job.title}</h3>
                        <p className="mt-1 font-semibold text-primary">{job.company}</p>
                        
                        <div className="mt-4 flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <MapPin size={16} />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <DollarSign size={16} />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Clock size={16} />
                            {job.posted}
                          </div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                            <Users size={16} />
                            {job.applicants} Applicants
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Three Dots Menu */}
                  <div className="relative">
                    <button
                      onClick={() => handleMenuToggle(job.id)}
                      className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    >
                      <MoreVertical size={20} />
                    </button>

                    <AnimatePresence>
                      {openMenuId === job.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full z-10 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"
                        >
                          <div className="p-1">
                            <button
                              onClick={() => handleViewDetails(job)}
                              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                              <Eye size={18} className="text-primary" />
                              View Details
                            </button>
                            <button
                              onClick={() => handleCloseApplication(job.id)}
                              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                            >
                              <XCircle size={18} />
                              Close Application
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    job.status === 'Active' 
                      ? 'bg-emerald-500/10 text-emerald-500' 
                      : 'bg-rose-500/10 text-rose-500'
                  }`}>
                    {job.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};