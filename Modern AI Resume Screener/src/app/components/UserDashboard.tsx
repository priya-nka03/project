import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Award, 
  FileText, 
  CheckSquare, 
  XSquare,
  TrendingUp,
  Clock,
  Target,
  Sparkles,
  Check
} from 'lucide-react';
import logoImage from 'figma:asset/eaa195830e51c938f9212aa28f28f73e17f73981.png';
import { BackButton } from './BackButton';

type TabType = 'score' | 'remark' | 'matched' | 'missing';

// Mock data for demonstration
const mockData = {
  score: {
    overall: 87,
    breakdown: [
      { category: 'Technical Skills', score: 92, max: 100 },
      { category: 'Experience Level', score: 85, max: 100 },
      { category: 'Education', score: 88, max: 100 },
      { category: 'Certifications', score: 75, max: 100 },
      { category: 'Project Relevance', score: 90, max: 100 },
    ]
  },
  remarks: [
    {
      id: 1,
      type: 'success',
      title: 'Strong Technical Background',
      content: 'Your resume demonstrates excellent proficiency in React, TypeScript, and modern web development practices.',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'Experience Alignment',
      content: 'Your 5+ years of experience aligns well with the job requirements for this senior position.',
      timestamp: '2 hours ago'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Recommendation',
      content: 'Consider highlighting your leadership experience more prominently in your resume summary.',
      timestamp: '2 hours ago'
    },
  ],
  matchedSkills: [
    'React', 'TypeScript', 'Node.js', 'JavaScript', 'HTML/CSS', 'Git',
    'REST APIs', 'GraphQL', 'Tailwind CSS', 'Responsive Design',
    'Agile/Scrum', 'Jest/Testing', 'CI/CD', 'AWS'
  ],
  missingSkills: [
    'Docker', 'Kubernetes', 'Python', 'MongoDB', 'Redis', 'Microservices'
  ]
};

interface UserDashboardProps {
  onBack?: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('score');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [hasJobDescription, setHasJobDescription] = useState<boolean>(false);

  // Load resume data from sessionStorage on component mount
  React.useEffect(() => {
    const resumeDataStr = sessionStorage.getItem('resumeData');
    if (resumeDataStr) {
      const resumeData = JSON.parse(resumeDataStr);
      setUploadedFileName(resumeData.fileName || 'Resume_JohnDoe.pdf');
      setJobDescription(resumeData.jobDescription || '');
      setHasJobDescription(!!resumeData.jobDescription && resumeData.jobDescription.trim().length > 0);
    } else {
      setUploadedFileName('Resume_JohnDoe.pdf');
    }
  }, []);

  const handleJobDescriptionChange = (value: string) => {
    setJobDescription(value);
    setHasJobDescription(value.trim().length > 0);
  };

  const tabs = [
    { id: 'score' as TabType, label: 'Score', icon: Award },
    { id: 'remark' as TabType, label: 'Remark', icon: FileText },
    { id: 'matched' as TabType, label: 'Matched Skills', icon: CheckSquare },
    { id: 'missing' as TabType, label: 'Missing Skills', icon: XSquare },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <BackButton onClick={onBack} />
      
      {/* Header with Resume Upload Status */}
      <header className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <img 
            src={logoImage} 
            alt="ScreenAI Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
        
        {/* Uploaded Resume Display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-800/30 dark:bg-emerald-900/10"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
            <Check size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {uploadedFileName}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Resume uploaded successfully
            </p>
          </div>
        </motion.div>

        {/* Job Description Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Job Description (Optional)
          </label>
          <textarea
            placeholder="Paste job description..."
            rows={4}
            value={jobDescription}
            onChange={(e) => handleJobDescriptionChange(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder:text-slate-500 resize-none"
          />
          {hasJobDescription && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={14} />
              Job description added - skills analysis enabled
            </p>
          )}
        </div>
      </header>

      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-sm dark:border-primary/30"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">
              Overall Match Score
            </h2>
            <p className="text-base font-semibold text-white">
              Based on AI-powered resume screening analysis
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative h-32 w-32">
              <svg className="h-32 w-32 -rotate-90 transform">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-200 dark:text-slate-700"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - mockData.score.overall / 100)}`}
                  className={getScoreColor(mockData.score.overall)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-4xl font-bold ${getScoreColor(mockData.score.overall)}`}>
                  {mockData.score.overall}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="text-emerald-500" size={16} />
                <span className="font-semibold text-emerald-500">Excellent Match</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Target size={16} />
                <span>Top 15% of applicants</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-3 font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Score Tab */}
        {activeTab === 'score' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Score Breakdown
              </h3>
              
              <div className="space-y-6">
                {mockData.score.breakdown.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {item.category}
                      </span>
                      <span className={`font-bold ${getScoreColor(item.score)}`}>
                        {item.score}/{item.max}
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.score / item.max) * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className={`h-full ${getScoreBg(item.score)} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Remark Tab */}
        {activeTab === 'remark' && (
          <div className="space-y-6">
            {mockData.remarks.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`rounded-2xl border p-6 shadow-sm ${
                  message.type === 'success'
                    ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800/30 dark:bg-emerald-900/10'
                    : message.type === 'warning'
                    ? 'border-amber-200 bg-amber-50 dark:border-amber-800/30 dark:bg-amber-900/10'
                    : 'border-blue-200 bg-blue-50 dark:border-blue-800/30 dark:bg-blue-900/10'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    message.type === 'success'
                      ? 'bg-emerald-500 text-white'
                      : message.type === 'warning'
                      ? 'bg-amber-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {message.type === 'success' ? (
                      <CheckCircle2 size={20} />
                    ) : message.type === 'warning' ? (
                      <AlertCircle size={20} />
                    ) : (
                      <FileText size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {message.title}
                      </h4>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">
                      {message.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Matched Skills Tab */}
        {activeTab === 'matched' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {!hasJobDescription ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <AlertCircle size={32} className="text-slate-400 dark:text-slate-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Job Description Required
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  To view matched skills, please provide a job description along with your resume. This will allow our AI to compare your skills with the job requirements.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Matched Skills
                  </h3>
                  <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-500">
                    <CheckCircle2 size={16} />
                    {mockData.matchedSkills.length} Skills
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {mockData.matchedSkills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    >
                      <CheckCircle2 size={14} />
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Missing Skills Tab */}
        {activeTab === 'missing' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {!hasJobDescription ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <AlertCircle size={32} className="text-slate-400 dark:text-slate-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Job Description Required
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  To identify missing skills, please provide a job description along with your resume. Our AI will analyze the gap between your current skills and job requirements.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Missing Skills
                  </h3>
                  <span className="flex items-center gap-2 rounded-full bg-rose-500/10 px-4 py-2 text-sm font-bold text-rose-500">
                    <XCircle size={16} />
                    {mockData.missingSkills.length} Skills
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Adding these skills to your profile could improve your match score and increase your chances of getting hired.
                </p>

                <div className="flex flex-wrap gap-3">
                  {mockData.missingSkills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center gap-2 rounded-lg bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-600 dark:text-rose-400 border border-rose-500/20"
                    >
                      <XCircle size={14} />
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};