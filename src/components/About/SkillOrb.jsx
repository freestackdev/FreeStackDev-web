import { motion } from 'framer-motion';
import { useState } from 'react';

const SkillOrb = ({ skill, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
        <motion.div
          className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-teal-400 flex items-center justify-center text-white font-semibold"
          animate={{ 
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          {skill.icon}
        </motion.div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {skill.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {skill.level}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-rose-400 to-teal-400"
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ delay: delay + 0.5, duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap z-10"
        >
          {skill.level}% Proficiency
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 dark:bg-gray-200 rotate-45" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default SkillOrb;