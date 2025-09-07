import { motion } from 'framer-motion';
import { useLoading } from '../../contexts/LoadingContext';
import LoadingButton from '../LoadingButton';
import TypingAnimation from '../TypingAnimation';
import ParticleBackground from '../ParticleBackground';

const Hero = () => {
  const { startLoading, stopLoading } = useLoading();

  const scrollToSection = (sectionId) => {
    startLoading('Navigating...');
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
    setTimeout(() => {
      stopLoading();
    }, 1000);
  };

  const typingTexts = [
    "I Build MERN Stack Apps",
    "I Create Hybrid Mobile Apps", 
    "I Develop Single-Page Applications",
    "I Craft Digital Experiences"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-100 via-teal-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <ParticleBackground particleCount={30} type="sparkles" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-rose-400 to-teal-400 p-1"
            animate={{ 
              scale: [1, 1.08, 1, 1.05, 1]
            }}
            transition={{ 
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.div 
              className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center relative overflow-hidden"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(244, 114, 182, 0.3), 0 0 40px rgba(20, 184, 166, 0.2)",
                  "0 0 30px rgba(244, 114, 182, 0.5), 0 0 60px rgba(20, 184, 166, 0.4)",
                  "0 0 20px rgba(244, 114, 182, 0.3), 0 0 40px rgba(20, 184, 166, 0.2)"
                ]
              }}
              transition={{
                boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Central Pixel Core */}
              <motion.div
                className="w-8 h-8 bg-gradient-to-br from-rose-500 to-teal-500 rounded-sm relative"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 180, 270, 360]
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
              >
                {/* Pixel Bloom Effect - Expanding Squares */}
                <motion.div
                  className="absolute -top-2 -left-2 w-3 h-3 bg-rose-400/60 rounded-sm"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0
                  }}
                />
                <motion.div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-teal-400/60 rounded-sm"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.3
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400/60 rounded-sm"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.6
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -right-2 w-3 h-3 bg-indigo-400/60 rounded-sm"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.9
                  }}
                />
                
                {/* Inner Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-sm"
                  animate={{
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              {/* Outer Bloom Particles */}
              <motion.div
                className="absolute top-8 left-8 w-2 h-2 bg-rose-300/40 rounded-sm"
                animate={{
                  scale: [0, 1, 0],
                  y: [0, -10, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1
                }}
              />
              <motion.div
                className="absolute top-8 right-8 w-2 h-2 bg-teal-300/40 rounded-sm"
                animate={{
                  scale: [0, 1, 0],
                  y: [0, -10, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1.5
                }}
              />
              <motion.div
                className="absolute bottom-8 left-8 w-2 h-2 bg-purple-300/40 rounded-sm"
                animate={{
                  scale: [0, 1, 0],
                  y: [0, 10, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 2
                }}
              />
              <motion.div
                className="absolute bottom-8 right-8 w-2 h-2 bg-indigo-300/40 rounded-sm"
                animate={{
                  scale: [0, 1, 0],
                  y: [0, 10, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 2.5
                }}
              />
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent">
              Hi, I'm Free Stack Dev
            </span>
          </motion.h1>

          <div className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-700 dark:text-gray-200 mb-8 h-16 flex items-center justify-center">
            <TypingAnimation 
              texts={typingTexts}
              className="text-gray-800 dark:text-gray-100"
            />
          </div>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Crafting magical digital experiences with modern web technologies. 
            Specializing in full-stack development, mobile apps, and bringing ideas to life.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <LoadingButton
              onClick={() => scrollToSection('portfolio')}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-teal-500 text-white font-semibold shadow-lg overflow-hidden"
            >
              <span className="relative z-10">View My Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-teal-500 to-rose-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </LoadingButton>

            <LoadingButton
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Let's Connect
            </LoadingButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;