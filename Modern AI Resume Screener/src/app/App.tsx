import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { ThemeProvider } from './components/ThemeContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { LoginPage } from './components/LoginPage';
import { RegistrationPage } from './components/RegistrationPage';
import { SignOutPage } from './components/SignOutPage';
import { Dashboard } from './components/Dashboard';
import { JobForm } from './components/JobForm';
import { FindJobs } from './components/FindJobs';
import { ApplicationTracker } from './components/ApplicationTracker';
import { UserProfile } from './components/UserProfile';
import { UserDashboard } from './components/UserDashboard';
import { ApplicationForm } from './components/ApplicationForm';
import { JobProfilePage } from './components/JobProfilePage';
import { Jobs } from './components/Jobs';
import { Applicants } from './components/Applicants';
import { motion, AnimatePresence } from 'motion/react';

type AppState = 'home' | 'about' | 'contact' | 'login' | 'register' | 'signout' | 'dashboard' | 'create-job' | 'find-jobs' | 'track-applications' | 'profile' | 'user-dashboard' | 'application-form' | 'job-profile' | 'jobs' | 'recruiter-job-details' | 'applicants';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [persona, setPersona] = useState<'applicant' | 'recruiter'>('applicant');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedLoginPersona, setSelectedLoginPersona] = useState<'applicant' | 'recruiter'>('applicant');
  const [selectedRegisterPersona, setSelectedRegisterPersona] = useState<'applicant' | 'recruiter'>('applicant');
  const [applicationData, setApplicationData] = useState<any>(null);
  const [jobProfileData, setJobProfileData] = useState<any>(null);
  const [createdJobs, setCreatedJobs] = useState<any[]>([]);
  const [previousView, setPreviousView] = useState<AppState>('dashboard');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (selectedPersona: 'applicant' | 'recruiter') => {
    setIsAuthenticated(true);
    setPersona(selectedPersona);
    setView('dashboard');
    setActiveTab('dashboard');
    scrollToTop();
    toast.success(`Successfully signed in as ${selectedPersona}!`, { duration: 1300 });
  };

  const handleRegister = (selectedPersona: 'applicant' | 'recruiter') => {
    setIsAuthenticated(true);
    setPersona(selectedPersona);
    setView('dashboard');
    setActiveTab('dashboard');
    scrollToTop();
    toast.success(`Account created successfully! Welcome, ${selectedPersona}!`, { duration: 1300 });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('home');
    setActiveTab('home');
    scrollToTop();
    toast.success("Logged out successfully", { duration: 1300 });
  };

  const handleSignOutClick = () => {
    setView('signout');
    scrollToTop();
  };

  const handleCancelSignOut = () => {
    setView('dashboard');
    setActiveTab('dashboard');
    scrollToTop();
  };

  const handleLoginSelect = (selectedPersona: 'applicant' | 'recruiter') => {
    setSelectedLoginPersona(selectedPersona);
    setView('login');
    scrollToTop();
  };

  const handleGetStarted = () => {
    setView('login');
    scrollToTop();
  };

  const handleCreateJob = () => {
    setView('create-job');
    scrollToTop();
  };

  const handlePublishJob = (jobData: any) => {
    setCreatedJobs([jobData, ...createdJobs]);
    toast.success("Job published successfully!");
    setView('dashboard');
    scrollToTop();
  };

  const handleApplicationForm = (data: any) => {
    setApplicationData(data);
    setView('application-form');
    scrollToTop();
  };

  const handleJobProfile = (data: any) => {
    setJobProfileData(data);
    setView('job-profile');
    scrollToTop();
  };

  const handleRecruiterJobClick = (job: any, fromView: AppState) => {
    setPreviousView(fromView);
    setJobProfileData({ jobData: job });
    setView('recruiter-job-details');
    scrollToTop();
  };

  const handleCloseJob = (jobId: string) => {
    setCreatedJobs(createdJobs.map(job => 
      job.id === jobId 
        ? { ...job, status: 'Closed' }
        : job
    ));
    toast.success('Job application closed successfully');
  };

  // Determine if back button should show for recruiter
  const showBackButton = isAuthenticated && 
    persona === 'recruiter' && 
    view !== 'dashboard' &&
    (view === 'create-job' || view === 'jobs' || view === 'recruiter-job-details');

  // Handle back navigation for recruiter
  const handleBackNavigation = () => {
    if (view === 'create-job' || view === 'jobs') {
      setView('dashboard');
      setActiveTab('dashboard');
    } else if (view === 'recruiter-job-details') {
      setView(previousView);
      setActiveTab(previousView);
    }
    scrollToTop();
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          persona={persona}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setView(tab as AppState);
          }}
          onLogout={handleSignOutClick}
          onLoginSelect={handleLoginSelect}
          createdJobs={createdJobs}
          showBackButton={showBackButton}
          onBack={handleBackNavigation}
        />
        
        <main className="pt-20">
          <AnimatePresence mode="wait">
            {view === 'home' ? (
              <div className="flex justify-center">
                <div className="flex-1 px-4 py-8 lg:px-12">
                  <div className="mx-auto max-w-6xl">
                    <motion.div
                      key="home"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HomePage 
                        onGetStarted={handleGetStarted} 
                        isAuthenticated={isAuthenticated}
                        onLoginRequired={handleGetStarted}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            ) : view === 'about' ? (
              <div className="flex justify-center">
                <div className="flex-1 px-4 py-8 lg:px-12">
                  <div className="mx-auto max-w-6xl">
                    <motion.div
                      key="about"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AboutPage />
                    </motion.div>
                  </div>
                </div>
              </div>
            ) : view === 'contact' ? (
              <div className="flex justify-center">
                <div className="flex-1 px-4 py-8 lg:px-12">
                  <div className="mx-auto max-w-6xl">
                    <motion.div
                      key="contact"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ContactPage />
                    </motion.div>
                  </div>
                </div>
              </div>
            ) : view === 'login' ? (
              <motion.div
                key="login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LoginPage 
                  onLogin={handleLogin} 
                  onNavigateToRegister={(persona) => {
                    setSelectedRegisterPersona(persona);
                    setView('register');
                  }} 
                  initialPersona={selectedLoginPersona}
                />
              </motion.div>
            ) : view === 'register' ? (
              <motion.div
                key="register"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <RegistrationPage onRegister={handleRegister} onBackToLogin={() => setView('login')} initialPersona={selectedRegisterPersona} />
              </motion.div>
            ) : view === 'signout' ? (
              <motion.div
                key="signout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SignOutPage onConfirmLogout={handleLogout} onCancel={handleCancelSignOut} />
              </motion.div>
            ) : (
              <div className="flex justify-center">
                <div className="flex-1 px-4 py-8 lg:px-12">
                  <div className="mx-auto max-w-6xl">
                    {view === 'dashboard' && (
                      <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <Dashboard 
                          persona={persona} 
                          onCreateJob={handleCreateJob} 
                          onNavigate={(newView) => setView(newView as AppState)}
                          createdJobs={createdJobs}
                          onJobClick={(job) => handleRecruiterJobClick(job, 'dashboard')}
                        />
                      </motion.div>
                    )}
                    
                    {view === 'create-job' && (
                      <motion.div
                        key="create-job"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <JobForm 
                          onBack={() => setView('dashboard')} 
                          onPublish={handlePublishJob} 
                        />
                      </motion.div>
                    )}

                    {view === 'find-jobs' && (
                      <motion.div
                        key="find-jobs"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <FindJobs onNavigate={handleApplicationForm} />
                      </motion.div>
                    )}

                    {view === 'track-applications' && (
                      <motion.div
                        key="track-applications"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <ApplicationTracker onNavigate={handleJobProfile} />
                      </motion.div>
                    )}

                    {view === 'profile' && (
                      <motion.div
                        key="profile"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <UserProfile />
                      </motion.div>
                    )}

                    {view === 'user-dashboard' && (
                      <motion.div
                        key="user-dashboard"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <UserDashboard onBack={() => setView('dashboard')} />
                      </motion.div>
                    )}

                    {view === 'application-form' && (
                      <motion.div
                        key="application-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <ApplicationForm 
                          data={applicationData} 
                          onBack={() => setView('find-jobs')} 
                        />
                      </motion.div>
                    )}

                    {view === 'job-profile' && (
                      <motion.div
                        key="job-profile"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <JobProfilePage 
                          data={jobProfileData} 
                          onBack={() => setView('track-applications')}
                          persona={persona}
                        />
                      </motion.div>
                    )}

                    {view === 'jobs' && (
                      <motion.div
                        key="jobs"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <Jobs 
                          createdJobs={createdJobs}
                          onJobClick={(job) => handleRecruiterJobClick(job, 'jobs')}
                        />
                      </motion.div>
                    )}

                    {view === 'recruiter-job-details' && (
                      <motion.div
                        key="recruiter-job-details"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <JobProfilePage 
                          data={jobProfileData} 
                          onBack={() => setView(previousView)}
                          persona={persona}
                        />
                      </motion.div>
                    )}

                    {view === 'applicants' && (
                      <motion.div
                        key="applicants"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <Applicants 
                          createdJobs={createdJobs}
                          onCloseJob={handleCloseJob}
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </main>

        <Toaster position="top-right" expand={false} richColors />
      </div>
    </ThemeProvider>
  );
};

export default App;