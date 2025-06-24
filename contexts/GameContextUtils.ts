/**
 * Utility functions for GameContext debugging and testing
 * These functions help with diagnostics and testing of the game state management
 */

import { UserProgress, Achievement } from './GameContext';

// Development/Debug utilities
export const gameDebugUtils = {
  /**
   * Validate the current state of user progress
   * Returns an array of validation errors, empty if valid
   */
  validateProgress: (progress: UserProgress): string[] => {
    const errors: string[] = [];
    
    // Check required fields
    if (!progress.currentSection) {
      errors.push('Missing currentSection');
    }
    
    if (!Array.isArray(progress.completedSections)) {
      errors.push('completedSections must be an array');
    }
    
    if (!Array.isArray(progress.completedActivities)) {
      errors.push('completedActivities must be an array');
    }
    
    if (typeof progress.totalScore !== 'number' || progress.totalScore < 0) {
      errors.push('totalScore must be a non-negative number');
    }
    
    if (typeof progress.streakCount !== 'number' || progress.streakCount < 0) {
      errors.push('streakCount must be a non-negative number');
    }
    
    if (!Array.isArray(progress.achievements)) {
      errors.push('achievements must be an array');
    }
    
    // Validate achievements
    progress.achievements.forEach((achievement, index) => {
      if (!achievement.id) {
        errors.push(`Achievement at index ${index} missing id`);
      }
      if (typeof achievement.unlocked !== 'boolean') {
        errors.push(`Achievement ${achievement.id} unlocked must be boolean`);
      }
      if (achievement.unlocked && !achievement.unlockedAt) {
        errors.push(`Achievement ${achievement.id} is unlocked but missing unlockedAt date`);
      }
    });
    
    return errors;
  },

  /**
   * Get storage diagnostics
   */
  getStorageDiagnostics: () => {
    const diagnostics = {
      hasLocalStorage: typeof localStorage !== 'undefined',
      storageQuotaUsed: 0,
      storageQuotaTotal: 0,
      corruptedBackups: 0,
      mainStorageExists: false,
      mainStorageValid: false,
      mainStorageSize: 0
    };

    try {
      // Check if localStorage is available
      if (typeof localStorage === 'undefined') {
        return diagnostics;
      }

      // Check main storage
      const mainStorage = localStorage.getItem('prompt-engineering-progress');
      diagnostics.mainStorageExists = !!mainStorage;
      diagnostics.mainStorageSize = mainStorage ? mainStorage.length : 0;

      if (mainStorage) {
        try {
          JSON.parse(mainStorage);
          diagnostics.mainStorageValid = true;
        } catch {
          diagnostics.mainStorageValid = false;
        }
      }

      // Count corrupted backups
      const keys = Object.keys(localStorage);
      diagnostics.corruptedBackups = keys.filter(key => 
        key.startsWith('prompt-engineering-progress_corrupted_')
      ).length;

      // Estimate storage usage (not exact but gives an idea)
      let totalSize = 0;
      keys.forEach(key => {
        const value = localStorage.getItem(key);
        totalSize += key.length + (value ? value.length : 0);
      });
      diagnostics.storageQuotaUsed = totalSize;

    } catch (error) {
      console.error('Error getting storage diagnostics:', error);
    }

    return diagnostics;
  },

  /**
   * Clean up corrupted backup files
   */
  cleanupCorruptedBackups: (): number => {
    let cleaned = 0;
    try {
      const keys = Object.keys(localStorage);
      const backupKeys = keys.filter(key => 
        key.startsWith('prompt-engineering-progress_corrupted_')
      );
      
      backupKeys.forEach(key => {
        localStorage.removeItem(key);
        cleaned++;
      });
    } catch (error) {
      console.error('Error cleaning up corrupted backups:', error);
    }
    
    return cleaned;
  },

  /**
   * Export progress data for backup or transfer
   */
  exportProgress: (progress: UserProgress): string => {
    try {
      const exportData = {
        version: 1,
        exportedAt: new Date().toISOString(),
        progress: {
          ...progress,
          lastActivityDate: progress.lastActivityDate?.toISOString(),
          achievements: progress.achievements.map(achievement => ({
            ...achievement,
            unlockedAt: achievement.unlockedAt?.toISOString()
          }))
        }
      };
      
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Error exporting progress:', error);
      throw new Error('Failed to export progress data');
    }
  },

  /**
   * Import progress data from backup
   */
  importProgress: (exportedData: string): UserProgress | null => {
    try {
      const parsed = JSON.parse(exportedData);
      
      if (!parsed.progress) {
        throw new Error('Invalid export format: missing progress data');
      }
      
      const progress = parsed.progress;
      
      // Convert date strings back to Date objects
      const importedProgress: UserProgress = {
        ...progress,
        lastActivityDate: progress.lastActivityDate ? new Date(progress.lastActivityDate) : undefined,
        achievements: progress.achievements.map((achievement: any) => ({
          ...achievement,
          unlockedAt: achievement.unlockedAt ? new Date(achievement.unlockedAt) : undefined
        }))
      };
      
      // Validate imported data
      const validationErrors = gameDebugUtils.validateProgress(importedProgress);
      if (validationErrors.length > 0) {
        console.error('Imported progress validation failed:', validationErrors);
        return null;
      }
      
      return importedProgress;
      
    } catch (error) {
      console.error('Error importing progress:', error);
      return null;
    }
  }
};

// Test utilities for automated testing
export const gameTestUtils = {
  /**
   * Create a test progress state
   */
  createTestProgress: (overrides: Partial<UserProgress> = {}): UserProgress => {
    const defaultAchievements: Achievement[] = [
      { id: 'first-steps', title: 'First Steps', description: 'Test', icon: '🎯', unlocked: false },
      { id: 'completionist', title: 'Completionist', description: 'Test', icon: '🏆', unlocked: false }
    ];

    return {
      currentSection: 'intro',
      completedSections: [],
      completedActivities: [],
      totalScore: 0,
      streakCount: 0,
      achievements: defaultAchievements,
      ...overrides
    };
  },

  /**
   * Simulate localStorage behavior for testing
   */
  mockLocalStorage: () => {
    const storage: { [key: string]: string } = {};
    
    return {
      getItem: (key: string) => storage[key] || null,
      setItem: (key: string, value: string) => { storage[key] = value; },
      removeItem: (key: string) => { delete storage[key]; },
      clear: () => { Object.keys(storage).forEach(key => delete storage[key]); },
      get length() { return Object.keys(storage).length; },
      key: (index: number) => Object.keys(storage)[index] || null,
      _getAll: () => ({ ...storage }) // Helper for testing
    };
  }
};
