import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick?: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.history.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 hover:scale-105"
    >
      <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
      <span>Back</span>
    </button>
  );
}