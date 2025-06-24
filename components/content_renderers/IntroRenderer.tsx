
import React from 'react';
import { IntroContent } from '../../types';

interface IntroRendererProps {
  content: IntroContent;
}

const IntroRenderer: React.FC<IntroRendererProps> = ({ content }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-primary-dark mb-4">{content.welcomeTitle}</h2>
      <p className="text-neutral-dark text-lg mb-6">{content.description}</p>
      <h3 className="text-xl font-semibold text-primary-DEFAULT mb-3">Objetivos de Aprendizaje:</h3>
      <ul className="list-disc list-inside space-y-2 text-neutral-dark">
        {content.learningObjectives.map((objective, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary-DEFAULT mr-2">&#10003;</span> {/* Check mark */}
            {objective}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IntroRenderer;
