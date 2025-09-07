import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Game2048 = () => {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize empty board
  const initializeBoard = () => {
    const newBoard = Array(4).fill().map(() => Array(4).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    return newBoard;
  };

  // Add random tile (2 or 4)
  const addRandomTile = (board) => {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }
    
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  // Move tiles left
  const moveLeft = (board) => {
    let moved = false;
    let newScore = 0;
    
    for (let i = 0; i < 4; i++) {
      const row = board[i].filter(val => val !== 0);
      
      // Merge tiles
      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          newScore += row[j];
          row[j + 1] = 0;
          if (row[j] === 2048) setGameWon(true);
        }
      }
      
      // Remove zeros and pad with zeros
      const newRow = row.filter(val => val !== 0);
      while (newRow.length < 4) {
        newRow.push(0);
      }
      
      // Check if row changed
      for (let j = 0; j < 4; j++) {
        if (board[i][j] !== newRow[j]) {
          moved = true;
        }
        board[i][j] = newRow[j];
      }
    }
    
    return { moved, score: newScore };
  };

  // Rotate board 90 degrees clockwise
  const rotateBoard = (board) => {
    const newBoard = Array(4).fill().map(() => Array(4).fill(0));
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        newBoard[j][3 - i] = board[i][j];
      }
    }
    return newBoard;
  };

  // Move in any direction
  const move = (direction) => {
    if (gameOver || gameWon) return;
    
    let newBoard = board.map(row => [...row]);
    let rotations = 0;
    
    // Rotate board to make all moves equivalent to left move
    switch (direction) {
      case 'up': rotations = 3; break;
      case 'right': rotations = 2; break;
      case 'down': rotations = 1; break;
      default: rotations = 0;
    }
    
    for (let i = 0; i < rotations; i++) {
      newBoard = rotateBoard(newBoard);
    }
    
    const { moved, score: moveScore } = moveLeft(newBoard);
    
    // Rotate back
    for (let i = 0; i < (4 - rotations) % 4; i++) {
      newBoard = rotateBoard(newBoard);
    }
    
    if (moved) {
      addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(prev => prev + moveScore);
      
      // Check game over
      if (isGameOver(newBoard)) {
        setGameOver(true);
      }
    }
  };

  // Check if game is over
  const isGameOver = (board) => {
    // Check for empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) return false;
      }
    }
    
    // Check for possible merges
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const current = board[i][j];
        if (
          (i < 3 && board[i + 1][j] === current) ||
          (j < 3 && board[i][j + 1] === current)
        ) {
          return false;
        }
      }
    }
    
    return true;
  };

  // Get tile color
  const getTileColor = (value) => {
    const colors = {
      0: 'bg-gray-200 dark:bg-gray-700',
      2: 'bg-yellow-100 text-gray-800',
      4: 'bg-yellow-200 text-gray-800',
      8: 'bg-orange-300 text-white',
      16: 'bg-orange-400 text-white',
      32: 'bg-red-400 text-white',
      64: 'bg-red-500 text-white',
      128: 'bg-yellow-400 text-white',
      256: 'bg-yellow-500 text-white',
      512: 'bg-yellow-600 text-white',
      1024: 'bg-orange-600 text-white',
      2048: 'bg-red-600 text-white'
    };
    return colors[value] || 'bg-purple-600 text-white';
  };

  // Initialize game
  useEffect(() => {
    if (!gameStarted) {
      const newBoard = initializeBoard();
      setBoard(newBoard);
      setGameStarted(true);
    }
  }, [gameStarted]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted) return;
      
      if (e.key === 'r' || e.key === 'R') {
        // Restart game
        const newBoard = initializeBoard();
        setBoard(newBoard);
        setScore(0);
        setGameOver(false);
        setGameWon(false);
        return;
      }
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          move('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          move('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          move('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          move('right');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [board, gameStarted, gameOver, gameWon]);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Score */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Score: {score}
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-gray-300 dark:bg-gray-600 p-2 rounded-lg">
          <div className="grid grid-cols-4 gap-2">
            {board.map((row, i) =>
              row.map((cell, j) => (
                <motion.div
                  key={`${i}-${j}`}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-bold text-lg ${getTileColor(cell)}`}
                  initial={{ scale: cell === 0 ? 1 : 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {cell !== 0 && cell}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Game Over Overlay */}
        {(gameOver || gameWon) && (
          <motion.div
            className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-2">
                {gameWon ? 'You Win!' : 'Game Over!'}
              </h3>
              <p className="text-lg mb-4">Score: {score}</p>
              <p className="text-sm">Press R to restart</p>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>🎮 Use Arrow Keys to move tiles • Press R to restart</p>
        <p>Combine tiles to reach 2048!</p>
      </div>
    </div>
  );
};

export default Game2048;