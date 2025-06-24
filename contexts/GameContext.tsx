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

// Serializable version for localStorage (dates as ISO strings)
interface SerializableAchievement extends Omit<Achievement, 'unlockedAt'> {
  unlockedAt?: string;
}

interface SerializableUserProgress extends Omit<UserProgress, 'lastActivityDate' | 'achievements'> {
  lastActivityDate?: string;
  achievements: SerializableAchievement[];
}

// Storage schema versioning for migrations
interface StorageSchema {
  version: number;
  data: SerializableUserProgress;
  timestamp: string;
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
  isLoading?: boolean; // Added for loading state during initialization
  storageError?: string; // Added for storage error notifications
}

type GameAction =
  | { type: 'COMPLETE_ACTIVITY'; payload: { activityId: string; points: number } }
  | { type: 'COMPLETE_SECTION'; payload: { sectionId: string } }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: Achievement }
  | { type: 'SHOW_CONFETTI'; payload: boolean }
  | { type: 'SET_CURRENT_SECTION'; payload: string }
  | { type: 'LOAD_PROGRESS'; payload: UserProgress }
  | { type: 'SET_STORAGE_ERROR'; payload: string | undefined };

const STORAGE_KEY = 'prompt-engineering-progress';
const CURRENT_SCHEMA_VERSION = 1;

// Utility functions for data validation and transformation
const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString === date.toISOString();
};

const validateAchievement = (achievement: any): achievement is SerializableAchievement => {
  return (
    typeof achievement === 'object' &&
    typeof achievement.id === 'string' &&
    typeof achievement.title === 'string' &&
    typeof achievement.description === 'string' &&
    typeof achievement.icon === 'string' &&
    typeof achievement.unlocked === 'boolean' &&
    (achievement.unlockedAt === undefined || 
     (typeof achievement.unlockedAt === 'string' && isValidDate(achievement.unlockedAt)))
  );
};

const validateStoredProgress = (progress: any): progress is SerializableUserProgress => {
  if (typeof progress !== 'object' || progress === null) return false;
  
  // Required fields validation
  const requiredFields = ['currentSection', 'completedSections', 'completedActivities', 'totalScore', 'streakCount', 'achievements'];
  for (const field of requiredFields) {
    if (!(field in progress)) return false;
  }
  
  // Type validation
  if (typeof progress.currentSection !== 'string' ||
      !Array.isArray(progress.completedSections) ||
      !Array.isArray(progress.completedActivities) ||
      typeof progress.totalScore !== 'number' ||
      typeof progress.streakCount !== 'number' ||
      !Array.isArray(progress.achievements)) {
    return false;
  }
  
  // Validate achievements array
  if (!progress.achievements.every(validateAchievement)) return false;
  
  // Optional fields validation
  if (progress.lastActivityDate !== undefined && 
      (typeof progress.lastActivityDate !== 'string' || !isValidDate(progress.lastActivityDate))) {
    return false;
  }
  
  return true;
};

// Convert serializable data to runtime data (deserialize dates)
const deserializeProgress = (serializable: SerializableUserProgress): UserProgress => {
  return {
    ...serializable,
    lastActivityDate: serializable.lastActivityDate ? new Date(serializable.lastActivityDate) : undefined,
    achievements: serializable.achievements.map(achievement => ({
      ...achievement,
      unlockedAt: achievement.unlockedAt ? new Date(achievement.unlockedAt) : undefined
    }))
  };
};

// Convert runtime data to serializable data (serialize dates)
const serializeProgress = (progress: UserProgress): SerializableUserProgress => {
  return {
    ...progress,
    lastActivityDate: progress.lastActivityDate?.toISOString(),
    achievements: progress.achievements.map(achievement => ({
      ...achievement,
      unlockedAt: achievement.unlockedAt?.toISOString()
    }))
  };
};

// Merge initial achievements with stored achievements to handle schema changes
const mergeAchievements = (initialAchievements: Achievement[], storedAchievements: Achievement[]): Achievement[] => {
  const achievementMap = new Map<string, Achievement>();
  
  // Start with initial achievements (ensures all expected achievements exist)
  initialAchievements.forEach(achievement => {
    achievementMap.set(achievement.id, { ...achievement });
  });
  
  // Override with stored achievements that exist and are unlocked
  storedAchievements.forEach(storedAchievement => {
    if (achievementMap.has(storedAchievement.id) && storedAchievement.unlocked) {
      achievementMap.set(storedAchievement.id, {
        ...achievementMap.get(storedAchievement.id)!,
        unlocked: true,
        unlockedAt: storedAchievement.unlockedAt
      });
    }
  });
  
  return Array.from(achievementMap.values());
};

