import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useGame } from '../../contexts/GameContext';

interface PromptComponent {
  id: string;
  type: 'context' | 'persona' | 'task' | 'format' | 'examples';
  text: string;
  points: number;
  isRequired: boolean;
}

const promptComponents: PromptComponent[] = [
  {
    id: 'persona-expert',
    type: 'persona',
    text: 'Actúa como un experto en programación Python',
    points: 15,
    isRequired: true
  },
  {
    id: 'task-function',
    type: 'task',
    text: 'Genera una función que calcule el factorial de un número',
    points: 20,
    isRequired: true
  },
  {
    id: 'format-docstring',
    type: 'format',
    text: 'Incluye documentación y ejemplos de uso',
    points: 15,
    isRequired: false
  },
  {
    id: 'context-beginner',
    type: 'context',
    text: 'La función será usada por estudiantes principiantes',
    points: 10,
    isRequired: false
  },
  {
    id: 'examples-input',
    type: 'examples',
    text: 'Ejemplo: factorial(5) debe retornar 120',
    points: 10,
    isRequired: false
  }
];

const DraggableComponent: React.FC<{ component: PromptComponent; inBuilder: boolean }> = ({ 
  component, 
  inBuilder 
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'prompt-component',
    item: { component },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const typeColors = {
    persona: 'bg-purple-100 border-purple-300 text-purple-800',
    task: 'bg-blue-100 border-blue-300 text-blue-800',
    format: 'bg-green-100 border-green-300 text-green-800',
    context: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    examples: 'bg-pink-100 border-pink-300 text-pink-800'
  };

  const typeIcons = {
    persona: '👤',
    task: '📋',
    format: '📝',
    context: '🎯',
    examples: '💡'
  };
  return (
    <motion.div
      ref={drag as any}
      className={`
        p-3 rounded-lg border-2 cursor-move transition-all duration-200
        ${typeColors[component.type]}
        ${isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
        ${inBuilder ? 'cursor-grab' : 'cursor-move'}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="flex items-start space-x-2">
        <span className="text-lg">{typeIcons[component.type]}</span>
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase tracking-wide mb-1">
            {component.type}
            {component.isRequired && <span className="text-red-500 ml-1">*</span>}
          </div>
          <div className="text-sm">{component.text}</div>
          <div className="text-xs mt-1 opacity-75">+{component.points} pts</div>
        </div>
      </div>
    </motion.div>
  );
};

const PromptBuilder: React.FC<{ 
  components: PromptComponent[]; 
  onComponentAdd: (component: PromptComponent) => void;
  onComponentRemove: (componentId: string) => void;
}> = ({ components, onComponentAdd, onComponentRemove }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'prompt-component',
    drop: (item: { component: PromptComponent }) => {
      if (!components.find(c => c.id === item.component.id)) {
        onComponentAdd(item.component);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  return (
    <div
      ref={drop as any}
      className={`
        min-h-40 border-2 border-dashed rounded-lg p-4 transition-all duration-200
        ${isOver ? 'border-primary-DEFAULT bg-primary-light bg-opacity-10' : 'border-neutral-DEFAULT'}
        ${components.length === 0 ? 'flex items-center justify-center' : ''}
      `}
    >
      {components.length === 0 ? (
        <div className="text-center text-neutral-dark">
          <div className="text-4xl mb-2">⬇️</div>
          <p>Arrastra componentes aquí para construir tu prompt</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {components.map((component) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative"
              >
                <DraggableComponent component={component} inBuilder={true} />
                <button
                  onClick={() => onComponentRemove(component.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

const PromptConstructorGame: React.FC = () => {
  const [availableComponents] = useState(promptComponents);
  const [builderComponents, setBuilderComponents] = useState<PromptComponent[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [gameCompleted, setGameCompleted] = useState(false);
  const { dispatch } = useGame();

  const handleComponentAdd = (component: PromptComponent) => {
    setBuilderComponents(prev => [...prev, component]);
    setScore(prev => prev + component.points);
  };

  const handleComponentRemove = (componentId: string) => {
    const component = builderComponents.find(c => c.id === componentId);
    if (component) {
      setBuilderComponents(prev => prev.filter(c => c.id !== componentId));
      setScore(prev => prev - component.points);
    }
  };

  const evaluatePrompt = () => {
    const requiredComponents = availableComponents.filter(c => c.isRequired);
    const hasAllRequired = requiredComponents.every(req =>
      builderComponents.some(built => built.id === req.id)
    );

    let feedbackText = '';
    let bonusPoints = 0;

    if (!hasAllRequired) {
      feedbackText = '❌ Tu prompt necesita al menos una persona y una tarea específica para ser efectivo.';
    } else if (builderComponents.length < 3) {
      feedbackText = '⚠️ Buen comienzo, pero tu prompt podría ser más detallado. Considera agregar formato o contexto.';
    } else if (builderComponents.length >= 4) {
      feedbackText = '🎉 ¡Excelente! Has creado un prompt muy completo y efectivo.';
      bonusPoints = 20;
    } else {
      feedbackText = '✅ ¡Bien hecho! Tu prompt tiene una buena estructura.';
      bonusPoints = 10;
    }

    const finalScore = score + bonusPoints;
    setScore(finalScore);
    setFeedback(feedbackText);
    setGameCompleted(true);

    // Update game context
    dispatch({ 
      type: 'COMPLETE_ACTIVITY', 
      payload: { activityId: 'prompt-constructor-game', points: finalScore } 
    });
  };

  const resetGame = () => {
    setBuilderComponents([]);
    setScore(0);
    setFeedback('');
    setGameCompleted(false);
  };

  const generateFinalPrompt = () => {
    return builderComponents
      .sort((a, b) => {
        const order = ['persona', 'context', 'task', 'format', 'examples'];
        return order.indexOf(a.type) - order.indexOf(b.type);
      })
      .map(c => c.text)
      .join('\n');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-primary-dark">🎮 Constructor de Prompts</h3>
          <div className="flex items-center space-x-4">
            <div className="bg-primary-DEFAULT text-white px-3 py-1 rounded-full font-bold">
              {score} pts
            </div>
            {gameCompleted && (
              <motion.button
                onClick={resetGame}
                className="bg-secondary-DEFAULT text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Jugar Otra Vez
              </motion.button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Components Palette */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-neutral-dark">
              Componentes Disponibles
            </h4>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {availableComponents.map((component) => (
                <DraggableComponent 
                  key={component.id} 
                  component={component} 
                  inBuilder={false}
                />
              ))}
            </div>
          </div>

          {/* Prompt Builder */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-neutral-dark">
              Tu Prompt
            </h4>
            <PromptBuilder
              components={builderComponents}
              onComponentAdd={handleComponentAdd}
              onComponentRemove={handleComponentRemove}
            />
            
            {builderComponents.length > 0 && (
              <div className="mt-4">
                <button
                  onClick={evaluatePrompt}
                  disabled={gameCompleted}
                  className="w-full bg-primary-DEFAULT text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {gameCompleted ? 'Evaluado' : 'Evaluar Prompt'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-4 bg-neutral-light rounded-lg"
            >
              <h5 className="font-semibold mb-2">Evaluación:</h5>
              <p className="text-neutral-dark mb-3">{feedback}</p>
              
              {gameCompleted && builderComponents.length > 0 && (
                <div>
                  <h6 className="font-semibold mb-2">Tu prompt final:</h6>
                  <pre className="bg-neutral-darker text-white p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap">
                    {generateFinalPrompt()}
                  </pre>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DndProvider>
  );
};

export default PromptConstructorGame;
