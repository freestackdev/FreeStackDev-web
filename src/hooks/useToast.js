import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState({
    isVisible: false,
    title: '',
    message: '',
    type: 'info',
    duration: 3000
  });

  const showToast = useCallback(({ title, message, type = 'info', duration = 3000 }) => {
    setToast({
      isVisible: true,
      title,
      message,
      type,
      duration
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  const showComingSoon = useCallback((feature = 'This feature') => {
    showToast({
      title: 'Coming Soon! 🚀',
      message: `${feature} is currently under development. Stay tuned for updates!`,
      type: 'info',
      duration: 4000
    });
  }, [showToast]);

  return {
    toast,
    showToast,
    hideToast,
    showComingSoon
  };
};