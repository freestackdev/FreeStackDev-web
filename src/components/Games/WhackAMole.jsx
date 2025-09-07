import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const WhackAMole = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const intervalRef = useRef(null);
  const moleTimeoutRef = useRef(null);

  // Start game
  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameActive(true);
    setGameOver(false);
    setMoles(Array(9).fill(false));
    spawnMole();
  };

  // Spawn random mole
  const spawnMole = () => {
    if (!gameActive) return;
    
    const randomHole = Math.floor(Math.random() * 9);
    const newMoles = Array(9).fill(false);
    newMoles[randomHole] = true;
    setMoles(newMoles);
    
    // Hide mole after random time (800-2000ms)
    const hideTime = Math.random() * 1200 + 800;
    moleTimeoutRef.current = setTimeout(() => {
      setMoles(Array(9).fill(false));
      
      // Spawn next mole after short delay
      setTimeout(() => {
        if (gameActive) spawnMole();
      }, Math.random() * 500 + 200);
    }, hideTime);
  };

  // Hit mole
  const hitMole = (index) => {
    if (!moles[index] || !gameActive) return;
    
    setScore(prev => prev + 10);
    const newMoles = [...moles];
    newMoles[index] = false;
    setMoles(newMoles);
    
    // Clear timeout and spawn new mole
    if (moleTimeoutRef.current) {
      clearTimeout(moleTimeoutRef.current);
    }
    
    setTimeout(() => {
      if (gameActive) spawnMole();
    }, 300);
  };

  // Game timer
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      intervalRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      // Game over
      setGameActive(false);
      setGameOver(true);
      setMoles(Array(9).fill(false));
      
      // Update high score
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('whackAMoleHighScore', score.toString());
      }
      
      if (moleTimeoutRef.current) {
        clearTimeout(moleTimeoutRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [gameActive, timeLeft, score, highScore]);

  // Load high score on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('whackAMoleHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (moleTimeoutRef.current) clearTimeout(moleTimeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Game Stats */}
        <div className="text-center mb-4">
          <div className="flex justify-center gap-6 text-lg font-semibold">
            <div className="text-red-600 dark:text-red-400">
              Score: {score}
            </div>
            <div className="text-blue-600 dark:text-blue-400">
              Time: {timeLeft}s
            </div>
            <div className="text-yellow-600 dark:text-yellow-400">
              Best: {highScore}
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-4 p-6 bg-green-200 dark:bg-green-800 rounded-2xl">
          {moles.map((hasMole, index) => (
            <motion.div
              key={index}
              className="relative w-20 h-20 bg-green-800 dark:bg-green-900 rounded-full cursor-pointer overflow-hidden border-4 border-green-900 dark:border-green-700"
              onClick={() => hitMole(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Hole */}
              <div className="absolute inset-2 bg-black rounded-full" />
              
              {/* Mole */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-2xl cursor-pointer"
                initial={{ y: 60 }}
                animate={{ y: hasMole ? 0 : 60 }}
                transition={{ duration: 0.2, type: 'spring' }}
              >
                🐹
              </motion.div>
              
              {/* Hit effect */}
              {hasMole && (
                <motion.div
                  className="absolute inset-0 bg-yellow-400 rounded-full opacity-0"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Start/Game Over Screen */}
        {(!gameActive && !gameOver) && (
          <div className="absolute inset-0 bg-black/70 rounded-2xl flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Whack-a-Mole!</h3>
              <p className="mb-4">Hit the moles as they pop up!</p>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
              >
                Start Game
              </button>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <motion.div
            className="absolute inset-0 bg-black/70 rounded-2xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <h3 className="text-2xl font-bold mb-2">Time's Up!</h3>
                <p className="text-lg mb-2">Final Score: {score}</p>
                {score === highScore && score > 0 && (
                  <p className="text-yellow-400 mb-2">🎉 New High Score!</p>
                )}
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
                >
                  Play Again
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>🎮 Click on moles when they appear • Score as many points as possible!</p>
        <p>You have 60 seconds - good luck!</p>
      </div>
    </div>
  );
};

export default WhackAMole;