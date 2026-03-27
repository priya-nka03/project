import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, Phone } from 'lucide-react';

interface RegistrationPageProps {
  onRegister: (persona: 'applicant' | 'recruiter') => void;
  onBackToLogin: () => void;
  initialPersona?: 'applicant' | 'recruiter';
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ onRegister, onBackToLogin, initialPersona }) => {
  const [persona, setPersona] = useState<'applicant' | 'recruiter'>(initialPersona || 'applicant');
  const [email, setEmail] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);

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
    onRegister(persona);
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
              Create Account
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {persona === 'applicant' 
                ? 'Start your career journey with us' 
                : 'Find top talent for your company'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

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
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone No.</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
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
              Register
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <button 
              onClick={onBackToLogin}
              className="font-semibold text-primary hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};