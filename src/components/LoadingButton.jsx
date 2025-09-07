import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingButton = ({ 
  children, 
  isLoading = false, 
  disabled = false, 
  onClick, 
  className = '', 
  loadingText = 'Loading...',
  icon: Icon,
  ...props 
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      onClick={onClick}
      disabled={isDisabled}
      className={`relative overflow-hidden transition-all duration-200 ${
        isDisabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      {...props}
    >
      <motion.div
        className="flex items-center justify-center gap-2"
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {Icon && !isLoading && <Icon className="w-5 h-5" />}
        {children}
      </motion.div>
      
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mr-2"
          >
            <Loader2 className="w-5 h-5" />
          </motion.div>
          {loadingText}
        </motion.div>
      )}
    </motion.button>
  );
};

export default LoadingButton;