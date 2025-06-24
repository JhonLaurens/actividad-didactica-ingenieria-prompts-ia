import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';

interface TechniqueQuestion {
  id: string;
  prompt: string;
  correctTechnique: string;
  techniques: string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const techniqueQuestions: TechniqueQuestion[] = [
  {
    id: 'q1',
    prompt: 'Traduce el siguiente texto al inglés: "Hola, ¿cómo estás?"',
    correctTechnique: 'Zero-Shot',
    techniques: ['Zero-Shot', 'Few-Shot', 'Chain-of-Thought', 'Self-Consistency'],
    explanation: 'Este es un ejemplo de Zero-Shot ya que se da una instrucción directa sin ejemplos previos.',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    prompt: `Clasifica el sentimiento de estos textos:

Ejemplo 1: "Me encanta este producto" → Positivo
Ejemplo 2: "Terrible servicio al cliente" → Negativo
Ejemplo 3: "El producto está bien" → Neutral

Ahora clasifica: "Estoy muy decepcionado con la compra"`,
    correctTechnique: 'Few-Shot',
    techniques: ['Zero-Shot', 'Few-Shot', 'Chain-of-Thought', 'Self-Consistency'],
    explanation: 'Este prompt usa Few-Shot Learning al proporcionar 3 ejemplos antes de la tarea principal.',
    difficulty: 'medium'
  },
  {
    id: 'q3',
    prompt: `Resuelve este problema paso a paso:

Si Juan tiene 3 manzanas y compra 2 veces la cantidad que ya tiene, luego regala la mitad de todas sus manzanas, ¿cuántas manzanas le quedan?

Piensa paso a paso:
1. Primero, calcula cuántas manzanas compra Juan
2. Luego, suma el total de manzanas que tiene
3. Finalmente, calcula cuántas quedan después de regalar la mitad`,
    correctTechnique: 'Chain-of-Thought',
    techniques: ['Zero-Shot', 'Few-Shot', 'Chain-of-Thought', 'Self-Consistency'],
    explanation: 'Este prompt usa Chain-of-Thought al pedir explícitamente un razonamiento paso a paso.',
    difficulty: 'hard'
  },
  {
    id: 'q4',
    prompt: `Genera tres respuestas diferentes para esta pregunta y luego elige la mejor:

¿Cuál es la capital de Australia?

Respuesta 1: [Tu primera respuesta]
Respuesta 2: [Tu segunda respuesta]  
Respuesta 3: [Tu tercera respuesta]

Mejor respuesta: [Elige la más precisa]`,
    correctTechnique: 'Self-Consistency',
    techniques: ['Zero-Shot', 'Few-Shot', 'Chain-of-Thought', 'Self-Consistency'],
    explanation: 'Este prompt usa Self-Consistency al solicitar múltiples respuestas y seleccionar la mejor.',
    difficulty: 'hard'
  }
];

const TechniqueDetectorGame: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedTechnique, setSelectedTechnique] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const { dispatch } = useGame();

  const question = techniqueQuestions[currentQuestion];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTimerActive && timer > 0 && !showFeedback) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleTimeOut();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timer, showFeedback]);

  const startTimer = () => {
    setTimer(30);
    setIsTimerActive(true);
  };

  const handleTimeOut = () => {
    setIsTimerActive(false);
    setLives(prev => prev - 1);
    setStreak(0);
    setShowFeedback(true);
    
    if (lives <= 1) {
      setGameOver(true);
    }
  };

  const handleTechniqueSelect = (technique: string) => {
    if (showFeedback) return;
    
    setSelectedTechnique(technique);
    setIsTimerActive(false);
    setShowFeedback(true);
    
    const isCorrect = technique === question.correctTechnique;
    
    if (isCorrect) {
      const points = getPoints(question.difficulty, timer);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
    } else {
      setLives(prev => prev - 1);
      setStreak(0);
      
      if (lives <= 1) {
        setGameOver(true);
      }
    }
  };

  const getPoints = (difficulty: string, timeLeft: number): number => {
    const basePoints = { easy: 10, medium: 15, hard: 20 };
    const timeBonus = Math.floor(timeLeft / 5);
    const streakBonus = streak >= 3 ? 5 : 0;
    
    return basePoints[difficulty as keyof typeof basePoints] + timeBonus + streakBonus;
  };

  const nextQuestion = () => {
    if (currentQuestion < techniqueQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedTechnique('');
      setShowFeedback(false);
      startTimer();
    } else {
      // Game completed
      setGameOver(true);
      dispatch({ 
        type: 'COMPLETE_ACTIVITY', 
        payload: { activityId: 'technique-detector-game', points: score } 
      });
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedTechnique('');
    setShowFeedback(false);
    setScore(0);
    setLives(3);
    setStreak(0);
    setGameOver(false);
    setTimer(30);
    setIsTimerActive(false);
    startTimer();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Medio';
      case 'hard': return 'Difícil';
      default: return 'Normal';
    }
  };

  if (gameOver) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-6 rounded-lg shadow-lg text-center"
      >
        <div className="text-6xl mb-4">
          {currentQuestion === techniqueQuestions.length - 1 ? '🎉' : '💫'}
        </div>
        <h3 className="text-2xl font-bold text-primary-dark mb-2">
          {currentQuestion === techniqueQuestions.length - 1 ? '¡Juego Completado!' : 'Juego Terminado'}
        </h3>
        <p className="text-lg text-neutral-dark mb-4">
          Puntuación Final: <span className="font-bold text-primary-DEFAULT">{score} puntos</span>
        </p>
        <p className="text-sm text-neutral-dark mb-6">
          Preguntas respondidas: {currentQuestion + 1}/{techniqueQuestions.length}
        </p>
        <button
          onClick={restartGame}
          className="bg-primary-DEFAULT text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
        >
          Jugar Otra Vez
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-primary-dark">🕵️ Detector de Técnicas</h3>
        <div className="flex items-center space-x-4">
          {/* Timer */}
          <div className={`px-3 py-1 rounded-full font-bold ${
            timer <= 10 ? 'bg-red-500 text-white' : 'bg-neutral-DEFAULT text-neutral-dark'
          }`}>
            ⏱️ {timer}s
          </div>
          
          {/* Lives */}
          <div className="flex items-center space-x-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={`text-lg ${i < lives ? 'text-red-500' : 'text-gray-300'}`}>
                ❤️
              </span>
            ))}
          </div>
          
          {/* Score */}
          <div className="bg-primary-DEFAULT text-white px-3 py-1 rounded-full font-bold">
            {score} pts
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-neutral-dark">
            Pregunta {currentQuestion + 1} de {techniqueQuestions.length}
          </span>
          <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
            {getDifficultyLabel(question.difficulty)}
          </div>
        </div>
        <div className="w-full bg-neutral-DEFAULT rounded-full h-2">
          <div 
            className="bg-primary-DEFAULT h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / techniqueQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Streak Counter */}
      {streak > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-4 text-center"
        >
          <div className="inline-flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
            <span className="mr-1">🔥</span>
            <span className="font-bold">Racha: {streak}</span>
          </div>
        </motion.div>
      )}

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3 text-neutral-dark">
          ¿Qué técnica de prompt engineering se utiliza en este ejemplo?
        </h4>
        <div className="bg-neutral-light p-4 rounded-lg">
          <pre className="whitespace-pre-wrap text-sm text-neutral-darker">
            {question.prompt}
          </pre>
        </div>
      </div>

      {/* Technique Options */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {question.techniques.map((technique) => (
          <motion.button
            key={technique}
            onClick={() => handleTechniqueSelect(technique)}
            disabled={showFeedback}
            className={`
              p-4 rounded-lg border-2 font-medium transition-all duration-200
              ${showFeedback && technique === question.correctTechnique 
                ? 'bg-green-100 border-green-400 text-green-800' 
                : ''}
              ${showFeedback && selectedTechnique === technique && technique !== question.correctTechnique
                ? 'bg-red-100 border-red-400 text-red-800'
                : ''}
              ${!showFeedback 
                ? 'border-neutral-DEFAULT hover:bg-primary-DEFAULT hover:border-primary-DEFAULT hover:text-white'
                : 'cursor-not-allowed'}
            `}
            whileHover={!showFeedback ? { scale: 1.02 } : {}}
            whileTap={!showFeedback ? { scale: 0.98 } : {}}
          >
            {technique}
            {showFeedback && technique === question.correctTechnique && (
              <span className="ml-2">✅</span>
            )}
            {showFeedback && selectedTechnique === technique && technique !== question.correctTechnique && (
              <span className="ml-2">❌</span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-lg mb-6 ${
              selectedTechnique === question.correctTechnique
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <h5 className="font-semibold mb-2">
              {selectedTechnique === question.correctTechnique ? '¡Correcto!' : 'Incorrecto'}
            </h5>
            <p className="text-sm text-neutral-dark">{question.explanation}</p>
            
            {selectedTechnique === question.correctTechnique && (
              <div className="mt-2 text-sm">
                <span className="font-medium">Puntos ganados: </span>
                <span className="text-primary-DEFAULT font-bold">
                  +{getPoints(question.difficulty, timer)}
                </span>
              </div>
            )}
            
            <button
              onClick={nextQuestion}
              className="mt-4 bg-primary-DEFAULT text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              {currentQuestion < techniqueQuestions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Juego'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start Game Button */}
      {!isTimerActive && !showFeedback && currentQuestion === 0 && (
        <div className="text-center">
          <button
            onClick={startTimer}
            className="bg-primary-DEFAULT text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Comenzar Juego
          </button>
        </div>
      )}
    </div>
  );
};

export default TechniqueDetectorGame;
