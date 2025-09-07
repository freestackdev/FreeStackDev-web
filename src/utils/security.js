/**
 * Security utilities for HTTPS enforcement and secure connections
 */

/**
 * Content Security Policy (CSP) utilities
 */

/**
 * Validates that a URL is allowed by our CSP policy
 * @param {string} url - The URL to validate
 * @param {string} type - The resource type ('script', 'style', 'img', 'font', 'connect')
 * @returns {boolean} True if URL is allowed by CSP
 */
export const isCSPAllowed = (url, type) => {
  if (!url || typeof url !== 'string') return false;
  
  // Allow relative URLs and same-origin
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
    return true;
  }
  
  // Allow data URLs for fonts and images
  if (url.startsWith('data:') && (type === 'font' || type === 'img')) {
    return true;
  }
  
  // Allow blob URLs for workers and media
  if (url.startsWith('blob:') && (type === 'worker' || type === 'media' || type === 'img')) {
    return true;
  }
  
  try {
    const urlObj = new URL(url);
    
    // Define allowed domains per resource type
    const allowedDomains = {
      script: [
        'formspree.io',
        'www.googletagmanager.com',
        'www.google-analytics.com'
      ],
      style: [
        'fonts.googleapis.com'
      ],
      font: [
        'fonts.gstatic.com'
      ],
      img: [
        'images.pexels.com',
        'www.google-analytics.com'
      ],
      connect: [
        'formspree.io',
        'www.google-analytics.com',
        'analytics.google.com'
      ]
    };
    
    const allowed = allowedDomains[type] || [];
    return allowed.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
    );
  } catch (error) {
    return false;
  }
};

/**
 * Creates a secure script element with proper CSP compliance
 * @param {string} src - Script source URL
 * @param {Object} options - Additional options (async, defer, integrity, etc.)
 * @returns {HTMLScriptElement|null} Script element or null if not allowed
 */
export const createSecureScript = (src, options = {}) => {
  if (!isCSPAllowed(src, 'script')) {
    console.warn('Script URL not allowed by CSP:', src);
    return null;
  }
  
  const script = document.createElement('script');
  script.src = src;
  
  // Apply security attributes
  if (options.integrity) {
    script.integrity = options.integrity;
    script.crossOrigin = 'anonymous';
  }
  
  if (options.async) script.async = true;
  if (options.defer) script.defer = true;
  
  return script;
};

/**
 * Creates a secure link element for stylesheets with proper CSP compliance
 * @param {string} href - Stylesheet URL
 * @param {Object} options - Additional options (integrity, media, etc.)
 * @returns {HTMLLinkElement|null} Link element or null if not allowed
 */
export const createSecureStylesheet = (href, options = {}) => {
  if (!isCSPAllowed(href, 'style')) {
    console.warn('Stylesheet URL not allowed by CSP:', href);
    return null;
  }
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  
  // Apply security attributes
  if (options.integrity) {
    link.integrity = options.integrity;
    link.crossOrigin = 'anonymous';
  }
  
  if (options.media) link.media = options.media;
  
  return link;
};

/**
 * Enforces HTTPS redirect on the client side as a fallback
 * This runs in the browser to catch any HTTP requests that weren't redirected by the server
 */
export const enforceHTTPS = () => {
  // Only run in production and if we're on HTTP
  if (import.meta.env.PROD && window.location.protocol === 'http:') {
    // Redirect to HTTPS version of the same URL
    window.location.replace(window.location.href.replace('http:', 'https:'));
  }
};

/**
 * Checks if the current connection is secure
 * @returns {boolean} True if connection is secure (HTTPS or localhost)
 */
export const isSecureConnection = () => {
  return (
    window.location.protocol === 'https:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.includes('localhost')
  );
};

/**
 * Validates that external URLs use HTTPS
 * @param {string} url - The URL to validate
 * @returns {boolean} True if URL is secure or relative
 */
export const isSecureURL = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  // Allow relative URLs
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
    return true;
  }
  
  // Allow anchor links
  if (url.startsWith('#')) {
    return true;
  }
  
  // Check if external URL uses HTTPS
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:';
  } catch (error) {
    // If URL parsing fails, consider it insecure
    return false;
  }
};

/**
 * Securely opens external links
 * @param {string} url - The URL to open
 * @param {string} target - The target window (default: '_blank')
 */
export const secureOpenLink = (url, target = '_blank') => {
  if (!isSecureURL(url)) {
    console.warn('Attempted to open insecure URL:', url);
    return;
  }
  
  // Open with security attributes
  const newWindow = window.open(url, target, 'noopener,noreferrer');
  
  // Additional security for older browsers
  if (newWindow) {
    newWindow.opener = null;
  }
};

/**
 * Security configuration for fetch requests
 */
export const secureRequestConfig = {
  // Default headers for secure requests
  headers: {
    'Content-Type': 'application/json',
    // Add CSRF protection if needed
    'X-Requested-With': 'XMLHttpRequest',
  },
  // Ensure credentials are handled securely
  credentials: 'same-origin',
  // Set referrer policy
  referrerPolicy: 'strict-origin-when-cross-origin',
};

/**
 * Validates and secures form submission URLs
 * @param {string} url - The form action URL
 * @returns {boolean} True if URL is safe for form submission
 */
export const isSecureFormURL = (url) => {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    
    // Must be HTTPS
    if (urlObj.protocol !== 'https:') return false;
    
    // Allow same origin or trusted domains
    const trustedDomains = [
      'formspree.io',
      window.location.hostname
    ];
    
    return trustedDomains.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
    );
  } catch (error) {
    return false;
  }
}