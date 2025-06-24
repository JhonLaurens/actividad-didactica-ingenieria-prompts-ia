import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types for game state
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface UserProgress {
  currentSection: string;
  completedSections: string[];
  completedActivities: string[];
  totalScore: number;
  streakCount: number;
  lastActivityDate?: Date;
  achievements: Achievement[];
}

interface GameState {
  progress: UserProgress;
  showConfetti: boolean;
  recentAchievement?: Achievement;
}

type GameAction =
  | { type: 'COMPLETE_ACTIVITY'; payload: { activityId: string; points: number } }
  | { type: 'COMPLETE_SECTION'; payload: { sectionId: string } }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: Achievement }
  | { type: 'SHOW_CONFETTI'; payload: boolean }
  | { type: 'SET_CURRENT_SECTION'; payload: string }
  | { type: 'LOAD_PROGRESS'; payload: UserProgress };

const initialAchievements: Achievement[] = [
  {
    id: 'first-steps',
    title: 'Primeros Pasos',
    description: 'Completa tu primera actividad',
    icon: '🎯',
    unlocked: false
  },
  {
    id: 'prompt-master',
    title: 'Maestro de Prompts',
    description: 'Completa todos los escenarios prácticos',
    icon: '🧠',
    unlocked: false
  },
  {
    id: 'perfect-score',
    title: 'Puntuación Perfecta',
    description: 'Responde correctamente todas las preguntas de opción múltiple',
    icon: '⭐',
    unlocked: false
  },
  {
    id: 'deep-thinker',
    title: 'Pensador Profundo',
    description: 'Completa todas las reflexiones',
    icon: '🤔',
    unlocked: false
  },
  {
    id: 'completionist',
    title: 'Completista',
    description: 'Completa toda la actividad didáctica',
    icon: '🏆',
    unlocked: false
  }
];

const initialState: GameState = {
  progress: {
    currentSection: 'intro',
    completedSections: [],
    completedActivities: [],
    totalScore: 0,
    streakCount: 0,
    achievements: initialAchievements
  },
  showConfetti: false
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'COMPLETE_ACTIVITY': {
      const { activityId, points } = action.payload;
      const isNewActivity = !state.progress.completedActivities.includes(activityId);
      
      if (!isNewActivity) return state;

      const newProgress = {
        ...state.progress,
        completedActivities: [...state.progress.completedActivities, activityId],
        totalScore: state.progress.totalScore + points,
        streakCount: state.progress.streakCount + 1,
        lastActivityDate: new Date()
      };

      // Check for achievements
      const updatedAchievements = [...newProgress.achievements];
      
      // First activity achievement
      if (newProgress.completedActivities.length === 1) {
        const firstStepsIndex = updatedAchievements.findIndex(a => a.id === 'first-steps');
        if (firstStepsIndex >= 0 && !updatedAchievements[firstStepsIndex].unlocked) {
          updatedAchievements[firstStepsIndex] = {
            ...updatedAchievements[firstStepsIndex],
            unlocked: true,
            unlockedAt: new Date()
          };
        }
      }

      return {
        ...state,
        progress: { ...newProgress, achievements: updatedAchievements },
        showConfetti: isNewActivity
      };
    }

    case 'COMPLETE_SECTION': {
      const { sectionId } = action.payload;
      const isNewSection = !state.progress.completedSections.includes(sectionId);
      
      if (!isNewSection) return state;

      const newProgress = {
        ...state.progress,
        completedSections: [...state.progress.completedSections, sectionId]
      };

      // Check for completionist achievement
      const updatedAchievements = [...newProgress.achievements];
      if (newProgress.completedSections.length === 6) { // All sections completed
        const completionistIndex = updatedAchievements.findIndex(a => a.id === 'completionist');
        if (completionistIndex >= 0 && !updatedAchievements[completionistIndex].unlocked) {
          updatedAchievements[completionistIndex] = {
            ...updatedAchievements[completionistIndex],
            unlocked: true,
            unlockedAt: new Date()
          };
        }
      }

      return {
        ...state,
        progress: { ...newProgress, achievements: updatedAchievements },
        showConfetti: isNewSection
      };
    }

    case 'UNLOCK_ACHIEVEMENT': {
      const achievement = action.payload;
      const updatedAchievements = state.progress.achievements.map(a =>
        a.id === achievement.id ? { ...achievement, unlocked: true, unlockedAt: new Date() } : a
      );

      return {
        ...state,
        progress: { ...state.progress, achievements: updatedAchievements },
        recentAchievement: achievement,
        showConfetti: true
      };
    }

    case 'SHOW_CONFETTI':
      return { ...state, showConfetti: action.payload };

    case 'SET_CURRENT_SECTION':
      return { ...state, progress: { ...state.progress, currentSection: action.payload } };

    case 'LOAD_PROGRESS':
      return { ...state, progress: action.payload };

    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('prompt-engineering-progress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        dispatch({ type: 'LOAD_PROGRESS', payload: progress });
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('prompt-engineering-progress', JSON.stringify(state.progress));
  }, [state.progress]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
