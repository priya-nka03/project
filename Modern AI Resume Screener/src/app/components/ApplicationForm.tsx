import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Upload, X, CheckCircle2, FileText, Mail, Phone, Linkedin, Github, ArrowLeft } from 'lucide-react';

interface ApplicationFormProps {
  jobTitle?: string;
  companyName?: string;
  jobId?: number;
  data?: any;
  onBack?: () => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ 
  data,
  onBack 
}) => {
  const jobTitle = data?.jobTitle || 'Senior Frontend Developer';
  const companyName = data?.companyName || 'InnovateTech';
  const jobId = data?.jobId;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    coverLetter: '',
    yearsOfExperience: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setUploadedFiles(prev => [...prev, {
          name: file.name,
          size: (file.size / 1024).toFixed(2) + ' KB'
        }]);
      }
    };
    input.click();
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Submit form logic here
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 size={48} className="text-emerald-500" />
        </div>
        <h2 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white">
          Application Submitted Successfully!
        </h2>
        <p className="mb-8 max-w-md font-medium text-slate-600 dark:text-slate-400">
          Thank you for applying to <span className="font-bold text-primary">{jobTitle}</span> at{' '}
          <span className="font-bold text-primary">{companyName}</span>. We'll review your application and get back to you soon.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            Back to Jobs
          </button>
          <button
            onClick={() => setIsSubmitted(false)}
            className="rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg hover:bg-primary-dark"
          >
            Submit Another Application
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with back button */}
      <div>
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </button>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Job Application</h1>
        <p className="font-medium text-slate-600 dark:text-slate-400">
          Complete the form below to submit your application
        </p>
      </div>

      {/* Job Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 dark:border-primary/30"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white">
            <Briefcase size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{jobTitle}</h2>
            <p className="font-semibold text-primary">{companyName}</p>
            {jobId && (
              <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                Job ID: #{jobId}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Personal Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm font-medium focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm font-medium focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                LinkedIn Profile
              </label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm font-medium focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                GitHub/Portfolio URL
              </label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm font-medium focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  placeholder="github.com/johndoe"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Professional Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Years of Experience <span className="text-rose-500">*</span>
              </label>
              <select
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                <option value="">Select experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-7">5-7 years</option>
                <option value="7-10">7-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Notice Period <span className="text-rose-500">*</span>
              </label>
              <select
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                <option value="">Select notice period</option>
                <option value="immediate">Immediate</option>
                <option value="15-days">15 days</option>
                <option value="1-month">1 month</option>
                <option value="2-months">2 months</option>
                <option value="3-months">3 months</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Current Salary (Optional)
              </label>
              <input
                type="text"
                name="currentSalary"
                value={formData.currentSalary}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                placeholder="$120,000"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Expected Salary <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                placeholder="$140,000"
              />
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Resume & Documents</h3>
          <div className="mb-4">
            <button
              type="button"
              onClick={handleFileUpload}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-sm font-bold text-slate-600 transition-all hover:border-primary hover:bg-primary/5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            >
              <Upload size={20} />
              Click to upload resume (PDF, DOC, DOCX)
            </button>
          </div>
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-slate-100 p-3 dark:bg-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{file.name}</p>
                      <p className="text-xs text-slate-500">{file.size}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cover Letter */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Cover Letter</h3>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleInputChange}
            rows={6}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            placeholder="Tell us why you're a great fit for this position..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-primary px-6 py-3.5 font-bold text-white shadow-lg hover:bg-primary-dark"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};