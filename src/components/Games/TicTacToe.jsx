import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('ai'); // 'ai' or 'human'
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  // Winning combinations
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  // Check for winner
  const calculateWinner = (squares) => {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line };
      }
    }
    return squares.every(square => square) ? { winner: 'draw', line: null } : null;
  };

  // AI move using minimax algorithm
  const getBestMove = (squares) => {
    const availableMoves = squares.map((square, index) => square === null ? index : null).filter(val => val !== null);
    
    // Simple AI: try to win, block player, or take center/corners
    for (let move of availableMoves) {
      const testBoard = [...squares];
      testBoard[move] = 'O';
      if (calculateWinner(testBoard)?.winner === 'O') {
        return move;
      }
    }
    
    // Block player from winning
    for (let move of availableMoves) {
      const testBoard = [...squares];
      testBoard[move] = 'X';
      if (calculateWinner(testBoard)?.winner === 'X') {
        return move;
      }
    }
    
    // Take center if available
    if (squares[4] === null) return 4;
    
    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(corner => squares[corner] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Take any available move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  // Handle square click
  const handleClick = (index) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    
    const gameResult = calculateWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      updateScores(gameResult.winner);
    } else {
      setIsXNext(!isXNext);
    }
  };

  // AI move effect
  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !winner) {
      const timer = setTimeout(() => {
        const aiMove = getBestMove(board);
        if (aiMove !== undefined) {
          const newBoard = [...board];
          newBoard[aiMove] = 'O';
          setBoard(newBoard);
          
          const gameResult = calculateWinner(newBoard);
          if (gameResult) {
            setWinner(gameResult);
            updateScores(gameResult.winner);
          } else {
            setIsXNext(true);
          }
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner, gameMode]);

  // Update scores
  const updateScores = (result) => {
    setScores(prev => ({
      ...prev,
      [result === 'draw' ? 'draws' : result]: prev[result === 'draw' ? 'draws' : result] + 1
    }));
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  // Reset scores
  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Game Mode Selector */}
        <div className="mb-4 text-center">
          <div className="flex gap-2 justify-center mb-2">
            <button
              onClick={() => { setGameMode('ai'); resetGame(); }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                gameMode === 'ai' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              vs AI
            </button>
            <button
              onClick={() => { setGameMode('human'); resetGame(); }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                gameMode === 'human' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              2 Players
            </button>
          </div>
        </div>

        {/* Scores */}
        <div className="flex justify-center gap-4 mb-4 text-sm">
          <div className="text-center">
            <div className="font-bold text-blue-500">X: {scores.X}</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-500">Draws: {scores.draws}</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-red-500">O: {scores.O}</div>
          </div>
        </div>

        {/* Game Status */}
        <div className="text-center mb-4">
          {winner ? (
            <div className="text-lg font-bold">
              {winner.winner === 'draw' ? "It's a Draw!" : `${winner.winner} Wins!`}
            </div>
          ) : (
            <div className="text-lg">
              {gameMode === 'ai' && !isXNext ? 'AI is thinking...' : `${isXNext ? 'X' : 'O'}'s turn`}
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 bg-gray-300 dark:bg-gray-600 p-2 rounded-lg">
          {board.map((square, index) => (
            <motion.button
              key={index}
              className={`w-20 h-20 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-3xl font-bold transition-colors ${
                winner?.line?.includes(index) ? 'bg-green-200 dark:bg-green-800' : ''
              } ${square === 'X' ? 'text-blue-500' : 'text-red-500'}`}
              onClick={() => handleClick(index)}
              disabled={square !== null || winner !== null || (gameMode === 'ai' && !isXNext)}
              whileHover={{ scale: square === null && !winner ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {square}
            </motion.button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2 mt-4 justify-center">
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            New Game
          </button>
          <button
            onClick={resetScores}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset Scores
          </button>
        </div>
      </motion.div>
      
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>🎮 Click squares to play • Get three in a row to win!</p>
      </div>
    </div>
  );
};

export default TicTacToe;