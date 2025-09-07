import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

const Toast = ({ isVisible, onClose, title, message, type = 'info', duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 border-green-600';
      case 'warning':
        return 'bg-yellow-500 border-yellow-600';
      case 'error':
        return 'bg-red-500 border-red-600';
      case 'info':
      default:
        return 'bg-blue-500 border-blue-600';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'info':
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-6 right-6 z-[9999] max-w-sm"
        >
          <div className={`${getToastStyles()} text-white rounded-2xl shadow-2xl border-2 overflow-hidden`}>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex-shrink-0 mt-0.5"
                >
                  {getIcon()}
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm mb-1">{title}</h4>
                  <p className="text-sm opacity-90 leading-relaxed">{message}</p>
                </div>
                
                <motion.button
                  onClick={onClose}
                  className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            
            {/* Progress bar */}
            <motion.div
              className="h-1 bg-white/30"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;