// Safe localStorage operations with error handling
const safeLoadFromStorage = (): UserProgress | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    
    // Handle versioned storage (future-proofing)
    let progressData: any;
    if (parsed.version && parsed.data) {
      // Versioned format
      if (parsed.version !== CURRENT_SCHEMA_VERSION) {
        console.warn(`Storage schema version mismatch. Expected ${CURRENT_SCHEMA_VERSION}, found ${parsed.version}`);
        // Here we could add migration logic in the future
      }
      progressData = parsed.data;
    } else {
      // Legacy format (direct progress object)
      progressData = parsed;
    }
    
    if (!validateStoredProgress(progressData)) {
      console.error('Invalid stored progress data structure. Resetting to initial state.');
      return null;
    }
    
    const deserializedProgress = deserializeProgress(progressData);
    
    // Merge achievements to handle schema changes
    deserializedProgress.achievements = mergeAchievements(initialAchievements, deserializedProgress.achievements);
    
    return deserializedProgress;
    
  } catch (error) {
    console.error('Failed to load progress from localStorage:', error);
    // Create backup of corrupted data for debugging
    try {
      const corrupted = localStorage.getItem(STORAGE_KEY);
      localStorage.setItem(`${STORAGE_KEY}_corrupted_${Date.now()}`, corrupted || '');
    } catch (backupError) {
      console.error('Failed to backup corrupted data:', backupError);
    }
    return null;
  }
};

