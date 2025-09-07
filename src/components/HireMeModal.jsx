import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { X, Briefcase, Mail, Phone, Calendar, DollarSign, Clock, CheckCircle, Globe } from 'lucide-react';
import { useLoading } from '../contexts/LoadingContext';
import LoadingButton from './LoadingButton';
import { handleFormError, withErrorHandling } from '../utils/errorHandler';

const HireMeModal = ({ isVisible, onClose }) => {
  const { startLoading, stopLoading } = useLoading();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: 'US',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check - if filled, it's likely a bot
    if (honeypot) {
      console.log('Bot detected via honeypot');
      return;
    }

    // Show CAPTCHA if not already shown
    if (!showCaptcha) {
      setShowCaptcha(true);
      return;
    }

    // Validate CAPTCHA
    if (!captchaToken) {
      alert('Please complete the CAPTCHA verification');
      return;
    }

    setIsSubmitting(true);
    startLoading('Sending your hiring request...');

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzrLjjFF_PW0JT39jRHBZwSvwBivzC2Xe-MOXmmrwxfS_ZtsAibovszaoRs9l5hW23EYg/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          country: formData.country,
          projectType: formData.projectType,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message,
          captchaToken: captchaToken
        }),
      });


      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        country: 'US',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      });
      setCaptchaToken(null);
      setShowCaptcha(false);
      setHoneypot('');

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      const userMessage = handleFormError(error, 'hire_me');
      alert(userMessage);
    } finally {
      setIsSubmitting(false);
      stopLoading();
    }
  };

  const countries = [
    { code: 'US', name: 'United States', currency: 'USD', symbol: '$' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£' },
    { code: 'EU', name: 'European Union', currency: 'EUR', symbol: '€' },
    { code: 'CA', name: 'Canada', currency: 'CAD', symbol: 'C$' },
    { code: 'AU', name: 'Australia', currency: 'AUD', symbol: 'A$' },
    { code: 'IN', name: 'India', currency: 'INR', symbol: '₹' },
    { code: 'JP', name: 'Japan', currency: 'JPY', symbol: '¥' },
    { code: 'CN', name: 'China', currency: 'CNY', symbol: '¥' },
    { code: 'BR', name: 'Brazil', currency: 'BRL', symbol: 'R$' },
    { code: 'MX', name: 'Mexico', currency: 'MXN', symbol: '$' },
    { code: 'SG', name: 'Singapore', currency: 'SGD', symbol: 'S$' },
    { code: 'AE', name: 'UAE', currency: 'AED', symbol: 'د.إ' },
    { code: 'ZA', name: 'South Africa', currency: 'ZAR', symbol: 'R' },
    { code: 'OTHER', name: 'Other', currency: 'USD', symbol: '$' }
  ];

  const projectTypes = [
    'Web Application',
    'Mobile App',
    'E-commerce Site',
    'Portfolio Website',
    'Custom Software',
    'API Development',
    'Other'
  ];

  const getBudgetRanges = () => {
    const selectedCountry = countries.find(c => c.code === formData.country);
    const symbol = selectedCountry?.symbol || '$';
    const currency = selectedCountry?.currency || 'USD';

    // Conversion rates (approximate, for display purposes)
    const rates = {
      'USD': 1,
      'GBP': 0.8,
      'EUR': 0.9,
      'CAD': 1.35,
      'AUD': 1.5,
      'INR': 83,
      'JPY': 150,
      'CNY': 7.2,
      'BRL': 5.0,
      'MXN': 17,
      'SGD': 1.35,
      'AED': 3.67,
      'ZAR': 18.5
    };

    const rate = rates[currency] || 1;

    const formatAmount = (usdAmount) => {
      const convertedAmount = Math.round(usdAmount * rate);

      // Format based on currency
      if (currency === 'JPY' || currency === 'CNY') {
        return convertedAmount.toLocaleString();
      } else if (currency === 'INR') {
        return convertedAmount.toLocaleString('en-IN');
      } else {
        return convertedAmount.toLocaleString();
      }
    };

    return [
      `${symbol}${formatAmount(1000)} - ${symbol}${formatAmount(5000)}`,
      `${symbol}${formatAmount(5000)} - ${symbol}${formatAmount(10000)}`,
      `${symbol}${formatAmount(10000)} - ${symbol}${formatAmount(25000)}`,
      `${symbol}${formatAmount(25000)} - ${symbol}${formatAmount(50000)}`,
      `${symbol}${formatAmount(50000)}+`,
      'Let\'s discuss'
    ];
  };

  const timelines = [
    '1-2 weeks',
    '1 month',
    '2-3 months',
    '3-6 months',
    '6+ months',
    'Flexible'
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="hire-modal-title"
          style={{
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* Internet Explorer 10+ */
          }}
        >
          <style jsx>{`
            /* Hide scrollbar for Chrome, Safari and Opera */
            .modal-content::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl"
          >
            {/* Header */}
            <div className="relative px-8 py-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-3xl">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Briefcase className="w-6 h-6" />
                </motion.div>
                <div>
                  <h2 id="hire-modal-title" className="text-2xl font-bold">
                    Let's Work Together! 🚀
                  </h2>
                  <p className="text-indigo-100 text-sm">
                    Tell me about your project and let's create something amazing
                  </p>
                </div>
              </div>

              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Request Sent Successfully! 🎉
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Thank you for your interest! I'll get back to you within 24 hours to discuss your project.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        minLength={2}
                        className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Globe className="w-4 h-4 inline mr-2" />
                      Country/Region *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name} ({country.currency})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Details */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Budget Range ({countries.find(c => c.code === formData.country)?.currency || 'USD'})
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select budget</option>
                        {getBudgetRanges().map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      minLength={10}
                      rows={4}
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell me about your project, goals, and any specific requirements..."
                    />
                  </div>

                  {/* Honeypot field - hidden from users */}
                  <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                    <label htmlFor="website">Website (leave blank)</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>

                  {/* reCAPTCHA */}
                  {showCaptcha && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-center"
                    >
                      <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={handleCaptchaChange}
                        onExpired={handleCaptchaExpired}
                        theme="light"
                      />
                    </motion.div>
                  )}

                  <LoadingButton
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSuccess}
                    loadingText="Sending Request..."
                    icon={isSuccess ? CheckCircle : Briefcase}
                    className="group relative w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    {isSuccess ? 'Thank you! Your request has been sent.' : showCaptcha ? 'Send Hiring Request' : 'Continue to Verification'}
                  </LoadingButton>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HireMeModal;