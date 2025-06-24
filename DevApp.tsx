import React, { useState } from 'react';
import { GameProvider } from './contexts/GameContext';
import GameContextTestSuite from './components/GameContextTestSuite';
import GameContextDemo from './components/GameContextDemo';

/**
 * Development version of the app that includes testing components
 * This allows us to test the GameContext improvements without affecting the main app
 */
const DevApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'test' | 'demo'>('test');

  const TabButton: React.FC<{ 
    tab: 'test' | 'demo'; 
    label: string; 
    icon: string 
  }> = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        activeTab === tab
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {icon} {label}
    </button>
  );

  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-gray-900">
                  🔧 GameContext Development Suite
                </h1>
                <div className="hidden sm:block">
                  <span className="text-sm text-gray-500">
                    Testing the refactored GameContext for data loss prevention
                  </span>
                </div>
              </div>
              
              {/* Tab Navigation */}
              <div className="flex space-x-2">
                <TabButton tab="test" label="Test Suite" icon="🧪" />
                <TabButton tab="demo" label="Demo" icon="🎮" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {activeTab === 'test' && <GameContextTestSuite />}
          {activeTab === 'demo' && <GameContextDemo />}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-500">
              <p>
                🎯 This development environment tests the critical improvements made to prevent data loss in GameContext
              </p>
              <p className="mt-1">
                <strong>Key Features Tested:</strong> Data validation, error handling, storage resilience, achievement merging, date serialization
              </p>
            </div>
          </div>
        </footer>
      </div>
    </GameProvider>
  );
};

export default DevApp;
