import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const FlappyBird = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const animationFrameId = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 320;
    canvas.height = 480;

    // Game variables
    const game = {
      bird: {
        x: 50,
        y: 300,
        width: 20,
        height: 20,
        velocity: 0,
        gravity: 0.5,
        jump: -8
      },
      pipes: [],
      score: 0,
      gameOver: false,
      gameStarted: false
    };

    gameRef.current = game;

    // Create pipe
    const createPipe = () => {
      const gap = 150;
      const pipeWidth = 50;
      const topHeight = Math.random() * (canvas.height - gap - 100) + 50;
      
      return {
        x: canvas.width,
        topHeight: topHeight,
        bottomY: topHeight + gap,
        bottomHeight: canvas.height - (topHeight + gap),
        width: pipeWidth,
        passed: false
      };
    };

    // Draw bird
    const drawBird = () => {
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(game.bird.x, game.bird.y, game.bird.width, game.bird.height);
      
      // Bird eye
      ctx.fillStyle = '#000';
      ctx.fillRect(game.bird.x + 12, game.bird.y + 5, 3, 3);
      
      // Bird beak
      ctx.fillStyle = '#FF6B35';
      ctx.fillRect(game.bird.x + 20, game.bird.y + 8, 5, 4);
    };

    // Draw pipe
    const drawPipe = (pipe) => {
      ctx.fillStyle = '#4CAF50';
      
      // Top pipe
      ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
      
      // Bottom pipe
      ctx.fillRect(pipe.x, pipe.bottomY, pipe.width, pipe.bottomHeight);
      
      // Pipe caps
      ctx.fillStyle = '#45a049';
      ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, pipe.width + 10, 20);
      ctx.fillRect(pipe.x - 5, pipe.bottomY, pipe.width + 10, 20);
    };

    // Draw background
    const drawBackground = () => {
      // Sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(1, '#98FB98');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(100, 100, 30, 0, Math.PI * 2);
      ctx.arc(120, 100, 40, 0, Math.PI * 2);
      ctx.arc(140, 100, 30, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(300, 150, 25, 0, Math.PI * 2);
      ctx.arc(315, 150, 35, 0, Math.PI * 2);
      ctx.arc(330, 150, 25, 0, Math.PI * 2);
      ctx.fill();
    };

    // Check collision
    const checkCollision = (bird, pipe) => {
      return (
        bird.x < pipe.x + pipe.width &&
        bird.x + bird.width > pipe.x &&
        (bird.y < pipe.topHeight || bird.y + bird.height > pipe.bottomY)
      );
    };

    // Update game
    const update = () => {
      if (!game.gameStarted || game.gameOver) return;

      // Update bird
      game.bird.velocity += game.bird.gravity;
      game.bird.y += game.bird.velocity;

      // Check ground collision
      if (game.bird.y + game.bird.height > canvas.height || game.bird.y < 0) {
        game.gameOver = true;
        setGameOver(true);
        return;
      }

      // Update pipes
      game.pipes.forEach((pipe, index) => {
        pipe.x -= 2;

        // Check collision
        if (checkCollision(game.bird, pipe)) {
          game.gameOver = true;
          setGameOver(true);
          return;
        }

        // Check score
        if (!pipe.passed && pipe.x + pipe.width < game.bird.x) {
          pipe.passed = true;
          game.score++;
          setScore(game.score);
        }

        // Remove off-screen pipes
        if (pipe.x + pipe.width < 0) {
          game.pipes.splice(index, 1);
        }
      });

      // Add new pipes
      if (game.pipes.length === 0 || game.pipes[game.pipes.length - 1].x < canvas.width - 200) {
        game.pipes.push(createPipe());
      }
    };

    // Draw game
    const draw = () => {
      drawBackground();
      
      if (!game.gameStarted) {
        ctx.fillStyle = '#000';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press SPACE to Start!', canvas.width / 2, canvas.height / 2);
        ctx.font = '16px Arial';
        ctx.fillText('Click or press SPACE to flap', canvas.width / 2, canvas.height / 2 + 40);
      } else {
        // Draw pipes
        game.pipes.forEach(drawPipe);
        
        // Draw bird
        drawBird();
        
        // Draw score
        ctx.fillStyle = '#000';
        ctx.font = '24px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${game.score}`, 10, 30);
      }

      if (game.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
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

    // Game loop
    const gameLoop = () => {
      update();
      draw();
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    // Start game loop
    animationFrameId.current = requestAnimationFrame(gameLoop);

    // Event handlers
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (!game.gameStarted) {
          game.gameStarted = true;
          setGameStarted(true);
        } else if (!game.gameOver) {
          game.bird.velocity = game.bird.jump;
        }
      }
      
      if (e.code === 'KeyR' && game.gameOver) {
        // Restart game
        game.bird.y = 300;
        game.bird.velocity = 0;
        game.pipes = [];
        game.score = 0;
        game.gameOver = false;
        game.gameStarted = false;
        setScore(0);
        setGameOver(false);
        setGameStarted(false);
      }
    };

    const handleClick = () => {
      if (!game.gameStarted) {
        game.gameStarted = true;
        setGameStarted(true);
      } else if (!game.gameOver) {
        game.bird.velocity = game.bird.jump;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    canvas.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      canvas.removeEventListener('click', handleClick);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
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
          className="block bg-gradient-to-b from-blue-200 to-green-200"
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
        <p>🎮 Use SPACE or click to flap • Press R to restart</p>
      </div>
    </div>
  );
};

export default FlappyBird;