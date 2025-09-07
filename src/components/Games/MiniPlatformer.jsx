import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MiniPlatformer = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const animationFrameId = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 400;

    // Game variables
    const game = {
      player: {
        x: 50,
        y: 300,
        width: 20,
        height: 30,
        velocityX: 0,
        velocityY: 0,
        speed: 5,
        jumpPower: 12,
        onGround: false,
        color: '#4CAF50'
      },
      platforms: [
        { x: 0, y: 350, width: 200, height: 50 },
        { x: 250, y: 300, width: 100, height: 20 },
        { x: 400, y: 250, width: 100, height: 20 },
        { x: 550, y: 200, width: 100, height: 20 },
        { x: 700, y: 150, width: 100, height: 20 },
        { x: 0, y: 400, width: 800, height: 50 } // Ground
      ],
      coins: [
        { x: 280, y: 270, width: 15, height: 15, collected: false },
        { x: 430, y: 220, width: 15, height: 15, collected: false },
        { x: 580, y: 170, width: 15, height: 15, collected: false },
        { x: 730, y: 120, width: 15, height: 15, collected: false }
      ],
      flag: { x: 750, y: 100, width: 20, height: 50 },
      gravity: 0.5,
      keys: {},
      gameStarted: false,
      gameWon: false,
      gameOver: false
    };

    gameRef.current = game;

    // Draw player
    const drawPlayer = () => {
      ctx.fillStyle = game.player.color;
      ctx.fillRect(game.player.x, game.player.y, game.player.width, game.player.height);
      
      // Simple face
      ctx.fillStyle = '#000';
      ctx.fillRect(game.player.x + 5, game.player.y + 5, 2, 2); // Eye
      ctx.fillRect(game.player.x + 13, game.player.y + 5, 2, 2); // Eye
      ctx.fillRect(game.player.x + 7, game.player.y + 12, 6, 2); // Mouth
    };

    // Draw platforms
    const drawPlatforms = () => {
      ctx.fillStyle = '#8B4513';
      game.platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        
        // Platform texture
        ctx.fillStyle = '#A0522D';
        ctx.fillRect(platform.x, platform.y, platform.width, 5);
        ctx.fillStyle = '#8B4513';
      });
    };

    // Draw coins
    const drawCoins = () => {
      game.coins.forEach(coin => {
        if (!coin.collected) {
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(coin.x + coin.width/2, coin.y + coin.height/2, coin.width/2, 0, Math.PI * 2);
          ctx.fill();
          
          // Coin shine
          ctx.fillStyle = '#FFF';
          ctx.beginPath();
          ctx.arc(coin.x + coin.width/2 - 2, coin.y + coin.height/2 - 2, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    // Draw flag
    const drawFlag = () => {
      // Flag pole
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(game.flag.x, game.flag.y, 3, game.flag.height);
      
      // Flag
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(game.flag.x + 3, game.flag.y, 17, 15);
      
      // Flag pattern
      ctx.fillStyle = '#FFF';
      ctx.fillRect(game.flag.x + 5, game.flag.y + 2, 2, 2);
      ctx.fillRect(game.flag.x + 9, game.flag.y + 2, 2, 2);
      ctx.fillRect(game.flag.x + 13, game.flag.y + 2, 2, 2);
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
      ctx.arc(150, 80, 20, 0, Math.PI * 2);
      ctx.arc(170, 80, 25, 0, Math.PI * 2);
      ctx.arc(190, 80, 20, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(500, 60, 15, 0, Math.PI * 2);
      ctx.arc(515, 60, 20, 0, Math.PI * 2);
      ctx.arc(530, 60, 15, 0, Math.PI * 2);
      ctx.fill();
    };

    // Check collision
    const checkCollision = (rect1, rect2) => {
      return rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.y + rect1.height > rect2.y;
    };

    // Update game
    const update = () => {
      if (!game.gameStarted || game.gameOver || game.gameWon) return;

      // Handle input
      if (game.keys['ArrowLeft'] || game.keys['KeyA']) {
        game.player.velocityX = -game.player.speed;
      } else if (game.keys['ArrowRight'] || game.keys['KeyD']) {
        game.player.velocityX = game.player.speed;
      } else {
        game.player.velocityX *= 0.8; // Friction
      }

      if ((game.keys['ArrowUp'] || game.keys['Space'] || game.keys['KeyW']) && game.player.onGround) {
        game.player.velocityY = -game.player.jumpPower;
        game.player.onGround = false;
      }

      // Apply gravity
      game.player.velocityY += game.gravity;

      // Update position
      game.player.x += game.player.velocityX;
      game.player.y += game.player.velocityY;

      // Platform collision
      game.player.onGround = false;
      game.platforms.forEach(platform => {
        if (checkCollision(game.player, platform)) {
          // Landing on top
          if (game.player.velocityY > 0 && game.player.y < platform.y) {
            game.player.y = platform.y - game.player.height;
            game.player.velocityY = 0;
            game.player.onGround = true;
          }
          // Hitting from below
          else if (game.player.velocityY < 0 && game.player.y > platform.y) {
            game.player.y = platform.y + platform.height;
            game.player.velocityY = 0;
          }
          // Side collision
          else if (game.player.velocityX > 0) {
            game.player.x = platform.x - game.player.width;
          } else if (game.player.velocityX < 0) {
            game.player.x = platform.x + platform.width;
          }
        }
      });

      // Coin collection
      game.coins.forEach(coin => {
        if (!coin.collected && checkCollision(game.player, coin)) {
          coin.collected = true;
          game.score++;
          setScore(game.score);
        }
      });

      // Flag collision (win condition)
      if (checkCollision(game.player, game.flag)) {
        game.gameWon = true;
        setGameWon(true);
      }

      // Game over conditions
      if (game.player.y > canvas.height) {
        game.gameOver = true;
        setGameOver(true);
      }

      // Keep player in bounds
      if (game.player.x < 0) game.player.x = 0;
      if (game.player.x + game.player.width > canvas.width) {
        game.player.x = canvas.width - game.player.width;
      }
    };

    // Draw game
    const draw = () => {
      drawBackground();
      drawPlatforms();
      drawCoins();
      drawFlag();
      drawPlayer();
      
      // Draw score
      ctx.fillStyle = '#000';
      ctx.font = '20px Arial';
      ctx.fillText(`Coins: ${game.score}/4`, 10, 30);
      
      if (!game.gameStarted) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#fff';
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Mini Platformer', canvas.width / 2, canvas.height / 2 - 60);
        ctx.font = '18px Arial';
        ctx.fillText('Use Arrow Keys or WASD to move', canvas.width / 2, canvas.height / 2 - 20);
        ctx.fillText('Press SPACE or UP to jump', canvas.width / 2, canvas.height / 2);
        ctx.fillText('Collect coins and reach the flag!', canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText('Press any key to start', canvas.width / 2, canvas.height / 2 + 50);
        ctx.textAlign = 'left';
      }

      if (game.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#fff';
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = '18px Arial';
        ctx.fillText('Press R to restart', canvas.width / 2, canvas.height / 2 + 20);
        ctx.textAlign = 'left';
      }

      if (game.gameWon) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#fff';
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Level Complete!', canvas.width / 2, canvas.height / 2 - 40);
        ctx.font = '20px Arial';
        ctx.fillText(`Coins Collected: ${game.score}/4`, canvas.width / 2, canvas.height / 2 - 10);
        ctx.font = '18px Arial';
        ctx.fillText('Press R to play again', canvas.width / 2, canvas.height / 2 + 30);
        ctx.textAlign = 'left';
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
    const handleKeyDown = (e) => {
      game.keys[e.code] = true;
      
      if (!game.gameStarted) {
        game.gameStarted = true;
        setGameStarted(true);
      }
      
      if (e.code === 'KeyR' && (game.gameOver || game.gameWon)) {
        // Restart game
        game.player.x = 50;
        game.player.y = 300;
        game.player.velocityX = 0;
        game.player.velocityY = 0;
        game.player.onGround = false;
        game.coins.forEach(coin => coin.collected = false);
        game.score = 0;
        game.gameOver = false;
        game.gameWon = false;
        game.gameStarted = false;
        setScore(0);
        setGameOver(false);
        setGameWon(false);
        setGameStarted(false);
      }
    };

    const handleKeyUp = (e) => {
      game.keys[e.code] = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
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
          Coins: {score}/4
        </div>
        
        {(gameOver || gameWon) && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-2">
                {gameWon ? 'Level Complete!' : 'Game Over!'}
              </h3>
              <p className="text-lg mb-4">Coins: {score}/4</p>
              <p className="text-sm">Press R to restart</p>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>🎮 Arrow Keys/WASD to move • SPACE/UP to jump • Press R to restart</p>
        <p>Collect all coins and reach the flag!</p>
      </div>
    </div>
  );
};

export default MiniPlatformer;