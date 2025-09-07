import { motion } from 'framer-motion';
import { ArrowLeft, Cookie, Settings, BarChart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookiesPolicy = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-orange-900 dark:to-amber-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          
          <div className="text-center">
            <motion.div
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cookie className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Cookies Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              How we use cookies and similar technologies
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">What Are Cookies?</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Cookies are small text files that are stored on your computer or mobile device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6 border-l-4 border-orange-500">
                <p className="text-orange-800 dark:text-orange-200">
                  <strong>Important:</strong> We use cookies responsibly and transparently. You have full control over 
                  which cookies you accept, and you can change your preferences at any time.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-6 h-6 text-amber-500" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Types of Cookies We Use</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Essential Cookies
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    These cookies are necessary for the website to function properly. They cannot be disabled.
                  </p>
                  <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <li>• Session management</li>
                    <li>• Security features</li>
                    <li>• Basic functionality</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-500" />
                    Functional Cookies
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    These cookies remember your preferences and provide enhanced features.
                  </p>
                  <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <li>• Theme preferences (dark/light mode)</li>
                    <li>• Language settings</li>
                    <li>• Form data retention</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-purple-500" />
                    Analytics Cookies
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    These cookies help us understand how visitors interact with our website.
                  </p>
                  <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <li>• Page views and traffic</li>
                    <li>• User behavior patterns</li>
                    <li>• Performance metrics</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <Cookie className="w-5 h-5 text-green-500" />
                    Marketing Cookies
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    These cookies are used to deliver relevant advertisements and track campaign effectiveness.
                  </p>
                  <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <li>• Personalized ads</li>
                    <li>• Social media integration</li>
                    <li>• Campaign tracking</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We may use third-party services that set their own cookies. These include:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>EmailJS:</strong> For contact form functionality and email services</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing and integration features</li>
                  <li><strong>CDN Services:</strong> For faster content delivery and performance optimization</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                You have several options for managing cookies:
              </p>
              
              <div className="space-y-4">
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Browser Settings</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Most browsers allow you to control cookies through their settings. You can block all cookies, 
                    accept only first-party cookies, or delete existing cookies.
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Cookie Banner</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    When you first visit our site, you'll see a cookie banner where you can accept or decline 
                    non-essential cookies.
                  </p>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Opt-Out Links</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    For third-party cookies, you can often opt out directly through the service provider's website 
                    or privacy settings.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Impact of Disabling Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                While you can disable cookies, please note that this may affect your experience on our website:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Some features may not work properly or at all</li>
                <li>Your preferences (like theme settings) won't be remembered</li>
                <li>You may need to re-enter information on each visit</li>
                <li>We won't be able to provide personalized content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Updates to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We may update this Cookies Policy from time to time to reflect changes in our practices or for other 
                operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
                updated policy on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                If you have any questions about our use of cookies or this policy, please contact us:
              </p>
              <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> cookies@freestackdev.com<br />
                  <strong>Privacy Contact:</strong> privacy@freestackdev.com<br />
                  <strong>Address:</strong> 123 Developer Street, San Francisco, CA 94102
                </p>
              </div>
            </section>
          </div>
        </motion.div>

        {/* Back to Top */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Back to Top
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiesPolicy;