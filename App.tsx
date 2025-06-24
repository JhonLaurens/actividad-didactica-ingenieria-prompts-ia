
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import SectionRenderer from './components/SectionRenderer';
import AchievementToast from './components/AchievementToast';
import { activitySectionsData } from './constants';
import { Section } from './types';
import { GameProvider } from './contexts/GameContext';
// import Confetti from 'react-confetti';
import { useGame } from './contexts/GameContext';

const AppContent: React.FC = () => {
  const [currentSectionId, setCurrentSectionId] = useState<string>(activitySectionsData[0]?.id || '');
  const { state, dispatch } = useGame();

  const handleSelectSection = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    dispatch({ type: 'SET_CURRENT_SECTION', payload: sectionId });
    
    // Scroll to top of content area on section change
    const contentArea = document.getElementById('content-area');
    if (contentArea) {
        contentArea.scrollTo(0, 0);
    }
  };
  
  // Effect to set initial section if not already set or if data loads async (though here it's sync)
  useEffect(() => {
    if (!currentSectionId && activitySectionsData.length > 0) {
      setCurrentSectionId(activitySectionsData[0].id);
      dispatch({ type: 'SET_CURRENT_SECTION', payload: activitySectionsData[0].id });
    }
  }, [currentSectionId, dispatch]);

  // Hide confetti after 3 seconds
  useEffect(() => {
    if (state.showConfetti) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SHOW_CONFETTI', payload: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.showConfetti, dispatch]);

  const currentSection = activitySectionsData.find((s: Section) => s.id === currentSectionId);

  return (
    <div className="flex min-h-screen bg-neutral-light font-sans">
      {/* Confetti disabled temporarily due to dependency issues
      {state.showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      */}
      
      <AchievementToast />
      
      <Navigation 
        currentSectionId={currentSectionId} 
        onSelectSection={handleSelectSection} 
      />
      <main id="content-area" className="flex-1 p-8 md:p-10 ml-64 overflow-y-auto">
        {currentSection ? (
          <SectionRenderer section={currentSection} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-neutral-dark">Por favor, selecciona una sección para comenzar.</p>
          </div>
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default App;
