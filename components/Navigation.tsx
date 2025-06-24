
import React from 'react';
import { Section } from '../types';
import { activitySectionsData } from '../constants';
import { useGame } from '../contexts/GameContext';
import { ProgressRing, ScoreDisplay, StreakCounter } from './gamification/GameElements';

interface NavigationProps {
  currentSectionId: string;
  onSelectSection: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSectionId, onSelectSection }) => {
  const { state } = useGame();
  
  const getCompletionPercentage = () => {
    return (state.progress.completedSections.length / activitySectionsData.length) * 100;
  };

  return (
    <nav className="w-64 bg-neutral-darker text-white p-5 space-y-2 fixed top-0 left-0 h-full overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-secondary-DEFAULT">Guía Interactiva</h1>
        
        {/* Progress Overview */}
        <div className="bg-neutral-dark p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Progreso General</span>
            <ProgressRing progress={getCompletionPercentage()} size={40} />
          </div>
          
          <div className="flex justify-between items-center">
            <ScoreDisplay />
            <StreakCounter />
          </div>
        </div>

        {/* Achievements Preview */}
        <div className="bg-neutral-dark p-3 rounded-lg mb-4">
          <h3 className="text-sm font-semibold mb-2 flex items-center">
            <span className="mr-2">🏆</span>
            Logros
          </h3>
          <div className="flex space-x-1">
            {state.progress.achievements.slice(0, 5).map((achievement) => (
              <div
                key={achievement.id}
                className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                  achievement.unlocked 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-neutral-DEFAULT text-neutral-dark'
                }`}
                title={achievement.title}
              >
                {achievement.icon}
              </div>
            ))}
          </div>
          <div className="text-xs text-neutral-light mt-1">
            {state.progress.achievements.filter(a => a.unlocked).length} de {state.progress.achievements.length} desbloqueados
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      {activitySectionsData.map((section: Section, index) => {
        const isCompleted = state.progress.completedSections.includes(section.id);
        const isActive = currentSectionId === section.id;
        
        return (
          <button
            key={section.id}
            onClick={() => onSelectSection(section.id)}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 relative
              ${isActive 
                ? 'bg-primary-DEFAULT text-white shadow-lg' 
                : 'hover:bg-primary-dark hover:text-white'
              }`}
          >
            <div className="relative">
              <section.icon className="h-5 w-5 flex-shrink-0" />
              {isCompleted && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <span className="block">{section.title}</span>
              <div className="text-xs opacity-75 mt-1">
                Sección {index + 1}
              </div>
            </div>
            {isActive && <div className="w-1 h-6 bg-secondary-DEFAULT rounded-full" />}
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
