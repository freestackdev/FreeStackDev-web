import { useState, useEffect, useCallback } from 'react';

export const useHireMe = () => {
  const [showHireMe, setShowHireMe] = useState(false);
  const [hasShownOnScroll, setHasShownOnScroll] = useState(false);
  const [hasShownOnGameClose, setHasShownOnGameClose] = useState(false);

  // Show hire me modal
  const showHireMeModal = useCallback(() => {
    setShowHireMe(true);
  }, []);

  // Hide hire me modal
  const hideHireMeModal = useCallback(() => {
    setShowHireMe(false);
  }, []);

  // Trigger on game close
  const triggerOnGameClose = useCallback(() => {
    if (!hasShownOnGameClose) {
      setTimeout(() => {
        setShowHireMe(true);
        setHasShownOnGameClose(true);
      }, 1000); // 1 second delay after game close
    }
  }, [hasShownOnGameClose]);

  // Scroll detection for middle of page
  useEffect(() => {
    const handleScroll = () => {
      if (hasShownOnScroll) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const middleOfPage = (documentHeight - windowHeight) * 0.5;

      if (scrollPosition >= middleOfPage) {
        setShowHireMe(true);
        setHasShownOnScroll(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownOnScroll]);

  // Reset flags (useful for development/testing)
  const resetFlags = useCallback(() => {
    setHasShownOnScroll(false);
    setHasShownOnGameClose(false);
  }, []);

  return {
    showHireMe,
    showHireMeModal,
    hideHireMeModal,
    triggerOnGameClose,
    resetFlags
  };
};