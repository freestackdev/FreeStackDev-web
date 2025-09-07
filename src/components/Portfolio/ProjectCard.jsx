import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useLoading } from '../../contexts/LoadingContext';
import { useToast } from '../../hooks/useToast';
import { loadImageSecurely } from '../../utils/imageLoader';

const ProjectCard = ({ project, delay = 0, onClick }) => {
  const { startLoading, stopLoading } = useLoading();
  const { showComingSoon } = useToast();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Securely load project image
  useEffect(() => {
    if (project.image) {
      loadImageSecurely(project.image)
        .then(() => setImageLoaded(true))
        .catch((error) => {
          console.error('Failed to load project image:', error);
          setImageError(true);
        });
    }
  }, [project.image]);

  const handleCardClick = () => {
    startLoading('Loading project details...');
    onClick();
    setTimeout(() => {
      stopLoading();
    }, 300);
  };

  const handleProjectLink = (type, url, e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!url || url.trim() === '' || url === '#') {
      showComingSoon(`${type} link`);
    } else {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg cursor-pointer"
      whileHover={{ 
        scale: 1.02, 
        y: -8,
        boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
      }}
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        {imageError ? (
          <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Image unavailable</span>
          </div>
        ) : (
          <img 
            src={project.image} 
            alt={project.title}
            className={`w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            crossOrigin="anonymous"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.a
            href={project.githubUrl}
            onClick={(e) => handleProjectLink('Source code', project.githubUrl, e)}
            className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-4 h-4" />
          </motion.a>
          <motion.a
            href={project.liveUrl}
            onClick={(e) => handleProjectLink('Live demo', project.liveUrl, e)}
            className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 text-xs rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
            {project.category}
          </span>
          <motion.div
            className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium"
            whileHover={{ x: 5 }}
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;