import { motion } from 'framer-motion';
import { ArrowLeft, Lock, FileCheck, Shield, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NDAPolicy = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          
          <div className="text-center">
            <motion.div
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Lock className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              NDA Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Non-Disclosure Agreement & Confidentiality Policy
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
                <FileCheck className="w-6 h-6 text-purple-500" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Overview</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                This Non-Disclosure Agreement (NDA) Policy outlines our commitment to protecting confidential information 
                shared during business discussions, project consultations, and development collaborations. We understand 
                the importance of maintaining strict confidentiality in all professional relationships.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 border-l-4 border-purple-500">
                <p className="text-purple-800 dark:text-purple-200 font-medium">
                  <strong>Commitment:</strong> All client information, project details, business strategies, and proprietary 
                  data are treated with the highest level of confidentiality and security.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-violet-500" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Confidential Information</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Confidential information includes, but is not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Business plans, strategies, and financial information</li>
                <li>Technical specifications, source code, and proprietary algorithms</li>
                <li>Customer lists, user data, and market research</li>
                <li>Product roadmaps, feature specifications, and design documents</li>
                <li>Trade secrets, know-how, and intellectual property</li>
                <li>Any information marked as confidential or that would reasonably be considered confidential</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-indigo-500" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Our Obligations</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We commit to the following obligations regarding confidential information:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Non-Disclosure</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We will not disclose confidential information to any third party without explicit written consent.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Limited Use</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Information will only be used for the specific purpose of the agreed project or consultation.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Secure Storage</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    All confidential materials are stored securely with appropriate access controls and encryption.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Return/Destruction</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Upon request or project completion, all confidential materials will be returned or securely destroyed.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Exceptions</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                This NDA does not apply to information that:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Is or becomes publicly available through no breach of this agreement</li>
                <li>Was known to us prior to disclosure by the client</li>
                <li>Is independently developed without use of confidential information</li>
                <li>Is required to be disclosed by law or court order</li>
                <li>Is approved for release by written authorization from the client</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Duration</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                This confidentiality obligation remains in effect indefinitely, unless otherwise specified in a separate 
                written agreement. The obligation continues even after the completion of any project or termination of 
                our business relationship.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Security Measures</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We implement industry-standard security measures to protect confidential information:
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-6">
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Encrypted storage and transmission of all sensitive data</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Regular security audits and updates</li>
                  <li>Secure development practices and code reviews</li>
                  <li>Employee training on confidentiality and data protection</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Mutual NDA</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                For projects requiring mutual confidentiality, we are happy to sign a bilateral NDA that protects both 
                parties' confidential information. We can work with your existing NDA template or provide our standard 
                mutual NDA agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Contact for NDA</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To request a formal NDA or discuss confidentiality requirements for your project:
              </p>
              <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> nda@freestackdev.com<br />
                  <strong>Legal Contact:</strong> legal@freestackdev.com<br />
                  <strong>Response Time:</strong> Within 24 hours for NDA requests
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Back to Top
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NDAPolicy;