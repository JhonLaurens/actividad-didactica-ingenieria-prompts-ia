import React from 'react';
import { InteractiveGameContent } from '../../types';
import PromptConstructorGame from '../games/PromptConstructorGame';
import TechniqueDetectorGame from '../games/TechniqueDetectorGame';

interface InteractiveGameRendererProps {
  content: InteractiveGameContent;
}

const InteractiveGameRenderer: React.FC<InteractiveGameRendererProps> = ({ content }) => {
  const renderGame = () => {
    switch (content.gameType) {
      case 'prompt-constructor':
        return <PromptConstructorGame />;
      case 'technique-detector':
        return <TechniqueDetectorGame />;
      case 'scenario-simulator':
        return <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">🎭</div>
          <h3 className="text-xl font-semibold text-primary-dark mb-2">Simulador de Escenarios</h3>
          <p className="text-neutral-dark">Este juego estará disponible próximamente...</p>
        </div>;
      case 'optimization-lab':
        return <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">🔬</div>
          <h3 className="text-xl font-semibold text-primary-dark mb-2">Laboratorio de Optimización</h3>
          <p className="text-neutral-dark">Este juego estará disponible próximamente...</p>
        </div>;
      default:
        return <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-neutral-dark">Juego no encontrado</p>
        </div>;
    }
  };

  return (
    <div className="space-y-4">
      {content.title && (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-primary-dark">{content.title}</h3>
          {content.description && (
            <p className="text-neutral-dark mt-2">{content.description}</p>
          )}
        </div>
      )}
      
      {content.instructions && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📋 Instrucciones:</h4>
          <p className="text-blue-700 text-sm">{content.instructions}</p>
        </div>
      )}
      
      {renderGame()}
    </div>
  );
};

export default InteractiveGameRenderer;
