import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Copy, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import blogsData from '../../data/blogs.json';
import { isCSPAllowed } from '../../utils/security';

const BlogModal = ({ blog, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Get related blogs based on shared tags
    const related = blogsData
      .filter(b => b.id !== blog.id && b.tags.some(tag => blog.tags.includes(tag)))
      .slice(0, 3);
    setRelatedBlogs(related);

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [blog]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const shareUrl = `${window.location.origin}/blog/${blog.slug}`;

  const handleShare = async (platform) => {
    const text = `Check out this blog post: ${blog.title}`;
    
    switch (platform) {
      case 'copy':
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy URL');
        }
        break;
      case 'twitter':
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        if (isCSPAllowed(twitterUrl, 'connect')) {
          window.open(twitterUrl, '_blank', 'noopener,noreferrer');
        }
        break;
      case 'facebook':
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        if (isCSPAllowed(facebookUrl, 'connect')) {
          window.open(facebookUrl, '_blank', 'noopener,noreferrer');
        }
        break;
      case 'linkedin':
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        if (isCSPAllowed(linkedinUrl, 'connect')) {
          window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
        }
        break;
    }
  };

  const renderContent = (content) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const codeContent = part.slice(3, -3);
        const lines = codeContent.split('\n');
        const language = lines[0] || 'javascript';
        const code = lines.slice(1).join('\n');
        
        return (
          <div key={index} className="my-6">
            <SyntaxHighlighter
              language={language}
              style={oneDark}
              customStyle={{
                borderRadius: '12px',
                padding: '20px',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        );
      } else {
        return part.split('\n\n').map((paragraph, pIndex) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={`${index}-${pIndex}`} className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">
                {paragraph.replace('## ', '').trim()}
              </h2>
            );
          } else if (paragraph.startsWith('# ')) {
            return (
              <h1 key={`${index}-${pIndex}`} className="text-3xl font-bold mt-8 mb-6 text-gray-800 dark:text-gray-100">
                {paragraph.replace('# ', '').trim()}
              </h1>
            );
          } else if (paragraph.trim()) {
            return (
              <p key={`${index}-${pIndex}`} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {paragraph.trim()}
              </p>
            );
          }
          return null;
        });
      }
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl my-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
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
          {/* Header */}
          <div className="relative">
            <img 
              src={blog.image} 
              alt={blog.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title and Meta */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {blog.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(blog.publishDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {blog.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Share Buttons */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Share this article
              </h3>
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => handleShare('twitter')}
                  className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => handleShare('facebook')}
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Facebook className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => handleShare('copy')}
                  className={`p-2 rounded-full transition-colors ${
                    copied 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Copy className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {renderContent(blog.content)}
            </div>

            {/* Related Blogs */}
            {relatedBlogs.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                  Related Articles
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedBlogs.map((relatedBlog) => (
                    <motion.div
                      key={relatedBlog.id}
                      className="group cursor-pointer bg-gray-50 dark:bg-gray-700/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.02, y: -4 }}
                      onClick={() => {
                        // Close current modal and open the related blog
                        onClose();
                        // Small delay to allow closing animation to complete
                        setTimeout(() => {
                          // Find the blog modal component and open with new blog
                          const blogSection = document.getElementById('blog');
                          if (blogSection) {
                            // Trigger opening of new blog modal
                            // This will be handled by the parent Blog component
                            const event = new CustomEvent('openBlogModal', { 
                              detail: { blog: relatedBlog } 
                            });
                            document.dispatchEvent(event);
                          }
                        }, 300);
                      }}
                    >
                      <img 
                        src={relatedBlog.image} 
                        alt={relatedBlog.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {relatedBlog.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {relatedBlog.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                          <span>{relatedBlog.readTime}</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Blog Button */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <motion.button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogModal;