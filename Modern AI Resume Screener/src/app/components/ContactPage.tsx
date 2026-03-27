import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold text-primary mb-4">Contact Us</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Get in touch with our team. We're here to help!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
            <Mail size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Email</h3>
          <p className="text-slate-600 dark:text-slate-400">support@screenai.com</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
            <Phone size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Phone</h3>
          <p className="text-slate-600 dark:text-slate-400">+1 (555) 123-4567</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 mb-4">
            <MapPin size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Office</h3>
          <p className="text-slate-600 dark:text-slate-400">San Francisco, CA</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
            <input
              type="text"
              placeholder="How can we help?"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
            <textarea
              placeholder="Tell us more about your inquiry..."
              rows={5}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white resize-none"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark shadow-lg transition-all"
          >
            <Send size={20} />
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};