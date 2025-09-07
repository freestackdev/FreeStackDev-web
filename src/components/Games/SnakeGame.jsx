import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;
    
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    // Game variables
    const game = {
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      dx: 0,
      dy: 0,
      score: 0,
      gameOver: false,
      gameStarted: false
    };

    gameRef.current = game;

    // Generate random food position
    const generateFood = () => {
      game.food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };
      
      // Make sure food doesn't spawn on snake
      for (let segment of game.snake) {
        if (segment.x === game.food.x && segment.y === game.food.y) {
          generateFood();
          return;
        }
      }
    };

    // Draw game elements
    const drawGame = () => {
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
      }

      // Draw snake
      game.snake.forEach((segment, index) => {
        if (index === 0) {
          // Snake head
          ctx.fillStyle = '#4CAF50';
          ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 2, gridSize - 4, gridSize - 4);
          
          // Eyes
          ctx.fillStyle = '#fff';
          ctx.fillRect(segment.x * gridSize + 6, segment.y * gridSize + 6, 3, 3);
          ctx.fillRect(segment.x * gridSize + 11, segment.y * gridSize + 6, 3, 3);
        } else {
          // Snake body
          const alpha = 1 - (index * 0.1);
          ctx.fillStyle = `rgba(76, 175, 80, ${Math.max(alpha, 0.3)})`;
          ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
        }
      });

      // Draw food
      ctx.fillStyle = '#FF5722';
      ctx.fillRect(game.food.x * gridSize + 2, game.food.y * gridSize + 2, gridSize - 4, gridSize - 4);
      
      // Food highlight
      ctx.fillStyle = '#FF8A65';
      ctx.fillRect(game.food.x * gridSize + 4, game.food.y * gridSize + 4, gridSize - 8, gridSize - 8);

      // Draw score
      ctx.fillStyle = '#fff';
      ctx.font = '20px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${game.score}`, 10, 30);

      // Draw instructions
      if (!game.gameStarted) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Snake Game', canvas.width / 2, canvas.height / 2 - 60);
        ctx.font = '16px Arial';
        ctx.fillText('Use Arrow Keys or WASD to move', canvas.width / 2, canvas.height / 2 - 20);
        ctx.fillText('Press any arrow key to start!', canvas.width / 2, canvas.height / 2 + 20);
      }

      // Draw game over screen
      if (game.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#fff';
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 40);
        ctx.font = '20px Arial';
        ctx.fillText(`Final Score: ${game.score}`, canvas.width / 2, canvas.height / 2);
        ctx.font = '16px Arial';
        ctx.fillText('Press R to Restart', canvas.width / 2, canvas.height / 2 + 40);
      }
    };

    // Update game state
    const updateGame = () => {
      if (!game.gameStarted || game.gameOver) return;

      const head = { x: game.snake[0].x + game.dx, y: game.snake[0].y + game.dy };

      // Check wall collision
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        game.gameOver = true;
        setGameOver(true);
        return;
      }

      // Check self collision
      for (let segment of game.snake) {
        if (head.x === segment.x && head.y === segment.y) {
          game.gameOver = true;
          setGameOver(true);
          return;
        }
      }

      game.snake.unshift(head);

      // Check food collision
      if (head.x === game.food.x && head.y === game.food.y) {
        game.score++;
        setScore(game.score);
        generateFood();
      } else {
        game.snake.pop();
      }
    };

    // Game loop
    const gameLoop = () => {
      updateGame();
      drawGame();
    };

    // Start game loop
    const gameInterval = setInterval(gameLoop, 150);

    // Event handlers
    const handleKeyPress = (e) => {
      if (!game.gameStarted) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
          game.gameStarted = true;
          setGameStarted(true);
        }
      }

      if (game.gameOver && e.code === 'KeyR') {
        // Restart game
        game.snake = [{ x: 10, y: 10 }];
        game.dx = 0;
        game.dy = 0;
        game.score = 0;
        game.gameOver = false;
        game.gameStarted = false;
        setScore(0);
        setGameOver(false);
        setGameStarted(false);
        generateFood();
        return;
      }

      if (!game.gameStarted || game.gameOver) return;

      // Prevent reverse direction
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          if (game.dy !== 1) {
            game.dx = 0;
            game.dy = -1;
          }
          break;
        case 'ArrowDown':
        case 'KeyS':
          if (game.dy !== -1) {
            game.dx = 0;
            game.dy = 1;
          }
          break;
        case 'ArrowLeft':
        case 'KeyA':
          if (game.dx !== 1) {
            game.dx = -1;
            game.dy = 0;
          }
          break;
        case 'ArrowRight':
        case 'KeyD':
          if (game.dx !== -1) {
            game.dx = 1;
            game.dy = 0;
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(gameInterval);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <canvas
          ref={canvasRef}
          className="block bg-gradient-to-br from-gray-800 to-gray-900"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        
        {/* Game overlay info */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
          Score: {score}
        </div>
        
        {gameOver && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
              <p className="text-lg mb-4">Score: {score}</p>
              <p className="text-sm">Press R to restart</p>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>🎮 Use Arrow Keys or WASD to move • Press R to restart</p>
      </div>
    </div>
  );
};

export default SnakeGame;