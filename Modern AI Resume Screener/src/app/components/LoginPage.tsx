import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Chrome, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLogin: (persona: 'applicant' | 'recruiter') => void;
  onNavigateToRegister: (persona: 'applicant' | 'recruiter') => void;
  initialPersona?: 'applicant' | 'recruiter';
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToRegister, initialPersona }) => {
  const [persona, setPersona] = useState<'applicant' | 'recruiter'>(initialPersona || 'applicant');
  const [email, setEmail] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);

  // Update persona when initialPersona prop changes
  useEffect(() => {
    if (initialPersona) {
      setPersona(initialPersona);
    }
  }, [initialPersona]);

  const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
  
  const isValidEmail = (emailValue: string): boolean => {
    if (!emailValue) return false;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) return false;
    
    const domain = emailValue.split('@')[1]?.toLowerCase();
    return validDomains.includes(domain);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setShowEmailError(value.length > 0 && !isValidEmail(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setShowEmailError(true);
      return;
    }
    onLogin(persona);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Background Blobs */}
      <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-accent/20 blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md"
      >
        <div className="glass rounded-3xl p-8 md:p-10">
          <div className="mb-10 flex justify-center">
            <div className="relative flex w-full max-w-[300px] rounded-full bg-slate-100 p-1 dark:bg-slate-800">
              <motion.div
                className={`absolute inset-y-1 rounded-full shadow-sm ${
                  persona === 'applicant' ? 'bg-primary' : 'bg-accent'
                }`}
                initial={false}
                animate={{
                  left: persona === 'applicant' ? 4 : 'calc(50% + 2px)',
                  right: persona === 'applicant' ? 'calc(50% + 2px)' : 4,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                onClick={() => setPersona('applicant')}
                className={`relative z-10 w-1/2 py-2 text-sm font-semibold transition-colors ${
                  persona === 'applicant' ? 'text-white' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Applicant
              </button>
              <button
                onClick={() => setPersona('recruiter')}
                className={`relative z-10 w-1/2 py-2 text-sm font-semibold transition-colors ${
                  persona === 'recruiter' ? 'text-white' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Recruiter
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {persona === 'applicant' 
                ? 'Ready to find your next career move?' 
                : 'Find the perfect candidate today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
                {showEmailError && (
                  <p className="text-xs text-red-500 mt-1">Enter a valid email</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all duration-300 ${
                persona === 'applicant' ? 'bg-primary hover:bg-primary-dark' : 'bg-accent hover:bg-accent-dark'
              }`}
            >
              Sign In
            </motion.button>
          </form>

          <div className="mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                  OR
                </span>
              </div>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800">
              <Chrome size={20} />
              Sign in with Google
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <button 
              onClick={() => onNavigateToRegister(persona)}
              className="font-semibold text-primary hover:underline"
            >
              Sign up for free
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};