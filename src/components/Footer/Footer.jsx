import { motion } from 'framer-motion';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useLoading } from '../../contexts/LoadingContext';
import { useToast } from '../../hooks/useToast';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUp,
  Heart,
  Sparkles,
  Code,
  Coffee,
  Zap,
  Instagram,
  MessageCircle,
  Facebook,
} from 'lucide-react';
import LegalModal from './LegalModal';
import Toast from '../Toast';
import LoadingButton from '../LoadingButton';
import { handleFormError } from '../../utils/errorHandler.js';

const Footer = () => {
  const [modalType, setModalType] = useState(null);
  const { startLoading, stopLoading } = useLoading();
  const { toast, hideToast, showComingSoon } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (type) => {
    startLoading('Loading policy...');
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const handleSocialClick = (platform, e) => {
    e.preventDefault();
    if (platform === 'Email') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      showComingSoon(`${platform} profile`);
    }
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
  };

  const handleNewsletterSubmit = async (e) => {
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
    
    setIsSubscribing(true);
    startLoading('Subscribing to newsletter...');

    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
          'Referer': window.location.href,
        },
        body: JSON.stringify({
          email: newsletterEmail,
          _subject: 'Newsletter Subscription',
          'g-recaptcha-response': captchaToken,
          _captcha: 'recaptcha',
          _format: 'plain',
          _form_type: 'newsletter_subscription',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setSubscriptionSuccess(true);
      setNewsletterEmail('');
      setCaptchaToken(null);
      setShowCaptcha(false);
      setHoneypot('');

      setTimeout(() => {
        setSubscriptionSuccess(false);
      }, 5000);
    } catch (error) {
      const userMessage = handleFormError(error, 'newsletter');
      alert(userMessage);
    } finally {
      setIsSubscribing(false);
      stopLoading();
    }
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: MessageCircle, href: '#', label: 'Reddit' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ];

  return (
    <>
      <footer className="relative py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 backdrop-blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
              }}
            />
          ))}

          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute text-yellow-400/60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 8 + 8}px`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 3,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <motion.div
                className="inline-flex items-center gap-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-teal-400 p-0.5 flex items-center justify-center relative overflow-hidden"
                  animate={{
                    boxShadow: [
                      "0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.5), 0 0 15px rgba(59, 130, 246, 0.5)",
                      "0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.8)",
                      "0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.5), 0 0 15px rgba(59, 130, 246, 0.5)"
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {/* Central Pixel Core */}
                  <motion.div
                    className="w-6 h-6 bg-gradient-to-br from-rose-500 to-teal-500 rounded-sm relative"
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
                      className="absolute -top-1 -left-1 w-2 h-2 bg-rose-400/60 rounded-sm"
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
                      className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400/60 rounded-sm"
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
                      className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400/60 rounded-sm"
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
                      className="absolute -bottom-1 -right-1 w-2 h-2 bg-indigo-400/60 rounded-sm"
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
                </motion.div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Free Stack Dev
                </h3>
              </motion.div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Crafting magical digital experiences with modern web technologies.
                Turning ideas into beautiful, functional applications.
              </p>

              {/* Fun Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { icon: Coffee, label: "Cups of Coffee", value: "∞" },
                  { icon: Code, label: "Lines of Code", value: "50K+" },
                  { icon: Zap, label: "Projects Built", value: "25+" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <stat.icon className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                    </motion.div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h4 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                Quick Navigation
              </h4>
              <div className="space-y-3">
                {[
                  { name: "About Me", href: "#about" },
                  { name: "Portfolio", href: "#portfolio" },
                  { name: "Blog", href: "#blog" },
                  { name: "Games", href: "#games" },
                  { name: "Services", href: "#services" },
                  { name: "Contact", href: "#contact" }
                ].map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.05 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Connect Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center lg:text-left"
            >
              <h4 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                Let's Connect
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Follow my journey and connect with me on social platforms
              </p>

              {/* Social Links Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {socialLinks.map(({ icon: Icon, href, label }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={(e) => handleSocialClick(label, e)}
                    className="flex items-center gap-3 p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-lg transition-all group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="p-2 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 group-hover:from-indigo-200 group-hover:to-purple-200 dark:group-hover:from-indigo-800/50 dark:group-hover:to-purple-800/50 transition-all"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>
                    <span className="font-medium text-sm">{label}</span>
                  </motion.a>
                ))}
              </div>

              {/* Newsletter Signup */}
              <motion.div
                className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-4 border border-indigo-200/50 dark:border-indigo-700/50"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    Newsletter
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                  Get notified about new projects and blog posts
                </p>

                {subscriptionSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-2"
                  >
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                      ✅ You're subscribed!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                    {/* Honeypot field - hidden from users */}
                    <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                      <label htmlFor="newsletter-website">Website (leave blank)</label>
                      <input
                        type="text"
                        id="newsletter-website"
                        name="newsletter-website"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex="-1"
                        autoComplete="off"
                      />
                    </div>

                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      pattern="[a-z0-9._%+\-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 rounded-lg bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-xs"
                    />
                    
                    {/* reCAPTCHA */}
                    {showCaptcha && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center py-2"
                      >
                        <div style={{ transform: 'scale(0.77)', transformOrigin: 'center' }}>
                          <ReCAPTCHA
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                            onChange={handleCaptchaChange}
                            onExpired={handleCaptchaExpired}
                            theme="light"
                            size="compact"
                          />
                        </div>
                      </motion.div>
                    )}
                    
                    <LoadingButton
                      type="submit"
                      isLoading={isSubscribing}
                      disabled={subscriptionSuccess}
                      loadingText="Subscribing..."
                      className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {showCaptcha ? 'Subscribe' : 'Continue to Verification'}
                    </LoadingButton>
                  </form>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-200/50 dark:border-gray-700/50 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="flex items-center justify-center lg:justify-start gap-2 text-gray-600 dark:text-gray-300 mb-2">
                Made with
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </motion.span>
                and lots of
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Coffee className="w-4 h-4 text-amber-600" />
                </motion.span>
                by Free Stack Dev
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Free Stack Dev. All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { name: 'Privacy', type: 'privacy' },
                { name: 'Terms', type: 'terms' },
                { name: 'NDA', type: 'nda' },
                { name: 'Cookies', type: 'cookies' },
              ].map((link, index) => (
                <motion.a
                  key={link.name}
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(link.type);
                  }}
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Back to Top
            </motion.button>
          </div>
        </motion.div>
      </footer>

      {/* Legal Modal */}
      <LegalModal isOpen={modalType !== null} onClose={closeModal} type={modalType} />

      <Toast
        isVisible={toast.isVisible}
        onClose={hideToast}
        title={toast.title}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
      />
    </>
  );
};

export default Footer;
