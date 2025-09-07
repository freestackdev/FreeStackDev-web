/**
 * Secure image loading utilities with CSP compliance
 */

import { isCSPAllowed } from './security';

/**
 * Validates and loads images securely
 * @param {string} src - Image source URL
 * @param {Object} options - Loading options
 * @returns {Promise<HTMLImageElement>} Promise that resolves with loaded image
 */
export const loadImageSecurely = (src, options = {}) => {
  return new Promise((resolve, reject) => {
    // Validate URL against CSP
    if (!isCSPAllowed(src, 'img')) {
      reject(new Error(`Image URL not allowed by CSP: ${src}`));
      return;
    }

    const img = new Image();
    
    // Set up event handlers
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    
    // Apply security attributes
    img.crossOrigin = options.crossOrigin || 'anonymous';
    
    // Set source last to trigger loading
    img.src = src;
  });
};

/**
 * Preloads images with CSP validation
 * @param {string[]} urls - Array of image URLs to preload
 * @returns {Promise<HTMLImageElement[]>} Promise that resolves with all loaded images
 */
export const preloadImages = async (urls) => {
  const validUrls = urls.filter(url => isCSPAllowed(url, 'img'));
  
  if (validUrls.length !== urls.length) {
    console.warn('Some image URLs were filtered out by CSP validation');
  }
  
  const loadPromises = validUrls.map(url => loadImageSecurely(url));
  
  try {
    return await Promise.all(loadPromises);
  } catch (error) {
    console.error('Error preloading images:', error);
    throw error;
  }
};

/**
 * Creates a secure image element with proper attributes
 * @param {string} src - Image source URL
 * @param {Object} attributes - Image attributes (alt, className, etc.)
 * @returns {HTMLImageElement|null} Image element or null if not allowed
 */
export const createSecureImage = (src, attributes = {}) => {
  if (!isCSPAllowed(src, 'img')) {
    console.warn('Image URL not allowed by CSP:', src);
    return null;
  }
  
  const img = document.createElement('img');
  img.src = src;
  img.crossOrigin = 'anonymous';
  
  // Apply attributes
  Object.keys(attributes).forEach(key => {
    if (key === 'className') {
      img.className = attributes[key];
    } else {
      img.setAttribute(key, attributes[key]);
    }
  });
  
  return img;
};

/**
 * Validates Pexels image URLs (our primary image source)
 * @param {string} url - Pexels image URL
 * @returns {boolean} True if valid Pexels URL
 */
export const isValidPexelsUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'images.pexels.com' && urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Generates optimized Pexels image URL with proper parameters
 * @param {string} baseUrl - Base Pexels image URL
 * @param {Object} options - Optimization options (width, height, quality)
 * @returns {string} Optimized image URL
 */
export const optimizePexelsImage = (baseUrl, options = {}) => {
  if (!isValidPexelsUrl(baseUrl)) {
    console.warn('Invalid Pexels URL provided:', baseUrl);
    return baseUrl;
  }
  
  try {
    const url = new URL(baseUrl);
    
    // Add optimization parameters
    if (options.width) url.searchParams.set('w', options.width);
    if (options.height) url.searchParams.set('h', options.height);
    if (options.quality) url.searchParams.set('q', options.quality);
    
    // Ensure compression and format optimization
    if (!url.searchParams.has('auto')) {
      url.searchParams.set('auto', 'compress');
    }
    if (!url.searchParams.has('cs')) {
      url.searchParams.set('cs', 'tinysrgb');
    }
    
    return url.toString();
  } catch (error) {
    console.error('Error optimizing Pexels image URL:', error);
    return baseUrl;
  }
};