import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TypingTest = () => {
  const [words] = useState([
    'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'and', 'runs',
    'through', 'forest', 'with', 'great', 'speed', 'while', 'birds', 'sing', 'in', 'trees',
    'javascript', 'react', 'component', 'function', 'variable', 'array', 'object', 'string',
    'number', 'boolean', 'promise', 'async', 'await', 'callback', 'closure', 'prototype',
    'class', 'method', 'property', 'event', 'listener', 'handler', 'element', 'document',
    'window', 'console', 'error', 'debug', 'test', 'code', 'developer', 'programming',
    'software', 'computer', 'algorithm', 'data', 'structure', 'loop', 'condition',
    'statement', 'expression', 'syntax', 'semantic', 'logic', 'beautiful', 'amazing'
  ]);
  
  const [currentWords, setCurrentWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [errors, setErrors] = useState([]);
  
  const inputRef = useRef(null);
  const testLength = 20; // Number of words in test

  // Initialize test
  const initializeTest = () => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    const testWords = shuffled.slice(0, testLength);
    setCurrentWords(testWords);
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setTotalChars(0);
    setGameActive(false);
    setGameComplete(false);
    setErrors([]);
  };

  // Start test
  const startTest = () => {
    setGameActive(true);
    setStartTime(Date.now());
    inputRef.current?.focus();
  };

  // Handle input change
  const handleInputChange = (e) => {
    if (!gameActive) return;
    
    const value = e.target.value;
    setUserInput(value);
    
    if (!startTime) {
      setStartTime(Date.now());
    }
    
    const currentWord = currentWords[currentWordIndex];
    
    // Check if word is complete
    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      const isCorrect = typedWord === currentWord;
      
      // Update stats
      setTotalChars(prev => prev + currentWord.length);
      if (isCorrect) {
        setCorrectChars(prev => prev + currentWord.length);
      } else {
        setErrors(prev => [...prev, { word: currentWord, typed: typedWord }]);
      }
      
      // Move to next word
      if (currentWordIndex < currentWords.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
        setCurrentCharIndex(0);
        setUserInput('');
      } else {
        // Test complete
        completeTest();
      }
    } else {
      setCurrentCharIndex(value.length);
    }
  };

  // Complete test
  const completeTest = () => {
    const endTime = Date.now();
    setEndTime(endTime);
    setGameActive(false);
    setGameComplete(true);
    
    // Calculate WPM and accuracy
    const timeInMinutes = (endTime - startTime) / 60000;
    const wordsTyped = currentWordIndex + 1;
    const calculatedWpm = Math.round(wordsTyped / timeInMinutes);
    const calculatedAccuracy = Math.round((correctChars / totalChars) * 100) || 100;
    
    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
  };

  // Get character class
  const getCharClass = (wordIndex, charIndex) => {
    if (wordIndex < currentWordIndex) {
      return 'text-green-500'; // Completed words
    } else if (wordIndex === currentWordIndex) {
      if (charIndex < currentCharIndex) {
        const typedChar = userInput[charIndex];
        const correctChar = currentWords[wordIndex][charIndex];
        return typedChar === correctChar ? 'text-green-500' : 'text-red-500 bg-red-100 dark:bg-red-900';
      } else if (charIndex === currentCharIndex) {
        return 'bg-blue-200 dark:bg-blue-800'; // Current character
      }
    }
    return 'text-gray-600 dark:text-gray-400'; // Untyped characters
  };

  // Initialize on mount
  useEffect(() => {
    initializeTest();
  }, []);

  // Update WPM in real-time
  useEffect(() => {
    if (gameActive && startTime) {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const timeInMinutes = (currentTime - startTime) / 60000;
        const wordsTyped = currentWordIndex + (currentCharIndex / 5); // 5 chars = 1 word
        const currentWpm = Math.round(wordsTyped / timeInMinutes) || 0;
        setWpm(currentWpm);
        
        // Update accuracy
        if (totalChars > 0) {
          const currentAccuracy = Math.round((correctChars / totalChars) * 100);
          setAccuracy(currentAccuracy);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [gameActive, startTime, currentWordIndex, currentCharIndex, correctChars, totalChars]);

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto">
      <motion.div
        className="relative w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Stats */}
        <div className="flex justify-center gap-8 mb-6 text-lg font-semibold">
          <div className="text-blue-600 dark:text-blue-400">
            WPM: {wpm}
          </div>
          <div className="text-green-600 dark:text-green-400">
            Accuracy: {accuracy}%
          </div>
          <div className="text-purple-600 dark:text-purple-400">
            Progress: {currentWordIndex}/{testLength}
          </div>
        </div>

        {/* Text Display */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 mb-6 min-h-[240px] flex items-center">
          <div className="text-2xl leading-relaxed font-mono w-full">
            {currentWords.map((word, wordIndex) => (
              <span key={wordIndex} className="mr-4 inline-block">
                {word.split('').map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className={`${getCharClass(wordIndex, charIndex)} transition-colors duration-150`}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="mb-4">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={!gameActive}
            className="w-full px-6 py-4 text-xl border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-violet-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono"
            placeholder={gameActive ? "Start typing..." : "Click 'Start Test' to begin"}
          />
        </div>

        {/* Controls */}
        <div className="text-center">
          {!gameActive && !gameComplete && (
            <button
              onClick={startTest}
              className="px-8 py-4 bg-violet-500 text-white rounded-2xl hover:bg-violet-600 transition-colors font-bold text-lg shadow-lg hover:shadow-xl"
            >
              Start Test
            </button>
          )}
          
          {gameComplete && (
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
                className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-900 p-6 rounded-2xl"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  Test Complete! 🎉
                </h3>
                <div className="grid grid-cols-2 gap-4 text-lg">
                  <div>
                    <span className="font-semibold">WPM:</span> {wpm}
                  </div>
                  <div>
                    <span className="font-semibold">Accuracy:</span> {accuracy}%
                  </div>
                  <div>
                    <span className="font-semibold">Correct Chars:</span> {correctChars}
                  </div>
                  <div>
                    <span className="font-semibold">Total Chars:</span> {totalChars}
                  </div>
                </div>
                
                {errors.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Errors:</h4>
                    <div className="text-sm space-y-1">
                      {errors.slice(0, 5).map((error, index) => (
                        <div key={index} className="text-red-600 dark:text-red-400">
                          Expected: "{error.word}" | Typed: "{error.typed}"
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
              
              <button
                onClick={initializeTest}
                className="px-8 py-4 bg-violet-500 text-white rounded-2xl hover:bg-violet-600 transition-colors font-bold shadow-lg hover:shadow-xl"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </motion.div>
      
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>🎮 Type the words as accurately and quickly as possible</p>
        <p>Press space after each word to continue</p>
      </div>
    </div>
  );
};

export default TypingTest;