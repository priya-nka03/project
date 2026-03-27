import React, { useState } from 'react';
import { Sparkles, LayoutDashboard, Briefcase, Users, PieChart, Settings, LogOut, Menu, X, Home, Info, Phone, ChevronDown, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from 'figma:asset/eaa195830e51c938f9212aa28f28f73e17f73981.png';

interface NavbarProps {
  isAuthenticated: boolean;
  persona: 'applicant' | 'recruiter';
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  onLoginSelect: (persona: 'applicant' | 'recruiter') => void;
  createdJobs?: any[];
  showBackButton?: boolean;
  onBack?: () => void;
}

const recruiterNav = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'jobs', icon: Briefcase, label: 'Jobs' },
  { id: 'applicants', icon: Users, label: 'Applicants' },
  { id: 'analytics', icon: PieChart, label: 'Analytics' },
];

const applicantNav = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
  { id: 'find-jobs', icon: Briefcase, label: 'Browse' },
  { id: 'track-applications', icon: Users, label: 'Tracking' },
  { id: 'profile', icon: Settings, label: 'Profile' },
];

const publicNav = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: Info, label: 'About' },
  { id: 'contact', icon: Phone, label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ 
  isAuthenticated, 
  persona, 
  activeTab, 
  setActiveTab, 
  onLogout,
  onLoginSelect,
  createdJobs = [],
  showBackButton = false,
  onBack
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const navItems = isAuthenticated 
    ? (persona === 'recruiter' ? recruiterNav : applicantNav)
    : publicNav;

  const handleNavClick = (itemId: string) => {
    setActiveTab(itemId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Calculate total jobs count for badge
  const totalJobsCount = createdJobs.length;

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img 
            src={logoImage} 
            alt="ScreenAI Logo" 
            className="h-12 w-auto object-contain"
          />
          
          {/* Back Button - Show for recruiters on secondary pages */}
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="ml-2 flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
          
          {isAuthenticated && (
            <span className="ml-2 hidden rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400 sm:block">
              {persona}
            </span>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
              }`}
            >
              <item.icon size={18} className={activeTab === item.id ? 'text-primary' : 'text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'} />
              {item.label}
              {/* Show badge for Jobs button if user is recruiter and has created jobs */}
              {item.id === 'jobs' && persona === 'recruiter' && totalJobsCount > 0 && (
                <span className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                  {totalJobsCount}
                </span>
              )}
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                />
              )}
            </button>
          ))}
          
          <div className="mx-2 h-6 w-px bg-slate-200 dark:bg-slate-800" />
          
          {isAuthenticated ? (
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
            >
              <LogOut size={18} />
              Sign out
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-primary hover:bg-primary/10"
              >
                Login/Register
                <ChevronDown size={16} />
              </button>
              
              <AnimatePresence>
                {isLoginDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="p-1">
                      <button
                        onClick={() => {
                          onLoginSelect('applicant');
                          setIsLoginDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        Applicant
                      </button>
                      <button
                        onClick={() => {
                          onLoginSelect('recruiter');
                          setIsLoginDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        HR
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {/* Back Button in Mobile Menu - Show for recruiters on secondary pages */}
              {showBackButton && onBack && (
                <button
                  onClick={() => {
                    onBack();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg bg-slate-100 px-3 py-2 text-base font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
              )}
              
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavClick(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-base font-bold ${
                    activeTab === item.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
              
              {isAuthenticated ? (
                <button 
                  onClick={onLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-base font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                >
                  <LogOut size={20} />
                  Sign out
                </button>
              ) : (
                <>
                  <div className="my-2 h-px bg-slate-200 dark:bg-slate-800" />
                  <button
                    onClick={() => {
                      onLoginSelect('applicant');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-base font-bold text-primary hover:bg-primary/10"
                  >
                    Applicant
                  </button>
                  <button
                    onClick={() => {
                      onLoginSelect('recruiter');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-base font-bold text-primary hover:bg-primary/10"
                  >
                    HR
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};