import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useLoading } from '../../contexts/LoadingContext';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import blogsData from '../../data/blogs.json';
import BlogModal from './BlogModal';

const Blog = () => {
  const [ref, controls] = useScrollAnimation();
  const { startLoading, stopLoading } = useLoading();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [filter, setFilter] = useState('all');

  // Listen for custom events to open blog modals from related articles
  useEffect(() => {
    const handleOpenBlogModal = (event) => {
      startLoading('Loading blog post...');
      setSelectedBlog(event.detail.blog);
      setTimeout(() => {
        stopLoading();
      }, 500);
    };

    document.addEventListener('openBlogModal', handleOpenBlogModal);
    
    return () => {
      document.removeEventListener('openBlogModal', handleOpenBlogModal);
    };
  }, []);

  // Handle blog modal opening with loading
  useEffect(() => {
    if (selectedBlog) {
      setTimeout(() => {
        stopLoading();
      }, 500);
    }
  }, [selectedBlog, stopLoading]);

  // Get unique tags from all blogs
  const allTags = [...new Set(blogsData.flatMap(blog => blog.tags))];
  const categories = ['all', ...allTags];

  // Filter blogs based on selected category
  const filteredBlogs = filter === 'all' 
    ? blogsData 
    : blogsData.filter(blog => blog.tags.includes(filter));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      <section 
        id="blog" 
        className="py-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-cyan-900 dark:to-blue-900"
        ref={ref}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
            >
              Developer Blog
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Insights, tutorials, and thoughts on modern web development, mobile apps, and emerging technologies. 
              Learn from real-world experiences and practical examples.
            </motion.p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-50/70 dark:hover:bg-gray-700/70'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          {/* Blog Grid */}
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                layout
                variants={itemVariants}
                className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg cursor-pointer"
                whileHover={{ 
                  scale: 1.02, 
                  y: -8,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
                }}
                onClick={() => {
                  startLoading('Loading blog post...');
                  setSelectedBlog(blog);
                }}
              >
                {/* Blog Image */}
                <div className="relative overflow-hidden h-48">
                  <motion.img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Read Time Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {blog.readTime}
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/50 dark:to-blue-900/50 text-cyan-700 dark:text-cyan-300 text-xs rounded-full font-medium flex items-center gap-1"
                      >
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium">
                        +{blog.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {blog.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.publishDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <motion.div
                    className="flex items-center justify-between"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-cyan-600 dark:text-cyan-400 text-sm font-medium flex items-center gap-2">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredBlogs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No blogs found for the selected category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Blog Modal */}
      {selectedBlog && (
        <BlogModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}
    </>
  );
};

export default Blog;