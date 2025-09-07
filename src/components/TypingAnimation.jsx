import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingAnimation = ({ 
  texts = [], 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  delayBetweenTexts = 2000,
  className = ""
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const text = texts[currentTextIndex];
    
    if (isTyping) {
      if (currentText.length < text.length) {
        const timeout = setTimeout(() => {
          setCurrentText(text.slice(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), delayBetweenTexts);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(true);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [currentText, isTyping, currentTextIndex, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        className="inline-block w-0.5 h-8 bg-current ml-1"
      />
    </span>
  );
};

export default TypingAnimation;