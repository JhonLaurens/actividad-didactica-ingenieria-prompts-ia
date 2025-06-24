
import React from 'react';
import { ConceptMapGuideContent } from '../../types';

interface ConceptMapGuideRendererProps {
  content: ConceptMapGuideContent;
}

const ConceptMapGuideRenderer: React.FC<ConceptMapGuideRendererProps> = ({ content }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary-dark mb-3">{content.title || 'Guía para Mapa Conceptual'}</h2>
      <p className="text-neutral-dark mb-4 leading-relaxed">{content.instructions}</p>
      
      {content.keyElementsToInclude && content.keyElementsToInclude.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary-DEFAULT mb-2">Elementos Clave Sugeridos:</h3>
          <ul className="list-disc list-inside space-y-1 text-neutral-dark text-sm columns-2">
            {content.keyElementsToInclude.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ul>
        </div>
      )}

      {content.exampleImageUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-primary-DEFAULT mb-2">Ejemplo Visual (Platzhalter):</h3>
          <img 
            src={content.exampleImageUrl} 
            alt="Ejemplo de Mapa Conceptual" 
            className="rounded-md shadow-md border border-neutral-DEFAULT max-w-full h-auto"
          />
          <p className="text-xs text-neutral-dark mt-1 italic">Nota: Esta es una imagen de ejemplo.</p>
        </div>
      )}
    </div>
  );
};

export default ConceptMapGuideRenderer;
