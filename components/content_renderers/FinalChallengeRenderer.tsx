
import React from 'react';
import { FinalChallengeContent } from '../../types';

interface FinalChallengeRendererProps {
  content: FinalChallengeContent;
}

const FinalChallengeRenderer: React.FC<FinalChallengeRendererProps> = ({ content }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary-dark mb-3">{content.challengeTitle}</h2>
      <p className="text-neutral-dark mb-4 leading-relaxed">{content.description}</p>
      
      <h3 className="text-lg font-semibold text-primary-DEFAULT mb-2">Tus Tareas:</h3>
      <ul className="list-decimal list-inside space-y-2 text-neutral-dark mb-6">
        {content.tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>

      {content.evaluationCriteria && content.evaluationCriteria.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-primary-DEFAULT mb-2">Criterios de Autoevaluación:</h3>
          <ul className="list-disc list-inside space-y-1 text-neutral-dark">
            {content.evaluationCriteria.map((criterion, index) => (
              <li key={index}>{criterion}</li>
            ))}
          </ul>
        </div>
      )}
      <textarea
        className="w-full p-2 mt-6 border border-neutral-DEFAULT rounded-md focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent min-h-[150px]"
        placeholder="Puedes usar este espacio para desarrollar tus respuestas al desafío..."
      />
    </div>
  );
};

export default FinalChallengeRenderer;
