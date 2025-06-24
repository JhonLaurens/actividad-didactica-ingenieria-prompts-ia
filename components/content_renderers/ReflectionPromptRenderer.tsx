
import React, { useState } from 'react';
import { ReflectionPromptContent } from '../../types';
import { useGame } from '../../contexts/GameContext';

interface ReflectionPromptRendererProps {
  content: ReflectionPromptContent;
}

const ReflectionPromptRenderer: React.FC<ReflectionPromptRendererProps> = ({ content }) => {
  const [userReflection, setUserReflection] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const { dispatch } = useGame();

  const handleSubmit = () => {
    if (userReflection.trim().length > 25) { // Minimum effort check for reflections
      setIsCompleted(true);
      dispatch({ 
        type: 'COMPLETE_ACTIVITY', 
        payload: { activityId: content.id, points: 12 } // 12 points for reflections
      });
    }
  };

  const wordCount = userReflection.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
        <div className="text-5xl">🤔</div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-primary-dark mb-2">{content.title || 'Para tu Reflexión'}</h3>
        <p className="text-neutral-dark mb-4 leading-relaxed">{content.prompt}</p>
        
        {content.pointsToConsider && content.pointsToConsider.length > 0 && (
          <div className="mb-4">
            <h4 className="text-md font-semibold text-primary-DEFAULT mb-2 flex items-center">
              <span className="mr-2">💡</span>
              Puntos a considerar:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-neutral-dark bg-blue-50 p-3 rounded-lg">
              {content.pointsToConsider.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <textarea
              value={userReflection}
              onChange={(e) => setUserReflection(e.target.value)}
              className="w-full p-4 border-2 border-neutral-DEFAULT rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent min-h-[100px] transition-all duration-200"
              placeholder="Escribe tus reflexiones aquí... (mínimo 25 caracteres para obtener puntos)"
              disabled={isCompleted}
            />
            
            {/* Character and word count */}
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className={`${userReflection.length >= 25 ? 'text-green-600' : 'text-neutral-dark'}`}>
                {userReflection.length} caracteres | {wordCount} palabras
              </span>
              {userReflection.length >= 25 && !isCompleted && (
                <span className="text-green-600 font-medium">✓ Listo para enviar</span>
              )}
            </div>
          </div>
          
          {/* Submit button */}
          {!isCompleted && (
            <button
              onClick={handleSubmit}
              disabled={userReflection.trim().length < 25}
              className="bg-primary-DEFAULT text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              Enviar Reflexión
            </button>
          )}
          
          {/* Success message */}
          {isCompleted && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-xl">🎉</span>
                <div>
                  <p className="text-green-800 font-medium">¡Reflexión completada!</p>
                  <p className="text-green-700 text-sm">+12 puntos ganados por esta reflexión</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReflectionPromptRenderer;
