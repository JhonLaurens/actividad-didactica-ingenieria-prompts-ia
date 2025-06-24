
import React from 'react';
import { ReflectionPromptContent } from '../../types';

interface ReflectionPromptRendererProps {
  content: ReflectionPromptContent;
}

const ReflectionPromptRenderer: React.FC<ReflectionPromptRendererProps> = ({ content }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-primary-dark mb-2">{content.title || 'Para tu Reflexión'}</h3>
      <p className="text-neutral-dark mb-4 leading-relaxed">{content.prompt}</p>
      {content.pointsToConsider && content.pointsToConsider.length > 0 && (
        <div>
          <h4 className="text-md font-semibold text-primary-DEFAULT mb-2">Puntos a considerar:</h4>
          <ul className="list-disc list-inside space-y-1 text-neutral-dark">
            {content.pointsToConsider.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
       <textarea
        className="w-full p-2 mt-4 border border-neutral-DEFAULT rounded-md focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent min-h-[100px]"
        placeholder="Escribe tus reflexiones aquí..."
      />
    </div>
  );
};

export default ReflectionPromptRenderer;
