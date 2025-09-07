import { motion } from 'framer-motion';
import { useMemo } from 'react';

const ParticleBackground = ({ particleCount = 50, type = 'sparkles' }) => {
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
  }, [particleCount]);

  const getParticleEmoji = () => {
    const types = {
      sparkles: ['✨', '⭐', '💫', '🌟'],
      nature: ['🍃', '🌸', '🦋', '🌿'],
      clouds: ['☁️', '⛅', '🌤️'],
    };
    const selected = types[type] || types.sparkles;
    return selected[Math.floor(Math.random() * selected.length)];
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-sm opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size * 4}px`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        >
          {getParticleEmoji()}
        </motion.div>
      ))}
    </div>
  );
};

export default ParticleBackground;