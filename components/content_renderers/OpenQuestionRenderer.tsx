
import React, { useState } from 'react';
import { OpenQuestionContent } from '../../types';
import { useGame } from '../../contexts/GameContext';

interface OpenQuestionRendererProps {
  content: OpenQuestionContent;
}

const OpenQuestionRenderer: React.FC<OpenQuestionRendererProps> = ({ content }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showSuggested, setShowSuggested] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { dispatch } = useGame();

  const handleSubmit = () => {
    if (userAnswer.trim().length > 20) { // Minimum effort check
      setIsCompleted(true);
      dispatch({ 
        type: 'COMPLETE_ACTIVITY', 
        payload: { activityId: content.id, points: 10 } 
      });
    }
  };

  const wordCount = userAnswer.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
        <div className="text-5xl">💭</div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-primary-dark mb-3">{content.title || 'Pregunta Abierta'}</h3>
        <p className="text-neutral-dark mb-4 leading-relaxed">{content.question}</p>
        
        <div className="space-y-4">
          <div>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-4 border-2 border-neutral-DEFAULT rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent min-h-32 transition-all duration-200"
              placeholder="Escribe tu respuesta aquí... (mínimo 20 caracteres para obtener puntos)"
              disabled={isCompleted}
            />
            
            {/* Word count and progress */}
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className={`${userAnswer.length >= 20 ? 'text-green-600' : 'text-neutral-dark'}`}>
                {userAnswer.length} caracteres | {wordCount} palabras
              </span>
              {userAnswer.length >= 20 && !isCompleted && (
                <span className="text-green-600 font-medium">✓ Listo para enviar</span>
              )}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-3">
            {!isCompleted && (
              <button
                onClick={handleSubmit}
                disabled={userAnswer.trim().length < 20}
                className="bg-primary-DEFAULT text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              >
                Enviar Respuesta
              </button>
            )}
            
            {content.suggestedAnswer && (
              <button
                onClick={() => setShowSuggested(!showSuggested)}
                className="bg-secondary-DEFAULT text-neutral-dark px-6 py-2 rounded-lg font-medium hover:bg-secondary-dark transition-colors transform hover:scale-105 active:scale-95"
              >
                {showSuggested ? 'Ocultar' : 'Ver'} Respuesta Sugerida
              </button>
            )}
          </div>
          
          {/* Success message */}
          {isCompleted && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-xl">🎉</span>
                <div>
                  <p className="text-green-800 font-medium">¡Respuesta enviada!</p>
                  <p className="text-green-700 text-sm">+10 puntos ganados por completar esta reflexión</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Suggested answer */}
          {showSuggested && content.suggestedAnswer && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <span className="mr-2">💡</span>
                Respuesta Sugerida:
              </h4>
              <p className="text-blue-700 text-sm leading-relaxed">{content.suggestedAnswer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenQuestionRenderer;
