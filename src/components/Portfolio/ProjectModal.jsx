import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, Code } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/useToast';
import Toast from '../Toast';

const ProjectModal = ({ project, onClose }) => {
  const { toast, hideToast, showComingSoon } = useToast();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Reset image loaded state when project changes
    setImageLoaded(false);
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleProjectLink = (type, url, e) => {
    e.preventDefault();
    if (!url || url.trim() === '' || url === '#') {
      showComingSoon(`${type} link`);
    } else {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl"
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
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative">
            <motion.img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 md:h-80 object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h2>
              <div className="flex items-center gap-4">
                <motion.a
                  href={project.liveUrl}
                  onClick={(e) => handleProjectLink('Live demo', project.liveUrl, e)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </motion.a>
                <motion.a
                  href={project.githubUrl}
                  onClick={(e) => handleProjectLink('Source code', project.githubUrl, e)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </motion.a>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  About This Project
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 rounded-full font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                  <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    Project Details
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Category</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {project.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Status</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        Completed
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Platform</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {project.category === 'mobile' ? 'iOS & Android' : 'Web'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                  <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">
                    Quick Links
                  </h4>
                  <div className="space-y-2">
                    <motion.a
                      href={project.liveUrl}
                      onClick={(e) => handleProjectLink('Live project', project.liveUrl, e)}
                      className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live Project
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      onClick={(e) => handleProjectLink('Source code', project.githubUrl, e)}
                      className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <Toast
        isVisible={toast.isVisible}
        onClose={hideToast}
        title={toast.title}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
      />
    </AnimatePresence>
  );
};

export default ProjectModal;