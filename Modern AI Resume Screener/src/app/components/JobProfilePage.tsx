import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, DollarSign, Briefcase, Clock, Users, Building2, Globe, Upload, FileText, X, CheckCircle2, TrendingUp } from 'lucide-react';
import { BackButton } from './BackButton';

interface JobProfilePageProps {
  data?: {
    jobData?: {
      id: number;
      title: string;
      company: string;
      location?: string;
      salary?: string;
      type?: string;
      experience?: string;
      description?: string;
      requirements?: string[];
      benefits?: string[];
      companyDescription?: string;
      companySize?: string;
      companyWebsite?: string;
      applicationStatus?: string;
    };
  };
  onBack?: () => void;
  persona?: 'applicant' | 'recruiter';
}

export const JobProfilePage: React.FC<JobProfilePageProps> = ({ data, onBack, persona }) => {
  const [uploadedResume, setUploadedResume] = useState<{ name: string; size: string } | null>(null);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default job data for demo - merge with passed data
  const defaultJobData = {
    id: 1,
    title: 'Senior Product Designer',
    company: 'TechFlow',
    location: 'San Francisco, CA (Remote)',
    salary: '$140k - $180k',
    type: 'Full-time',
    experience: '5-7 years',
    description: 'We are looking for a talented Senior Product Designer to join our growing team. You will be responsible for designing intuitive and beautiful user experiences for our flagship products used by millions of users worldwide.',
    requirements: [
      '5+ years of experience in product design',
      'Strong portfolio demonstrating UX/UI design skills',
      'Proficiency in Figma, Sketch, or Adobe XD',
      'Experience with design systems and component libraries',
      'Excellent communication and collaboration skills',
      'Understanding of front-end development (HTML/CSS)',
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Flexible work hours and remote-friendly',
      '401(k) with company match',
      'Professional development budget',
      'Unlimited PTO',
    ],
    companyDescription: 'TechFlow is a leading technology company focused on building innovative solutions that empower teams to collaborate more effectively. Founded in 2018, we\'ve grown to serve over 50,000 companies worldwide.',
    companySize: '200-500 employees',
    companyWebsite: 'www.techflow.com',
    applicationStatus: 'Interview Scheduled',
  };

  const job = data?.jobData ? { ...defaultJobData, ...data.jobData } : defaultJobData;

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedResume({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
      });
      setShowUploadSuccess(true);
      setTimeout(() => setShowUploadSuccess(false), 3000);
    }
  };

  const removeResume = () => {
    setUploadedResume(null);
  };

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div>
        <BackButton onClick={onBack} />
        
        <div className="flex items-start justify-between mt-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{job.title}</h1>
            <p className="mt-2 text-lg font-semibold text-primary">{job.company}</p>
          </div>
          <span className="rounded-full bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-500">
            {job.applicationStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Overview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Job Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Location</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{job.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <DollarSign size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Salary Range</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{job.salary}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Briefcase size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Job Type</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{job.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Experience</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{job.experience}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Job Description</h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {job.description}
            </p>
          </div>

          {/* Requirements */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Requirements</h2>
            <ul className="space-y-3">
              {job.requirements?.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 size={14} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Benefits & Perks</h2>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {job.benefits?.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">About {job.company}</h2>
            <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {job.companyDescription}
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Company Size</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{job.companySize}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Website</p>
                  <a
                    href={`https://${job.companyWebsite}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    {job.companyWebsite}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upload Resume - Only show for applicants */}
          {persona !== 'recruiter' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Upload Resume</h3>
              <p className="mb-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                Update your resume for this application
              </p>

              {!uploadedResume ? (
                <button
                  onClick={handleFileUpload}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-sm font-bold text-slate-600 transition-all hover:border-primary hover:bg-primary/5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                >
                  <Upload size={20} />
                  Click to upload resume
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-primary" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{uploadedResume.name}</p>
                        <p className="text-xs text-slate-500">{uploadedResume.size}</p>
                      </div>
                    </div>
                    <button onClick={removeResume} className="text-slate-400 hover:text-rose-500">
                      <X size={18} />
                    </button>
                  </div>
                  <button
                    onClick={handleFileUpload}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                  >
                    Replace Resume
                  </button>
                </div>
              )}

              {showUploadSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 p-3 text-emerald-600"
                >
                  <CheckCircle2 size={18} />
                  <p className="text-sm font-semibold">Resume uploaded successfully!</p>
                </motion.div>
              )}
            </div>
          )}

          {/* Quick Actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-primary-dark">
                Withdraw Application
              </button>
              <button className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                Contact Recruiter
              </button>
              <button className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                Save Job
              </button>
            </div>
          </div>

          {/* Application Info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Application Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Job ID</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">#{job.id}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Applied On</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Jan 24, 2026</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Last Updated</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Feb 20, 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};