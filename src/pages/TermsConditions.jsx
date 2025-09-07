import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Scale, AlertTriangle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsConditions = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          
          <div className="text-center">
            <motion.div
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Scale className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
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
                <FileText className="w-6 h-6 text-green-500" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Acceptance of Terms</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-teal-500" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Use License</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials on Free Stack Dev's website for 
                personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Disclaimer</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                The materials on Free Stack Dev's website are provided on an 'as is' basis. Free Stack Dev makes no warranties, 
                expressed or implied, and hereby disclaims and negates all other warranties including without limitation, 
                implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
                of intellectual property or other violation of rights.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Further, Free Stack Dev does not warrant or make any representations concerning the accuracy, likely results, 
                or reliability of the use of the materials on its website or otherwise relating to such materials or on any 
                sites linked to this site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Limitations</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                In no event shall Free Stack Dev or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability to 
                use the materials on Free Stack Dev's website, even if Free Stack Dev or an authorized representative has been 
                notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow 
                limitations on implied warranties, or limitations of liability for consequential or incidental damages, 
                these limitations may not apply to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Accuracy of Materials</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                The materials appearing on Free Stack Dev's website could include technical, typographical, or photographic errors. 
                Free Stack Dev does not warrant that any of the materials on its website are accurate, complete, or current. 
                Free Stack Dev may make changes to the materials contained on its website at any time without notice. 
                However, Free Stack Dev does not make any commitment to update the materials.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Links</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Free Stack Dev has not reviewed all of the sites linked to our website and is not responsible for the 
                contents of any such linked site. The inclusion of any link does not imply endorsement by Free Stack Dev 
                of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Modifications</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Free Stack Dev may revise these terms of service for its website at any time without notice. 
                By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Governing Law</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of California, USA, 
                and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> legal@freestackdev.com<br />
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Back to Top
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsConditions;