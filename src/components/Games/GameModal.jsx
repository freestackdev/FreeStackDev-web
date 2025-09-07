import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Gamepad2 } from 'lucide-react';
import { useEffect } from 'react';
import { useHireMe } from '../../hooks/useHireMe';

const GameModal = ({ game, onClose }) => {
  const { triggerOnGameClose } = useHireMe();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleClose = () => {
    onClose();
    triggerOnGameClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const GameComponent = game.component;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
          style={{
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* Internet Explorer 10+ */
          }}
        >
          <style jsx>{`
            /* Hide scrollbar for Chrome, Safari and Opera */
            .modal-content::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {/* Header */}
          <div className={`relative px-6 py-4 bg-gradient-to-r ${game.color} text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <game.icon className="w-5 h-5" />
                </motion.div>
                <h2 id="game-modal-title" className="text-2xl font-bold">
                  {game.title}
                </h2>
              </div>
              
              <motion.button
                onClick={handleClose}
                className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close game"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Game Content */}
          <div className="flex flex-col lg:flex-row h-[calc(90vh-80px)]">
            {/* Game Area */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
              <div className="w-full max-w-2xl">
                <GameComponent />
              </div>
            </div>

            {/* Instructions Sidebar */}
            <div 
              className="lg:w-80 p-6 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto modal-content"
              style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* Internet Explorer 10+ */
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  How to Play
                </h3>
              </div>
              
              <ul className="space-y-3 mb-6">
                {game.instructions.map((instruction, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white text-xs flex items-center justify-center font-semibold mt-0.5">
                      {index + 1}
                    </span>
                    {instruction}
                  </motion.li>
                ))}
              </ul>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gamepad2 className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    Pro Tip
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {game.id === 'flappy-bird' 
                    ? "Timing is everything! Find your rhythm and stay calm."
                    : "Plan your moves ahead and don't get too greedy with the food!"
                  }
                </p>
              </div>

              <motion.button
                onClick={handleClose}
                className="w-full mt-6 px-4 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close Game
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameModal;