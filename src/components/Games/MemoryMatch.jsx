import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Card symbols
  const symbols = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎪', '🎸'];

  // Initialize game
  const initializeGame = () => {
    const gameCards = [...symbols, ...symbols]
      .map((symbol, index) => ({ id: index, symbol, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
    setGameStarted(true);
  };

  // Handle card click
  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (matchedCards.includes(cardId)) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstCard, secondCard] = newFlippedCards;
      const firstCardData = cards.find(card => card.id === firstCard);
      const secondCardData = cards.find(card => card.id === secondCard);

      if (firstCardData.symbol === secondCardData.symbol) {
        // Match found
        setTimeout(() => {
          setMatchedCards(prev => [...prev, firstCard, secondCard]);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Check for game win
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matchedCards, cards]);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
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
            <div className="text-blue-600 dark:text-blue-400">
              Moves: {moves}
            </div>
            <div className="text-green-600 dark:text-green-400">
              Pairs: {matchedCards.length / 2}/{symbols.length}
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={`relative w-16 h-16 cursor-pointer ${
                matchedCards.includes(card.id) ? 'cursor-default' : ''
              }`}
              onClick={() => handleCardClick(card.id)}
              whileHover={{ scale: matchedCards.includes(card.id) ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 rounded-lg"
                animate={{
                  rotateY: flippedCards.includes(card.id) || matchedCards.includes(card.id) ? 180 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Back */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  ?
                </div>
                
                {/* Card Front */}
                <div
                  className={`absolute inset-0 rounded-lg flex items-center justify-center text-2xl shadow-lg ${
                    matchedCards.includes(card.id) 
                      ? 'bg-green-200 dark:bg-green-800' 
                      : 'bg-white dark:bg-gray-700'
                  }`}
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  {card.symbol}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Game Won Overlay */}
        {gameWon && (
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
                <h3 className="text-2xl font-bold mb-2">🎉 Congratulations!</h3>
                <p className="text-lg mb-2">You won in {moves} moves!</p>
                <button
                  onClick={initializeGame}
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Play Again
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* New Game Button */}
        <div className="text-center mt-4">
          <button
            onClick={initializeGame}
            className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
          >
            New Game
          </button>
        </div>
      </motion.div>
      
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>🎮 Click cards to flip them • Find matching pairs!</p>
        <p>Try to complete the game in minimum moves</p>
      </div>
    </div>
  );
};

export default MemoryMatch;