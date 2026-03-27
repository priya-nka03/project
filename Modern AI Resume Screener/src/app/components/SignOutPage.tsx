import React from 'react';
import { motion } from 'motion/react';
import { LogOut, X } from 'lucide-react';

interface SignOutPageProps {
  onConfirmLogout: () => void;
  onCancel: () => void;
}

export const SignOutPage: React.FC<SignOutPageProps> = ({ onConfirmLogout, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md mx-4"
      >
        <div className="glass rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10">
              <LogOut size={32} className="text-rose-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-3">
            Sign Out
          </h2>
          
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
            Are you sure you want to log out?
          </p>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCancel}
              className="flex-1 py-3.5 rounded-xl font-bold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all"
            >
              Cancel
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onConfirmLogout}
              className="flex-1 py-3.5 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all"
            >
              Yes, logout
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