const safeSaveToStorage = (progress: UserProgress): boolean => {
  try {
    const serializedProgress = serializeProgress(progress);
    const storageData: StorageSchema = {
      version: CURRENT_SCHEMA_VERSION,
      data: serializedProgress,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    return true;
    
  } catch (error) {
    console.error('Failed to save progress to localStorage:', error);
    
    // If quota exceeded, try to clean up old corrupted backups
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      try {
        const keys = Object.keys(localStorage);
        const backupKeys = keys.filter(key => key.startsWith(`${STORAGE_KEY}_corrupted_`));
        backupKeys.forEach(key => localStorage.removeItem(key));        // Retry save after cleanup
        const serializedProgressRetry = serializeProgress(progress);
        const retryStorageData: StorageSchema = {
          version: CURRENT_SCHEMA_VERSION,
          data: serializedProgressRetry,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(retryStorageData));
        return true;
      } catch (retryError) {
        console.error('Failed to save even after cleanup:', retryError);
      }
    }
    
    return false;
  }
};const initialAchievements: Achievement[] = [
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

      // Check for achievements with better validation
      const updatedAchievements = [...newProgress.achievements];
      let hasNewAchievement = false;
      
      // First activity achievement
      if (newProgress.completedActivities.length === 1) {
        const firstStepsIndex = updatedAchievements.findIndex(a => a.id === 'first-steps');
        if (firstStepsIndex >= 0 && !updatedAchievements[firstStepsIndex].unlocked) {
          updatedAchievements[firstStepsIndex] = {
            ...updatedAchievements[firstStepsIndex],
            unlocked: true,
            unlockedAt: new Date()
          };
          hasNewAchievement = true;
        }
      }

      return {
        ...state,
        progress: { ...newProgress, achievements: updatedAchievements },
        showConfetti: isNewActivity || hasNewAchievement
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

      // Check for completionist achievement with proper validation
      const updatedAchievements = [...newProgress.achievements];
      let hasNewAchievement = false;
      
      if (newProgress.completedSections.length === 6) { // All sections completed
        const completionistIndex = updatedAchievements.findIndex(a => a.id === 'completionist');
        if (completionistIndex >= 0 && !updatedAchievements[completionistIndex].unlocked) {
          updatedAchievements[completionistIndex] = {
            ...updatedAchievements[completionistIndex],
            unlocked: true,
            unlockedAt: new Date()
          };
          hasNewAchievement = true;
        }
      }

      return {
        ...state,
        progress: { ...newProgress, achievements: updatedAchievements },
        showConfetti: isNewSection || hasNewAchievement
      };
    }

    case 'UNLOCK_ACHIEVEMENT': {
      const achievement = action.payload;
      
      // Validate achievement exists and is not already unlocked
      const existingAchievementIndex = state.progress.achievements.findIndex(a => a.id === achievement.id);
      if (existingAchievementIndex === -1 || state.progress.achievements[existingAchievementIndex].unlocked) {
        return state; // Achievement doesn't exist or is already unlocked
      }
      
      const updatedAchievements = [...state.progress.achievements];
      updatedAchievements[existingAchievementIndex] = {
        ...updatedAchievements[existingAchievementIndex],
        unlocked: true,
        unlockedAt: new Date()
      };

      return {
        ...state,
        progress: { ...state.progress, achievements: updatedAchievements },
        recentAchievement: updatedAchievements[existingAchievementIndex],
        showConfetti: true
      };
    }

    case 'SHOW_CONFETTI':
      return { ...state, showConfetti: action.payload };

    case 'SET_CURRENT_SECTION':
      return { ...state, progress: { ...state.progress, currentSection: action.payload } };

    case 'LOAD_PROGRESS': {
      // Enhanced validation when loading progress
      const loadedProgress = action.payload;
      
      // Ensure all required fields exist with fallback values
      const safeProgress: UserProgress = {
        currentSection: loadedProgress.currentSection || 'intro',
        completedSections: Array.isArray(loadedProgress.completedSections) ? loadedProgress.completedSections : [],
        completedActivities: Array.isArray(loadedProgress.completedActivities) ? loadedProgress.completedActivities : [],
        totalScore: typeof loadedProgress.totalScore === 'number' ? Math.max(0, loadedProgress.totalScore) : 0,
        streakCount: typeof loadedProgress.streakCount === 'number' ? Math.max(0, loadedProgress.streakCount) : 0,
        lastActivityDate: loadedProgress.lastActivityDate instanceof Date ? loadedProgress.lastActivityDate : undefined,
        achievements: Array.isArray(loadedProgress.achievements) ? 
          mergeAchievements(initialAchievements, loadedProgress.achievements) : 
          initialAchievements
      };
        return { ...state, progress: safeProgress };
    }

    case 'SET_STORAGE_ERROR':
      return { ...state, storageError: action.payload };

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
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Load progress from localStorage on mount with enhanced error handling
  useEffect(() => {
    const loadProgress = async () => {
      const savedProgress = safeLoadFromStorage();
      
      if (savedProgress) {
        console.log('Successfully loaded progress from localStorage');
        dispatch({ type: 'LOAD_PROGRESS', payload: savedProgress });
      } else {
        console.log('No valid saved progress found, starting with initial state');
        // Ensure we save the initial state to establish the storage schema
        safeSaveToStorage(initialState.progress);
      }
      
      setIsInitialized(true);
    };

    loadProgress();
  }, []);
  // Save progress to localStorage whenever state changes (but only after initialization)
  useEffect(() => {
    if (!isInitialized) return;
    
    const saveSuccess = safeSaveToStorage(state.progress);
    if (!saveSuccess) {
      console.warn('Progress could not be saved. User progress may be lost.');
      dispatch({ 
        type: 'SET_STORAGE_ERROR', 
        payload: 'No se pudo guardar el progreso. Tu progreso podría perderse.' 
      });
    } else {
      // Clear any previous storage errors if save is successful
      if (state.storageError) {
        dispatch({ type: 'SET_STORAGE_ERROR', payload: undefined });
      }
    }
  }, [state.progress, isInitialized]);

  // Provide loading state to components if needed
  const contextValue = React.useMemo(() => ({
    state: {
      ...state,
      isLoading: !isInitialized
    },
    dispatch
  }), [state, isInitialized]);

  return (
    <GameContext.Provider value={contextValue}>
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

// Enhanced hook with additional utilities
export const useGameWithUtils = () => {
  const { state, dispatch } = useGame();
  
  return {
    // Basic context
    state,
    dispatch,
    
    // Computed values
    isLoading: state.isLoading,
    hasStorageError: !!state.storageError,
    storageError: state.storageError,
    completionPercentage: Math.round((state.progress.completedSections.length / 6) * 100),
    unlockedAchievements: state.progress.achievements.filter(a => a.unlocked),
    
    // Helper functions
    clearStorageError: () => dispatch({ type: 'SET_STORAGE_ERROR', payload: undefined }),
    
    // Progress queries
    isActivityCompleted: (activityId: string) => 
      state.progress.completedActivities.includes(activityId),
    
    isSectionCompleted: (sectionId: string) => 
      state.progress.completedSections.includes(sectionId),
      
    getAchievementById: (achievementId: string) => 
      state.progress.achievements.find(a => a.id === achievementId),
      
    // Actions
    completeActivity: (activityId: string, points: number) =>
      dispatch({ type: 'COMPLETE_ACTIVITY', payload: { activityId, points } }),
      
    completeSection: (sectionId: string) =>
      dispatch({ type: 'COMPLETE_SECTION', payload: { sectionId } }),
      
    unlockAchievement: (achievement: Achievement) =>
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: achievement }),
      
    setCurrentSection: (sectionId: string) =>
      dispatch({ type: 'SET_CURRENT_SECTION', payload: sectionId }),
      
    showConfetti: (show: boolean = true) =>
      dispatch({ type: 'SHOW_CONFETTI', payload: show })
  };
};
