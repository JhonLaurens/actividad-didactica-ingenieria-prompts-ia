
import React from 'react';
import { ConceptInfoContent } from '../../types';

interface ConceptInfoRendererProps {
  content: ConceptInfoContent;
}

const ConceptInfoRenderer: React.FC<ConceptInfoRendererProps> = ({ content }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {content.title && <h3 className="text-xl font-semibold text-primary-dark mb-3">{content.title}</h3>}
      {typeof content.text === 'string' ? (
        <p className="text-neutral-dark leading-relaxed">{content.text}</p>
      ) : (
        <div className="text-neutral-dark leading-relaxed">{content.text()}</div>
      )}
    </div>
  );
};

export default ConceptInfoRenderer;
