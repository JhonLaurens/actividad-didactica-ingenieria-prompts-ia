
import React, { useState } from 'react';
import { FinalChallengeContent } from '../../types';
import { useGame } from '../../contexts/GameContext';

interface FinalChallengeRendererProps {
  content: FinalChallengeContent;
}

const FinalChallengeRenderer: React.FC<FinalChallengeRendererProps> = ({ content }) => {
  const [userResponse, setUserResponse] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const { dispatch } = useGame();

  const handleSubmit = () => {
    if (userResponse.trim().length > 50) { // Higher minimum for final challenge
      setIsCompleted(true);
      dispatch({ 
        type: 'COMPLETE_ACTIVITY', 
        payload: { activityId: content.id, points: 25 } // 25 points for final challenge
      });
    }
  };

  const wordCount = userResponse.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="bg-gradient-to-br from-primary-light to-secondary-light p-6 rounded-lg shadow-lg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className="text-6xl">🏆</div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-3xl">🎯</span>
          <h2 className="text-2xl font-bold text-primary-dark">{content.challengeTitle}</h2>
        </div>
        <p className="text-neutral-dark mb-4 leading-relaxed">{content.description}</p>
        
        <div className="bg-white bg-opacity-90 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-primary-DEFAULT mb-2 flex items-center">
            <span className="mr-2">📋</span>
            Tus Tareas:
          </h3>
          <ul className="list-decimal list-inside space-y-2 text-neutral-dark">
            {content.tasks.map((task, index) => (
              <li key={index} className="pl-2">{task}</li>
            ))}
          </ul>
        </div>

        {content.evaluationCriteria && content.evaluationCriteria.length > 0 && (
          <div className="bg-white bg-opacity-90 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-primary-DEFAULT mb-2 flex items-center">
              <span className="mr-2">✅</span>
              Criterios de Autoevaluación:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-dark">
              {content.evaluationCriteria.map((criterion, index) => (
                <li key={index} className="pl-2">{criterion}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              className="w-full p-4 border-2 border-white rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-primary-DEFAULT min-h-[150px] transition-all duration-200 bg-white bg-opacity-95"
              placeholder="Desarrolla aquí tus respuestas al desafío final... (mínimo 50 caracteres para obtener puntos)"
              disabled={isCompleted}
            />
            
            {/* Character and word count */}
            <div className="flex justify-between items-center mt-2 text-sm bg-white bg-opacity-70 p-2 rounded">
              <span className={`${userResponse.length >= 50 ? 'text-green-600 font-medium' : 'text-neutral-dark'}`}>
                {userResponse.length} caracteres | {wordCount} palabras
              </span>
              {userResponse.length >= 50 && !isCompleted && (
                <span className="text-green-600 font-bold">✓ ¡Listo para completar el desafío!</span>
              )}
            </div>
          </div>
          
          {/* Submit button */}
          {!isCompleted && (
            <button
              onClick={handleSubmit}
              disabled={userResponse.trim().length < 50}
              className="bg-primary-dark text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-primary-darker transition-colors disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg"
            >
              🎯 Completar Desafío Final
            </button>
          )}
          
          {/* Success message */}
          {isCompleted && (
            <div className="bg-green-50 border-2 border-green-300 p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <span className="text-green-600 text-3xl">🏆</span>
                <div>
                  <p className="text-green-800 font-bold text-lg">¡Desafío Final Completado!</p>
                  <p className="text-green-700">+25 puntos ganados por completar el desafío final</p>
                  <p className="text-green-600 text-sm mt-1">¡Felicitaciones por terminar toda la actividad didáctica!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalChallengeRenderer;
