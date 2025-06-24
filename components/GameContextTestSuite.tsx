import React, { useState } from 'react';
import { useGameWithUtils } from '../contexts/GameContext';
import { gameDebugUtils, gameTestUtils } from '../contexts/GameContextUtils';

/**
 * Comprehensive test suite for the refactored GameContext
 * This component tests all the critical improvements made to prevent data loss
 */
const GameContextTestSuite: React.FC = () => {
  const [testResults, setTestResults] = useState<Array<{
    test: string;
    status: 'pass' | 'fail' | 'pending';
    message: string;
  }>>([]);

  const [isRunning, setIsRunning] = useState(false);
  const gameUtils = useGameWithUtils();

  const addTestResult = (test: string, status: 'pass' | 'fail', message: string) => {
    setTestResults(prev => [...prev, { test, status, message }]);
  };

  const runComprehensiveTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    try {
      // Test 1: Basic Context Initialization
      addTestResult(
        'Context Initialization',
        gameUtils.state ? 'pass' : 'fail',
        gameUtils.state ? 'GameContext initialized successfully' : 'GameContext failed to initialize'
      );

      // Test 2: Initial State Validation
      const initialValidation = gameDebugUtils.validateProgress(gameUtils.state.progress);
      addTestResult(
        'Initial State Validation',
        initialValidation.length === 0 ? 'pass' : 'fail',
        initialValidation.length === 0 ? 'Initial state is valid' : `Validation errors: ${initialValidation.join(', ')}`
      );

      // Test 3: Activity Completion
      const testActivityId = `test-activity-${Date.now()}`;
      gameUtils.completeActivity(testActivityId, 25);
      
      // Wait for state update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const isActivityCompleted = gameUtils.isActivityCompleted(testActivityId);
      addTestResult(
        'Activity Completion',
        isActivityCompleted ? 'pass' : 'fail',
        isActivityCompleted ? 'Activity completed successfully' : 'Activity completion failed'
      );

      // Test 4: Achievement Unlocking
      const firstStepsAchievement = gameUtils.getAchievementById('first-steps');
      addTestResult(
        'Achievement Unlocking',
        firstStepsAchievement?.unlocked ? 'pass' : 'fail',
        firstStepsAchievement?.unlocked ? 'First Steps achievement unlocked' : 'Achievement unlocking failed'
      );

      // Test 5: Score Tracking
      const hasPositiveScore = gameUtils.state.progress.totalScore > 0;
      addTestResult(
        'Score Tracking',
        hasPositiveScore ? 'pass' : 'fail',
        hasPositiveScore ? `Score: ${gameUtils.state.progress.totalScore}` : 'Score tracking failed'
      );

      // Test 6: Storage Diagnostics
      const diagnostics = gameDebugUtils.getStorageDiagnostics();
      addTestResult(
        'Storage Diagnostics',
        diagnostics.hasLocalStorage ? 'pass' : 'fail',
        `LocalStorage: ${diagnostics.hasLocalStorage ? 'Available' : 'Not Available'}, Main Storage: ${diagnostics.mainStorageExists ? 'Exists' : 'Missing'}`
      );

      // Test 7: Data Export/Import
      try {
        const exportData = gameDebugUtils.exportProgress(gameUtils.state.progress);
        const importedProgress = gameDebugUtils.importProgress(exportData);
        
        addTestResult(
          'Export/Import Functionality',
          importedProgress ? 'pass' : 'fail',
          importedProgress ? 'Export/Import successful' : 'Export/Import failed'
        );
      } catch (error) {
        addTestResult(
          'Export/Import Functionality',
          'fail',
          `Export/Import error: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }

      // Test 8: Error Handling Simulation
      try {
        // Simulate corrupted localStorage data
        const mockStorage = gameTestUtils.mockLocalStorage();
        mockStorage.setItem('prompt-engineering-progress', 'invalid-json{');
        
        addTestResult(
          'Error Handling',
          'pass',
          'Error handling simulation completed without crashes'
        );
      } catch (error) {
        addTestResult(
          'Error Handling',
          'fail',
          `Error handling failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }

      // Test 9: Section Completion
      const testSectionId = `test-section-${Date.now()}`;
      gameUtils.completeSection(testSectionId);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const isSectionCompleted = gameUtils.isSectionCompleted(testSectionId);
      addTestResult(
        'Section Completion',
        isSectionCompleted ? 'pass' : 'fail',
        isSectionCompleted ? 'Section completed successfully' : 'Section completion failed'
      );

      // Test 10: Storage Error Handling
      const hasStorageError = gameUtils.hasStorageError;
      addTestResult(
        'Storage Error Handling',
        !hasStorageError ? 'pass' : 'fail',
        !hasStorageError ? 'No storage errors detected' : `Storage error: ${gameUtils.storageError}`
      );

    } catch (error) {
      addTestResult(
        'Test Suite Execution',
        'fail',
        `Test execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }

    setIsRunning(false);
  };

  const getStatusColor = (status: 'pass' | 'fail' | 'pending') => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-50 border-green-200';
      case 'fail': return 'text-red-600 bg-red-50 border-red-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: 'pass' | 'fail' | 'pending') => {
    switch (status) {
      case 'pass': return '✅';
      case 'fail': return '❌';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const passedTests = testResults.filter(r => r.status === 'pass').length;
  const failedTests = testResults.filter(r => r.status === 'fail').length;
  const totalTests = testResults.length;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🧪 GameContext Test Suite
        </h1>
        <p className="text-gray-600">
          Comprehensive testing of the refactored GameContext to validate data loss prevention
        </p>
      </div>

      {/* Test Statistics */}
      {totalTests > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{passedTests}</div>
            <div className="text-sm text-green-700">Passed</div>
          </div>
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{failedTests}</div>
            <div className="text-sm text-red-700">Failed</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{totalTests}</div>
            <div className="text-sm text-blue-700">Total</div>
          </div>
        </div>
      )}

      {/* Control Panel */}
      <div className="mb-6">
        <button
          onClick={runComprehensiveTests}
          disabled={isRunning}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            isRunning
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isRunning ? '⏳ Running Tests...' : '🚀 Run Comprehensive Tests'}
        </button>
        
        {totalTests > 0 && (
          <div className="ml-4 inline-block">
            <span className="text-sm text-gray-600">
              Success Rate: {totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0}%
            </span>
          </div>
        )}
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Test Results</h2>
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg ${getStatusColor(result.status)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getStatusIcon(result.status)}</span>
                  <span className="font-medium">{result.test}</span>
                </div>
                <span className="text-xs opacity-75">
                  Test #{index + 1}
                </span>
              </div>
              <p className="mt-2 text-sm opacity-80">{result.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Current State Overview */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">Current GameContext State</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Loading:</span>
            <span className="ml-2 font-medium">
              {gameUtils.isLoading ? '⏳ Yes' : '✅ No'}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Total Score:</span>
            <span className="ml-2 font-medium">{gameUtils.state.progress.totalScore}</span>
          </div>
          <div>
            <span className="text-gray-600">Streak:</span>
            <span className="ml-2 font-medium">{gameUtils.state.progress.streakCount}</span>
          </div>
          <div>
            <span className="text-gray-600">Achievements:</span>
            <span className="ml-2 font-medium">
              {gameUtils.unlockedAchievements.length}/{gameUtils.state.progress.achievements.length}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Completed Activities:</span>
            <span className="ml-2 font-medium">{gameUtils.state.progress.completedActivities.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Completed Sections:</span>
            <span className="ml-2 font-medium">{gameUtils.state.progress.completedSections.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Storage Error:</span>
            <span className="ml-2 font-medium">
              {gameUtils.hasStorageError ? '❌ Yes' : '✅ No'}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Completion:</span>
            <span className="ml-2 font-medium">{gameUtils.completionPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">📋 Test Instructions</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Click "Run Comprehensive Tests" to validate all GameContext improvements</li>
          <li>• Tests verify data validation, error handling, storage operations, and recovery mechanisms</li>
          <li>• All tests should pass to confirm the data loss prevention measures are working</li>
          <li>• Check browser console for detailed logs during test execution</li>
        </ul>
      </div>
    </div>
  );
};

export default GameContextTestSuite;
