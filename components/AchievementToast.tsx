import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';

const AchievementToast: React.FC = () => {
  const { state, dispatch } = useGame();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (state.recentAchievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Clear the recent achievement after animation
        setTimeout(() => {
          dispatch({ type: 'SHOW_CONFETTI', payload: false });
        }, 500);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [state.recentAchievement, dispatch]);

  if (!state.recentAchievement) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{state.recentAchievement.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">¡Logro Desbloqueado!</h3>
                <p className="font-semibold">{state.recentAchievement.title}</p>
                <p className="text-sm opacity-90">{state.recentAchievement.description}</p>
              </div>
              <div className="text-2xl">🎉</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementToast;
