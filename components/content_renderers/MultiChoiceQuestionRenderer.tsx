import React, { useState } from 'react';
import { MultiChoiceQuestionContent, MultiChoiceQuestionOption } from '../../types';
import { CheckCircleIcon, XCircleIcon } from '../../constants';
import { useGame } from '../../contexts/GameContext';

interface MultiChoiceQuestionRendererProps {
  content: MultiChoiceQuestionContent;
}

const MultiChoiceQuestionRenderer: React.FC<MultiChoiceQuestionRendererProps> = ({ content }) => {
  const [selectedOption, setSelectedOption] = useState<MultiChoiceQuestionOption | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { dispatch } = useGame();

  const handleOptionClick = (option: MultiChoiceQuestionOption) => {
    if (showFeedback) return;
    
    setSelectedOption(option);
    setShowFeedback(true);
    
    // Award points for correct answers
    if (option.isCorrect) {
      dispatch({ 
        type: 'COMPLETE_ACTIVITY', 
        payload: { activityId: content.id, points: 15 } 
      });
    }
  };

  const resetQuestion = () => {
    setSelectedOption(null);
    setShowFeedback(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="text-6xl">❓</div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-primary-dark">
            {content.title || 'Pregunta de Opción Múltiple'}
          </h3>
          {showFeedback && (
            <button
              onClick={resetQuestion}
              className="text-sm bg-neutral-DEFAULT hover:bg-neutral-dark text-neutral-darker px-3 py-1 rounded-full transition-colors"
            >
              Reintentar
            </button>
          )}
        </div>
        
        <p className="text-neutral-dark mb-4">{content.question}</p>
        
        <div className="space-y-3">
          {content.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={showFeedback}
              className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 flex items-center space-x-3 transform hover:scale-[1.02]
                ${showFeedback && option.isCorrect ? 'bg-green-100 border-green-400 text-green-700 shadow-lg' : ''}
                ${showFeedback && selectedOption === option && !option.isCorrect ? 'bg-red-100 border-red-400 text-red-700 shadow-lg' : ''}
                ${!showFeedback ? 'border-neutral-DEFAULT hover:bg-primary-DEFAULT hover:border-primary-DEFAULT hover:text-white hover:shadow-md' : 'cursor-not-allowed'}
                ${!showFeedback && 'active:scale-95'}
              `}
            >
              <div className="flex-shrink-0">
                {showFeedback && option.isCorrect && (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  </div>
                )}
                {showFeedback && selectedOption === option && !option.isCorrect && (
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <XCircleIcon className="h-5 w-5 text-white" />
                  </div>
                )}
                {!showFeedback && (
                  <div className="w-8 h-8 border-2 border-current rounded-full flex items-center justify-center font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                )}
              </div>
              <span className={`font-medium ${showFeedback && option.isCorrect ? 'font-bold' : ''}`}>
                {option.text}
              </span>
            </button>
          ))}
        </div>
        
        {showFeedback && content.explanation && (
          <div className={`mt-6 p-4 rounded-lg border-l-4 ${
            selectedOption?.isCorrect 
              ? 'bg-green-50 border-green-400 text-green-800' 
              : 'bg-red-50 border-red-400 text-red-800'
          }`}>
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0 mt-1">
                {selectedOption?.isCorrect ? '💡' : '📚'}
              </div>
              <div>
                <strong className="block mb-1">
                  {selectedOption?.isCorrect ? '¡Excelente!' : 'Aprende más:'}
                </strong>
                <p className="text-sm">{content.explanation}</p>
                {selectedOption?.isCorrect && (
                  <div className="mt-2 text-sm font-medium">
                    🎉 +15 puntos ganados
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiChoiceQuestionRenderer;