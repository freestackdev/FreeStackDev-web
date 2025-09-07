/**
 * Production-ready error handling utilities
 */

/**
 * User-friendly error messages for different error types
 */
const ERROR_MESSAGES = {
  NETWORK_ERROR: "We're having trouble connecting. Please check your internet connection and try again.",
  FORM_SUBMISSION_ERROR: "Something went wrong while sending your message. Please try again in a moment.",
  VALIDATION_ERROR: "Please check your information and try again.",
  RATE_LIMIT_ERROR: "You're sending requests too quickly. Please wait a moment and try again.",
  GENERIC_ERROR: "Something went wrong. Please try again later.",
  CAPTCHA_ERROR: "Please complete the security verification and try again.",
  TIMEOUT_ERROR: "The request is taking longer than expected. Please try again.",
};

/**
 * Error types for categorization
 */
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  FORM: 'FORM_SUBMISSION_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  RATE_LIMIT: 'RATE_LIMIT_ERROR',
  GENERIC: 'GENERIC_ERROR',
  CAPTCHA: 'CAPTCHA_ERROR',
  TIMEOUT: 'TIMEOUT_ERROR',
};

/**
 * Gets user-friendly error message based on error type
 * @param {string} errorType - The error type from ERROR_TYPES
 * @param {string} fallback - Fallback message if type not found
 * @returns {string} User-friendly error message
 */
export const getUserFriendlyMessage = (errorType, fallback = ERROR_MESSAGES.GENERIC_ERROR) => {
  return ERROR_MESSAGES[errorType] || fallback;
};

/**
 * Categorizes errors based on error object or message
 * @param {Error|string} error - Error object or message
 * @returns {string} Error type from ERROR_TYPES
 */
export const categorizeError = (error) => {
  const message = typeof error === 'string' ? error : error?.message || '';
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('network') || lowerMessage.includes('fetch')) {
    return ERROR_TYPES.NETWORK;
  }
  
  if (lowerMessage.includes('rate limit') || lowerMessage.includes('too many')) {
    return ERROR_TYPES.RATE_LIMIT;
  }
  
  if (lowerMessage.includes('validation') || lowerMessage.includes('invalid')) {
    return ERROR_TYPES.VALIDATION;
  }
  
  if (lowerMessage.includes('captcha') || lowerMessage.includes('recaptcha')) {
    return ERROR_TYPES.CAPTCHA;
  }
  
  if (lowerMessage.includes('timeout') || lowerMessage.includes('aborted')) {
    return ERROR_TYPES.TIMEOUT;
  }
  
  if (lowerMessage.includes('form') || lowerMessage.includes('submit')) {
    return ERROR_TYPES.FORM;
  }
  
  return ERROR_TYPES.GENERIC;
};

/**
 * Handles errors in a production-safe way
 * @param {Error} error - The error object
 * @param {Object} context - Additional context (component, action, etc.)
 * @returns {string} User-friendly error message
 */
export const handleError = (error, context = {}) => {
  const errorType = categorizeError(error);
  const userMessage = getUserFriendlyMessage(errorType);
  
  // In development, log full error details
  if (import.meta.env.DEV) {
    console.error('Error occurred:', {
      error,
      context,
      type: errorType,
      userMessage,
      stack: error?.stack,
    });
  } else {
    // In production, only log essential information
    // This would typically go to a remote error tracking service
    const errorInfo = {
      message: error?.message || 'Unknown error',
      type: errorType,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
    
    // Send to error tracking service (e.g., Sentry)
    if (window.__SENTRY__) {
      window.__SENTRY__.captureException(error, {
        tags: { errorType },
        extra: context,
      });
    }
    
    // Minimal console logging for production debugging
    console.error('Application error:', errorInfo.type, errorInfo.timestamp);
  }
  
  return userMessage;
};

/**
 * React error boundary helper
 * @param {Error} error - The error that occurred
 * @param {Object} errorInfo - React error info
 * @returns {Object} Error state for UI
 */
export const handleReactError = (error, errorInfo) => {
  const errorType = categorizeError(error);
  const userMessage = getUserFriendlyMessage(errorType);
  
  // Log error details
  if (import.meta.env.DEV) {
    console.error('React Error Boundary caught an error:', {
      error,
      errorInfo,
      type: errorType,
    });
  } else {
    // Production error tracking
    if (window.__SENTRY__) {
      window.__SENTRY__.captureException(error, {
        tags: { 
          errorType,
          errorBoundary: true,
        },
        extra: {
          componentStack: errorInfo.componentStack,
        },
      });
    }
  }
  
  return {
    hasError: true,
    errorType,
    userMessage,
    canRetry: errorType !== ERROR_TYPES.GENERIC,
  };
};

/**
 * Async operation error handler with retry logic
 * @param {Function} operation - The async operation to execute
 * @param {Object} options - Options (retries, delay, context)
 * @returns {Promise} Promise that resolves with operation result or throws user-friendly error
 */
export const withErrorHandling = async (operation, options = {}) => {
  const { retries = 2, delay = 1000, context = {} } = options;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      // If this is the last attempt, handle the error
      if (attempt === retries) {
        const userMessage = handleError(error, { ...context, attempt: attempt + 1 });
        throw new Error(userMessage);
      }
      
      // Wait before retrying
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
};

/**
 * Form submission error handler
 * @param {Error} error - Form submission error
 * @param {string} formType - Type of form (contact, hire, newsletter)
 * @returns {string} User-friendly error message
 */
export const handleFormError = (error, formType = 'form') => {
  const context = { formType, action: 'form_submission' };
  return handleError(error, context);
};

/**
 * Network request error handler
 * @param {Error} error - Network error
 * @param {string} endpoint - The endpoint that failed
 * @returns {string} User-friendly error message
 */
export const handleNetworkError = (error, endpoint = 'unknown') => {
  const context = { endpoint, action: 'network_request' };
  return handleError(error, context);
};