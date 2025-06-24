
import React, { useState } from 'react';
import { PracticalScenarioContent } from '../../types';
import { useGame } from '../../contexts/GameContext';

interface PracticalScenarioRendererProps {
  content: PracticalScenarioContent;
}

const PracticalScenarioRenderer: React.FC<PracticalScenarioRendererProps> = ({ content }) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [showExamples, setShowExamples] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { dispatch } = useGame();

  const handleSubmit = () => {
    if (userPrompt.trim().length > 30) { // Minimum effort check for prompts
      setIsCompleted(true);
      dispatch({ 
        type: 'COMPLETE_ACTIVITY', 
        payload: { activityId: content.id, points: 15 } // 15 points for practical scenarios
      });
    }
  };

  const wordCount = userPrompt.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
        <div className="text-5xl">🎯</div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-primary-dark mb-2">{content.title}</h3>
        <p className="text-neutral-dark mb-3">{content.scenarioDescription}</p>
        <p className="text-neutral-dark font-medium mb-4">{content.task}</p>
        
        <div className="space-y-4">
          <div>
            <label htmlFor={`user-prompt-${content.id}`} className="block text-sm font-medium text-neutral-dark mb-1">
              {content.userPromptLabel || 'Tu Prompt:'}
            </label>
            <textarea
              id={`user-prompt-${content.id}`}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="w-full p-4 border-2 border-neutral-DEFAULT rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent min-h-[120px] transition-all duration-200"
              placeholder="Escribe aquí tu prompt para la IA... (mínimo 30 caracteres para obtener puntos)"
              disabled={isCompleted}
            />
            
            {/* Character and word count */}
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className={`${userPrompt.length >= 30 ? 'text-green-600' : 'text-neutral-dark'}`}>
                {userPrompt.length} caracteres | {wordCount} palabras
              </span>
              {userPrompt.length >= 30 && !isCompleted && (
                <span className="text-green-600 font-medium">✓ Listo para enviar</span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3">
            {!isCompleted && (
              <button
                onClick={handleSubmit}
                disabled={userPrompt.trim().length < 30}
                className="bg-primary-DEFAULT text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              >
                Validar Respuesta
              </button>
            )}
            
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="bg-secondary-DEFAULT text-neutral-dark px-6 py-2 rounded-lg font-medium hover:bg-secondary-dark transition-colors transform hover:scale-105 active:scale-95"
            >
              {showExamples ? 'Ocultar' : 'Mostrar'} Ejemplo y Respuesta de IA Simulada
            </button>
          </div>

          {/* Success message */}
          {isCompleted && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-xl">🎉</span>
                <div>
                  <p className="text-green-800 font-medium">¡Prompt validado exitosamente!</p>
                  <p className="text-green-700 text-sm">+15 puntos ganados por completar este escenario práctico</p>
                </div>
              </div>
            </div>
          )}

          {/* Examples section */}
          {showExamples && (
            <div className="mt-6 space-y-4 bg-blue-50 border border-blue-200 p-4 rounded-lg">
              {content.examplePrompt && (
                <div>
                  <h4 className="text-md font-semibold text-blue-800 mb-2 flex items-center">
                    <span className="mr-2">💡</span>
                    Prompt de Ejemplo:
                  </h4>
                  <pre className="bg-white border p-3 rounded-md text-sm text-neutral-darker overflow-x-auto whitespace-pre-wrap">
                    {content.examplePrompt}
                  </pre>
                </div>
              )}
              {content.exampleAiResponse && (
                <div>
                  <h4 className="text-md font-semibold text-blue-800 mb-2 flex items-center">
                    <span className="mr-2">🤖</span>
                    Respuesta Simulada de IA:
                  </h4>
                  {typeof content.exampleAiResponse === 'string' ? (
                    <pre className="bg-neutral-darker text-white p-3 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                      {content.exampleAiResponse}
                    </pre>
                  ) : (
                    <div className="text-sm">{content.exampleAiResponse()}</div>
                  )}
                  {content.aiModelUsed && (
                    <p className="text-xs text-blue-600 mt-2 italic">
                      <span className="mr-1">ℹ️</span>
                      Simulado usando un modelo como: {content.aiModelUsed}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticalScenarioRenderer;
