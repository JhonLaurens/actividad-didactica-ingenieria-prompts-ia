
import React, { useState } from 'react';
import { PracticalScenarioContent } from '../../types';

interface PracticalScenarioRendererProps {
  content: PracticalScenarioContent;
}

const PracticalScenarioRenderer: React.FC<PracticalScenarioRendererProps> = ({ content }) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [showExamples, setShowExamples] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-primary-dark mb-2">{content.title}</h3>
      <p className="text-neutral-dark mb-3">{content.scenarioDescription}</p>
      <p className="text-neutral-dark font-medium mb-4">{content.task}</p>
      
      <label htmlFor={`user-prompt-${content.id}`} className="block text-sm font-medium text-neutral-dark mb-1">
        {content.userPromptLabel || 'Tu Prompt:'}
      </label>
      <textarea
        id={`user-prompt-${content.id}`}
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        className="w-full p-2 border border-neutral-DEFAULT rounded-md focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent min-h-[120px]"
        placeholder="Escribe aquí tu prompt para la IA..."
      />

      <div className="mt-4">
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="px-4 py-2 bg-primary-DEFAULT text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          {showExamples ? 'Ocultar' : 'Mostrar'} Ejemplo y Respuesta de IA Simulada
        </button>
      </div>

      {showExamples && (
        <div className="mt-6 space-y-4">
          {content.examplePrompt && (
            <div>
              <h4 className="text-md font-semibold text-primary-dark mb-1">Prompt de Ejemplo:</h4>
              <pre className="bg-neutral-light p-3 rounded-md text-sm text-neutral-darker overflow-x-auto whitespace-pre-wrap">
                {content.examplePrompt}
              </pre>
            </div>
          )}
          {content.exampleAiResponse && (
            <div>
              <h4 className="text-md font-semibold text-primary-dark mb-1">Respuesta Simulada de IA:</h4>
              {typeof content.exampleAiResponse === 'string' ? (
                <pre className="bg-neutral-darker text-white p-3 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                  {content.exampleAiResponse}
                </pre>
              ) : (
                <div className="text-sm">{content.exampleAiResponse()}</div>
              )}
              {content.aiModelUsed && (
                <p className="text-xs text-neutral-dark mt-1 italic">(Simulado usando un modelo como: {content.aiModelUsed})</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PracticalScenarioRenderer;
