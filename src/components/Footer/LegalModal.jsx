import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Scale, Lock, Cookie } from 'lucide-react';
import { useEffect } from 'react';
import { useLoading } from '../../contexts/LoadingContext';

const LegalModal = ({ isOpen, onClose, type }) => {
  const { stopLoading } = useLoading();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Stop loading after modal content is rendered
      const timer = setTimeout(() => {
        stopLoading();
      }, 300);
      
      // ESC key handler
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEsc);
      
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEsc);
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose, stopLoading]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getModalConfig = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: Shield,
          color: 'blue',
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Information We Collect</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  We collect information you provide directly to us, such as when you contact us through our contact form, 
                  subscribe to our newsletter, or interact with our services. This may include:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Name and email address</li>
                  <li>Message content and subject line</li>
                  <li>Technical information about your device and browser</li>
                  <li>Usage data and analytics information</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">How We Use Your Information</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you updates about our services and projects</li>
                  <li>Improve our website and user experience</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Data Security</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Contact Us</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at privacy@freestackdev.com
                </p>
              </section>
            </div>
          )
        };
      
      case 'terms':
        return {
          title: 'Terms & Conditions',
          icon: Scale,
          color: 'green',
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Acceptance of Terms</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Use License</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of the materials on Free Stack Dev's website for 
                  personal, non-commercial transitory viewing only. Under this license you may not:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to reverse engineer any software</li>
                  <li>Remove any copyright or proprietary notations</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Disclaimer</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  The materials on this website are provided on an 'as is' basis. Free Stack Dev makes no warranties, 
                  expressed or implied, and hereby disclaims all other warranties including merchantability, 
                  fitness for a particular purpose, or non-infringement of intellectual property.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Contact Information</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  If you have any questions about these Terms & Conditions, please contact us at legal@freestackdev.com
                </p>
              </section>
            </div>
          )
        };
      
      case 'nda':
        return {
          title: 'NDA Policy',
          icon: Lock,
          color: 'purple',
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Overview</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  This Non-Disclosure Agreement (NDA) Policy outlines our commitment to protecting confidential information 
                  shared during business discussions, project consultations, and development collaborations.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Confidential Information</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Confidential information includes, but is not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Business plans, strategies, and financial information</li>
                  <li>Technical specifications, source code, and algorithms</li>
                  <li>Customer lists, user data, and market research</li>
                  <li>Product roadmaps and design documents</li>
                  <li>Trade secrets and intellectual property</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Our Obligations</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  We commit to the following regarding confidential information:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Non-disclosure to any third party without consent</li>
                  <li>Limited use only for agreed project purposes</li>
                  <li>Secure storage with appropriate access controls</li>
                  <li>Return or destruction upon request</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Contact for NDA</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To request a formal NDA or discuss confidentiality requirements, contact us at nda@freestackdev.com
                </p>
              </section>
            </div>
          )
        };
      
      case 'cookies':
        return {
          title: 'Cookies Policy',
          icon: Cookie,
          color: 'orange',
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">What Are Cookies?</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Cookies are small text files stored on your device when you visit our website. They help us provide 
                  you with a better experience by remembering your preferences and understanding how you use our site.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Types of Cookies We Use</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Essential Cookies</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Necessary for the website to function properly. Cannot be disabled.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Functional Cookies</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Remember your preferences like theme settings and language.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Managing Cookies</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  You can control cookies through your browser settings. Most browsers allow you to block all cookies, 
                  accept only first-party cookies, or delete existing cookies.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Contact Us</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Questions about our cookie usage? Contact us at cookies@freestackdev.com
                </p>
              </section>
            </div>
          )
        };
      
      default:
        return {
          title: 'Legal Information',
          icon: Shield,
          color: 'gray',
          content: <p>Content not available.</p>
        };
    }
  };

  const config = getModalConfig();
  const Icon = config.icon;

  const colorClasses = {
    blue: 'from-blue-500 to-indigo-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-violet-500',
    orange: 'from-orange-500 to-amber-500',
    gray: 'from-gray-500 to-slate-500'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
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
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className={`relative px-8 py-6 bg-gradient-to-r ${colorClasses[config.color]} text-white`}>
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <h2 id="modal-title" className="text-2xl font-bold">
                  {config.title}
                </h2>
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

            {/* Content */}
            <div 
              className="px-8 py-6 max-h-[60vh] overflow-y-auto modal-content"
              style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* Internet Explorer 10+ */
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {config.content}
              </motion.div>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
                <motion.button
                  onClick={onClose}
                  className={`px-6 py-2 rounded-full bg-gradient-to-r ${colorClasses[config.color]} text-white font-medium shadow-lg hover:shadow-xl transition-all`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;