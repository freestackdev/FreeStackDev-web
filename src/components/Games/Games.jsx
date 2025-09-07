import { motion } from 'framer-motion';
import { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useLoading } from '../../contexts/LoadingContext';
import { Gamepad2, Zap, Target, Play, Grid3X3, Brain, Hammer, Keyboard, Users, Code } from 'lucide-react';
import GameModal from './GameModal';
import FlappyBird from './FlappyBird';
import SnakeGame from './SnakeGame';
import Game2048 from './Game2048';
import TicTacToe from './TicTacToe';
import MemoryMatch from './MemoryMatch';
import WhackAMole from './WhackAMole';
import TypingTest from './TypingTest';
import MiniPlatformer from './MiniPlatformer';

const Games = () => {
  const [ref, controls] = useScrollAnimation();
  const { startLoading, stopLoading } = useLoading();
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 'flappy-bird',
      title: 'Flappy Bird',
      description: 'Navigate through pipes by pressing SPACE to flap your wings!',
      icon: Target,
      color: 'from-yellow-400 to-orange-500',
      component: FlappyBird,
      instructions: [
        'Press SPACE or click to flap your wings',
        'Avoid hitting the pipes or ground',
        'Try to get the highest score possible!',
        'Game gets faster as you progress'
      ]
    },
    {
      id: 'snake',
      title: 'Snake Game',
      description: 'Control the snake to eat food and grow longer without hitting walls!',
      icon: Zap,
      color: 'from-green-400 to-emerald-500',
      component: SnakeGame,
      instructions: [
        'Use arrow keys or WASD to move',
        'Eat the red food to grow longer',
        'Avoid hitting walls or yourself',
        'Score increases with each food eaten'
      ]
    },
    {
      id: '2048',
      title: '2048 Game',
      description: 'Slide numbered tiles to combine them and reach 2048!',
      icon: Grid3X3,
      color: 'from-blue-400 to-indigo-500',
      component: Game2048,
      instructions: [
        'Use arrow keys to slide tiles',
        'Combine tiles with same numbers',
        'Try to reach the 2048 tile',
        'Game ends when no moves are possible'
      ]
    },
    {
      id: 'tic-tac-toe',
      title: 'Tic-Tac-Toe',
      description: 'Classic strategy game - get three in a row to win!',
      icon: Grid3X3,
      color: 'from-purple-400 to-pink-500',
      component: TicTacToe,
      instructions: [
        'Click on empty squares to place X or O',
        'Get three in a row to win',
        'Play against AI or with a friend',
        'First player is always X'
      ]
    },
    {
      id: 'memory-match',
      title: 'Memory Match',
      description: 'Find matching pairs by flipping cards - test your memory!',
      icon: Brain,
      color: 'from-teal-400 to-cyan-500',
      component: MemoryMatch,
      instructions: [
        'Click cards to flip and reveal symbols',
        'Find matching pairs to remove them',
        'Match all pairs to win the game',
        'Try to complete in minimum moves'
      ]
    },
    {
      id: 'whack-a-mole',
      title: 'Whack-a-Mole',
      description: 'Quick reflexes needed - hit the moles as they pop up!',
      icon: Hammer,
      color: 'from-red-400 to-rose-500',
      component: WhackAMole,
      instructions: [
        'Click on moles when they appear',
        'Score points for each successful hit',
        'Game gets faster as time progresses',
        'Try to get the highest score in 60 seconds'
      ]
    },
    {
      id: 'typing-test',
      title: 'Typing Speed Test',
      description: 'Test your typing speed and accuracy with random words!',
      icon: Keyboard,
      color: 'from-violet-400 to-purple-500',
      component: TypingTest,
      instructions: [
        'Type the words as they appear',
        'Focus on accuracy and speed',
        'Your WPM will be calculated',
        'Try to beat your personal best'
      ]
    },
    {
      id: 'mini-platformer',
      title: 'Mini Platformer',
      description: 'Jump through platforms and collect coins in this mini adventure!',
      icon: Users,
      color: 'from-emerald-400 to-green-500',
      component: MiniPlatformer,
      instructions: [
        'Use arrow keys or WASD to move',
        'Press SPACE or UP to jump',
        'Collect coins and avoid obstacles',
        'Reach the flag to complete the level'
      ]
    }
  ];

  const openGame = (game) => {
    startLoading('Loading game...');
    setSelectedGame(game);
    setTimeout(() => {
      stopLoading();
    }, 500);
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      <section 
        id="games" 
        className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-pink-900 dark:to-purple-900"
        ref={ref}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="text-center mb-16"
          >
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-6"
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Gamepad2 className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>

            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
            >
              Are You Bored? Let's Play! 🎮
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Take a short break from coding and try these fun mini-games! Built with vanilla JavaScript 
              and HTML5 Canvas - because even developers need to have some fun! 🎯
            </motion.p>
          </motion.div>

          {/* Game Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                variants={itemVariants}
                className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg cursor-pointer overflow-hidden"
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openGame(game)}
              >
                {/* Floating background elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-4`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <game.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <h3 className="text-lg font-bold mb-3 text-gray-800 dark:text-gray-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {game.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {game.description}
                  </p>

                  <motion.div
                    className="flex items-center justify-center gap-2 text-pink-600 dark:text-pink-400 font-semibold text-sm"
                    whileHover={{ x: 5 }}
                  >
                    <Play className="w-4 h-4" />
                    <span>Play Now</span>
                  </motion.div>

                  {/* Game preview elements */}
                  <div className="absolute bottom-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                    {game.id === 'flappy-bird' && (
                      <div className="flex gap-1">
                        <div className="w-1 h-6 bg-green-500 rounded-t-lg" />
                        <div className="w-1 h-4 bg-green-500 rounded-t-lg" />
                        <div className="w-1 h-8 bg-green-500 rounded-t-lg" />
                      </div>
                    )}
                    {game.id === 'snake' && (
                      <div className="grid grid-cols-3 gap-0.5">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-1 h-1 rounded-sm ${
                              [0, 1, 4, 7, 8].includes(i) ? 'bg-green-500' : 'bg-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    )}
                    {game.id === '2048' && (
                      <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-2 h-2 bg-orange-400 rounded text-xs flex items-center justify-center text-white font-bold">2</div>
                        <div className="w-2 h-2 bg-orange-500 rounded text-xs flex items-center justify-center text-white font-bold">4</div>
                        <div className="w-2 h-2 bg-red-400 rounded text-xs flex items-center justify-center text-white font-bold">8</div>
                        <div className="w-2 h-2 bg-red-500 rounded"></div>
                      </div>
                    )}
                    {game.id === 'tic-tac-toe' && (
                      <div className="grid grid-cols-3 gap-0.5">
                        {['X', '', 'O', '', 'X', '', 'O', '', ''].map((cell, i) => (
                          <div key={i} className="w-1.5 h-1.5 bg-gray-300 rounded text-xs flex items-center justify-center font-bold">
                            {cell}
                          </div>
                        ))}
                      </div>
                    )}
                    {game.id === 'memory-match' && (
                      <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-2 h-2 bg-teal-400 rounded">❤️</div>
                        <div className="w-2 h-2 bg-gray-400 rounded">?</div>
                        <div className="w-2 h-2 bg-gray-400 rounded">?</div>
                        <div className="w-2 h-2 bg-teal-400 rounded">⭐</div>
                      </div>
                    )}
                    {game.id === 'whack-a-mole' && (
                      <div className="grid grid-cols-3 gap-0.5">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-1 h-1 rounded-full ${
                              [1, 4, 7].includes(i) ? 'bg-brown-500' : 'bg-green-600'
                            }`} 
                          />
                        ))}
                      </div>
                    )}
                    {game.id === 'typing-test' && (
                      <div className="text-xs opacity-60">
                        <div className="w-4 h-0.5 bg-gray-400 mb-0.5"></div>
                        <div className="w-3 h-0.5 bg-gray-400 mb-0.5"></div>
                        <div className="w-2 h-0.5 bg-pink-400"></div>
                      </div>
                    )}
                    {game.id === 'mini-platformer' && (
                      <div className="relative">
                        <div className="w-4 h-1 bg-green-600 rounded"></div>
                        <div className="absolute -top-1 left-1 w-1 h-1 bg-yellow-400 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Fun Stats */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-br from-white/80 to-pink-50/80 dark:from-gray-800/80 dark:to-purple-900/80 backdrop-blur-md rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl max-w-4xl mx-auto relative overflow-hidden">
              {/* Background decoration */}
              <motion.div
                className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full"
                animate={{ 
                  rotate: [360, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="flex items-center justify-center gap-3 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Code className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Built with Modern Tech
                  </h3>
                </motion.div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-2xl mx-auto">
                  These games showcase modern web development techniques and best practices
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { 
                      icon: '🎨', 
                      title: 'HTML5 Canvas', 
                      desc: 'Smooth graphics rendering',
                      color: 'from-pink-500 to-rose-500'
                    },
                    { 
                      icon: '⚡', 
                      title: 'Vanilla JavaScript', 
                      desc: 'Pure JS game logic',
                      color: 'from-purple-500 to-violet-500'
                    },
                    { 
                      icon: '🚀', 
                      title: '60 FPS Game Loop', 
                      desc: 'Buttery smooth gameplay',
                      color: 'from-indigo-500 to-blue-500'
                    },
                    { 
                      icon: '📱', 
                      title: 'Responsive Controls', 
                      desc: 'Works on all devices',
                      color: 'from-teal-500 to-cyan-500'
                    },
                    { 
                      icon: '💾', 
                      title: 'Local Storage', 
                      desc: 'Saves your high scores',
                      color: 'from-green-500 to-emerald-500'
                    },
                    { 
                      icon: '🤖', 
                      title: 'Smart AI Logic', 
                      desc: 'Challenging opponents',
                      color: 'from-orange-500 to-red-500'
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="group bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -5,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                      }}
                    >
                      <motion.div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 mx-auto`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-lg">{feature.icon}</span>
                      </motion.div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1 text-center text-sm group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
                        {feature.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Additional stats */}
                <motion.div
                  className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span>Cross-platform compatible</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                      <span>Optimized performance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                      <span>Modern web standards</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Game Modal */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={closeGame}
        />
      )}
    </>
  );
};

export default Games;