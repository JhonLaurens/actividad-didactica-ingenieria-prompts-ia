import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';

const ProgressRing: React.FC<{ progress: number; size?: number }> = ({ progress, size = 60 }) => {
  const circumference = 2 * Math.PI * 18;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r="18"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-neutral-DEFAULT"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r="18"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-primary-DEFAULT"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-primary-dark">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

const AchievementBadge: React.FC<{ achievement: any; size?: 'sm' | 'md' | 'lg' }> = ({ 
  achievement, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center relative ${
        achievement.unlocked 
          ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg' 
          : 'bg-neutral-DEFAULT text-neutral-dark'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={achievement.unlocked ? achievement.title : 'Bloqueado'}
    >
      <span className={achievement.unlocked ? 'filter-none' : 'filter grayscale opacity-50'}>
        {achievement.icon}
      </span>
      {achievement.unlocked && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      )}
    </motion.div>
  );
};

const ScoreDisplay: React.FC = () => {
  const { state } = useGame();
  
  return (
    <motion.div
      className="bg-gradient-to-r from-primary-light to-primary-DEFAULT text-white px-4 py-2 rounded-full shadow-lg"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">🏆</span>
        <span className="font-bold">{state.progress.totalScore} pts</span>
      </div>
    </motion.div>
  );
};

const StreakCounter: React.FC = () => {
  const { state } = useGame();
  
  if (state.progress.streakCount === 0) return null;
  
  return (
    <motion.div
      className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full shadow-lg"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center space-x-1">
        <span className="text-sm">🔥</span>
        <span className="font-bold text-sm">{state.progress.streakCount}</span>
      </div>
    </motion.div>
  );
};

const ProgressBar: React.FC<{ current: number; total: number; label?: string }> = ({ 
  current, 
  total, 
  label = "Progreso" 
}) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-neutral-dark">{label}</span>
          <span className="text-sm text-neutral-dark">{current}/{total}</span>
        </div>
      )}
      <div className="w-full bg-neutral-DEFAULT rounded-full h-2.5">
        <motion.div
          className="bg-gradient-to-r from-primary-DEFAULT to-primary-light h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export { ProgressRing, AchievementBadge, ScoreDisplay, StreakCounter, ProgressBar };
