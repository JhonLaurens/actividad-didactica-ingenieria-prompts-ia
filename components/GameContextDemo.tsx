import React from 'react';
import { useGameWithUtils } from '../contexts/GameContext';
import { gameDebugUtils } from '../contexts/GameContextUtils';
import StorageErrorNotification from './StorageErrorNotification';

/**
 * Development component for testing and demonstrating the enhanced GameContext
 */
const GameContextDemo: React.FC = () => {
  const {
    state,
    isLoading,
    hasStorageError,
    storageError,
    completionPercentage,
    unlockedAchievements,
    clearStorageError,
    completeActivity,
    completeSection,
    showConfetti
  } = useGameWithUtils();

  const handleExportProgress = () => {
    try {
      const exportData = gameDebugUtils.exportProgress(state.progress);
      
      // Create downloadable file
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prompt-engineering-progress-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log('Progress exported successfully');
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleRunDiagnostics = () => {
    const diagnostics = gameDebugUtils.getStorageDiagnostics();
    console.log('Storage Diagnostics:', diagnostics);
    
    const validationErrors = gameDebugUtils.validateProgress(state.progress);
    console.log('Progress Validation:', validationErrors.length === 0 ? 'VALID' : 'ERRORS', validationErrors);
  };

  const handleTestActivity = () => {
    completeActivity(`test-activity-${Date.now()}`, 25);
    showConfetti();
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <p className="text-gray-600 mt-4">Cargando progreso...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Storage Error Notification */}
      <StorageErrorNotification
        isVisible={hasStorageError}
        onDismiss={clearStorageError}
        error={storageError}
      />
      
      {/* Main Demo Panel */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🎮 GameContext Demo & Diagnostics
        </h2>
        
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Progreso Total</h3>
            <p className="text-2xl font-bold text-blue-600">{completionPercentage}%</p>
            <p className="text-sm text-blue-700">
              {state.progress.completedSections.length}/6 secciones
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">Puntuación</h3>
            <p className="text-2xl font-bold text-green-600">{state.progress.totalScore}</p>
            <p className="text-sm text-green-700">
              Racha: {state.progress.streakCount}
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800">Logros</h3>
            <p className="text-2xl font-bold text-yellow-600">{unlockedAchievements.length}</p>
            <p className="text-sm text-yellow-700">
              de {state.progress.achievements.length} disponibles
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <button
            onClick={handleTestActivity}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            🎯 Test Activity
          </button>
          
          <button
            onClick={() => completeSection(`test-section-${Date.now()}`)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
          >
            ✅ Test Section
          </button>
          
          <button
            onClick={handleExportProgress}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
          >
            📥 Export Data
          </button>
          
          <button
            onClick={handleRunDiagnostics}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
          >
            🔍 Diagnostics
          </button>
        </div>

        {/* Storage Status */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Estado del Almacenamiento</h3>
          <div className="flex items-center space-x-4 text-sm">
            <span className={`px-2 py-1 rounded ${hasStorageError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {hasStorageError ? '❌ Error' : '✅ OK'}
            </span>
            <span className="text-gray-600">
              Última actividad: {state.progress.lastActivityDate?.toLocaleString() || 'Nunca'}
            </span>
          </div>
          {storageError && (
            <p className="text-red-600 text-xs mt-2 font-mono">{storageError}</p>
          )}
        </div>

        {/* Recent Achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-3">🏆 Logros Desbloqueados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {unlockedAchievements.map(achievement => (
                <div key={achievement.id} className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{achievement.icon}</span>
                    <div>
                      <p className="font-medium text-yellow-800">{achievement.title}</p>
                      <p className="text-xs text-yellow-700">{achievement.description}</p>
                      {achievement.unlockedAt && (
                        <p className="text-xs text-yellow-600">
                          {achievement.unlockedAt.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameContextDemo;
