import React, { useState } from 'react';
import { InfographicContent } from '../../types';

interface InfographicRendererProps {
  content: InfographicContent;
}

const InfographicRenderer: React.FC<InfographicRendererProps> = ({ content }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {content.title && (
        <h3 className="text-xl font-semibold text-primary-dark mb-4">{content.title}</h3>
      )}
      
      <div className="relative bg-neutral-light rounded-lg overflow-hidden">
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-DEFAULT"></div>
          </div>
        )}
        
        {hasError ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="text-4xl mb-4">🖼️</div>
            <h4 className="text-lg font-semibold text-neutral-dark mb-2">
              Infografía no disponible
            </h4>
            <p className="text-neutral-dark text-sm">
              Esta infografía se mostraría aquí con elementos visuales interactivos
              que explicarían conceptos clave de ingeniería de prompts.
            </p>
          </div>
        ) : (
          <img
            src={content.imageUrl}
            alt={content.altText}
            className={`w-full h-auto transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
      
      {content.caption && (
        <p className="text-sm text-neutral-dark mt-3 italic text-center">
          {content.caption}
        </p>
      )}
      
      {content.interactiveElements && (
        <div className="mt-4 p-3 bg-primary-light bg-opacity-10 rounded-lg">
          <div className="flex items-center space-x-2 text-primary-dark">
            <span className="text-lg">✨</span>
            <span className="text-sm font-medium">
              Infografía interactiva - Haz clic en los elementos para explorar
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfographicRenderer;
