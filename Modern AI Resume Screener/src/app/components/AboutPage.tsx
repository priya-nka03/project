import React from 'react';
import { motion } from 'motion/react';
import { Target, Zap, Shield, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Screening',
      description: 'Advanced algorithms analyze resumes and match candidates with perfect job opportunities in seconds.',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    },
    {
      icon: Target,
      title: 'Precise Matching',
      description: 'Our intelligent system ensures the right talent meets the right opportunity every time.',
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security and privacy measures.',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      icon: Users,
      title: 'For Everyone',
      description: 'Whether you\'re hiring or job hunting, ScreenAI simplifies the entire process.',
      color: 'text-accent',
      bg: 'bg-accent/10'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-3 sm:mb-4">About ScreenAI</h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Revolutionizing the recruitment process with artificial intelligence
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Our Mission</h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-3 sm:mb-4">
          At ScreenAI, we believe that finding the perfect job or the ideal candidate shouldn't be a time-consuming, 
          frustrating process. Our mission is to leverage cutting-edge AI technology to create meaningful connections 
          between talented professionals and forward-thinking companies.
        </p>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          We're transforming traditional recruitment by automating resume screening, providing intelligent insights, 
          and ensuring that every candidate gets a fair chance to showcase their skills while helping recruiters 
          focus on what matters most - building great teams.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${feature.bg} ${feature.color} mb-3 sm:mb-4`}>
              <feature.icon size={20} className="sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 sm:p-8 shadow-sm dark:border-primary/30 text-center"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
          Join Thousands of Satisfied Users
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-5 sm:mb-6">
          Companies and job seekers trust ScreenAI to make smarter hiring decisions
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-primary">5,000+</p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Success Stories</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-accent">350+</p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Partner Companies</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-primary">1,200+</p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Active Jobs</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};