import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useLoading } from '../../contexts/LoadingContext';
import { Mail, Phone, MapPin, Send, CheckCircle, Briefcase, Calendar, MessageSquare, Zap, Globe, Users, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import LoadingButton from '../LoadingButton';
import { useHireMe } from '../../hooks/useHireMe';
import { handleFormError, withErrorHandling } from '../../utils/errorHandler.js';

const Contact = () => {
  const [ref, controls] = useScrollAnimation();
  const { startLoading, stopLoading } = useLoading();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const testimonialRef = useRef(null);

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
    startLoading('Sending your message...');

    try {
      // Submit to Formspree
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
          'Referer': window.location.href,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `Contact Form: ${formData.subject}`,
          'g-recaptcha-response': captchaToken,
          _captcha: 'recaptcha',
          _replyto: formData.email,
          _format: 'plain',
          // Hidden field to identify form type
          _form_type: 'contact_form'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setCaptchaToken(null);
      setShowCaptcha(false);
      setHoneypot('');
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      const userMessage = handleFormError(error, 'newsletter');
      alert(userMessage);
    } finally {
      setIsSubmitting(false);
      stopLoading();
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Me",
      content: "info@freestackdev.com",
      href: "mailto:info@freestackdev.com",
      description: "Get a response within 24 hours",
      color: "from-blue-500 to-indigo-500"
    },
    // {
    //   icon: Phone,
    //   title: "Call Me",
    //   content: "+1 (555) 123-4567",
    //   href: "tel:+15551234567",
    //   description: "Available Mon-Fri, 9AM-6PM PST",
    //   color: "from-green-500 to-emerald-500"
    // },
    {
      icon: MapPin,
      title: "Location",
      content: "San Francisco, CA",
      href: "#",
      description: "Open to remote & on-site work",
      color: "from-purple-500 to-violet-500"
    }
  ];

  const quickActions = [
    {
      icon: Briefcase,
      title: "Hire Me",
      description: "Start a new project together",
      action: () => {
        // Dispatch custom event to trigger hire me modal
        const event = new CustomEvent('showHireMe');
        document.dispatchEvent(event);
      },
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Calendar,
      title: "Schedule Call",
      description: "Book a free consultation",
      action: () => window.open("https://calendly.com/freestackdev", "_blank"),
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: MessageSquare,
      title: "Quick Chat",
      description: "Send a quick message",
      action: () => document.getElementById('message')?.focus(),
      color: "from-pink-500 to-rose-500"
    }
  ];

  const stats = [
    { icon: Users, label: "Happy Clients", value: "50+", color: "text-blue-500" },
    { icon: Zap, label: "Projects Done", value: "100+", color: "text-green-500" },
    { icon: Globe, label: "Countries", value: "15+", color: "text-purple-500" },
    { icon: Star, label: "5-Star Reviews", value: "48", color: "text-yellow-500" }
  ];

  const features = [
    "Free initial consultation",
    "24/7 project support",
    "Custom solutions",
    "Agile development process",
    "Transparent pricing",
    "Expert in modern tech stacks",
    "Strong focus on UX/UI",
    "SEO & performance optimization",
    "Comprehensive testing",
    "AI integration",
    "Post-launch maintenance"
  ];

  const testimonials = [
    {
      text: "Exceptional work quality and great communication throughout the project.",
      author: "Sarah Johnson",
      role: "Startup Founder",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      text: "Delivered ahead of schedule with pixel-perfect design implementation.",
      author: "Mike Chen",
      role: "Product Manager",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      text: "Best developer I've worked with. Highly recommend for any project!",
      author: "Emma Davis",
      role: "Marketing Director",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      text: "Amazing attention to detail and delivered exactly what we needed.",
      author: "James Wilson",
      role: "Tech Lead",
      avatar: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      text: "Professional, reliable, and produces high-quality work consistently.",
      author: "Lisa Anderson",
      role: "CEO",
      avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

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
    <section 
      id="contact" 
      className="relative py-20 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 dark:from-gray-900 dark:via-violet-900 dark:to-fuchsia-900 overflow-hidden"
      ref={ref}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-violet-400/10 to-fuchsia-400/10 backdrop-blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {/* Sparkle Effects */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-violet-400/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 12 + 8}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <MessageSquare className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent"
          >
            Let's Work Together
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Ready to bring your ideas to life? Let's create something amazing together! 
            Choose how you'd like to get started below.
          </motion.p>
        </motion.div>

        {/* Quick Action Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              variants={itemVariants}
              className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg cursor-pointer overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={action.action}
            >
              {/* Floating background element */}
              <motion.div
                className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 rounded-full"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <action.icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {action.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {action.description}
                </p>

                <motion.div
                  className="flex items-center text-violet-600 dark:text-violet-400 font-semibold text-sm"
                  whileHover={{ x: 5 }}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              </motion.div>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-6"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Get In Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Choose your preferred way to reach out. I'm here to help bring your project to life!
              </p>
            </div>

            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                className="group"
              >
                <motion.a
                  href={info.href}
                  className="flex items-center space-x-4 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <motion.div
                    className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center`}
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    <info.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {info.title}
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">
                      {info.content}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {info.description}
                    </p>
                  </div>
                </motion.a>
              </motion.div>
            ))}

            {/* Features List */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-violet-100/70 to-fuchsia-100/70 dark:from-violet-900/30 dark:to-fuchsia-900/30 backdrop-blur-md rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
            >
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Why Choose Me?
              </h4>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center text-green-600 dark:text-green-400 mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">Currently Available</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg relative overflow-hidden">
              {/* Form background decoration */}
              <motion.div
                className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 rounded-full"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Send a Message
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Fill out the form below and I'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        minLength={2}
                        className="w-full px-4 py-3 rounded-2xl bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all hover:bg-white/80 dark:hover:bg-gray-700/80"
                        placeholder="Your full name"
                        whileFocus={{
                          borderColor: 'rgb(139, 92, 246)',
                          boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.3)'
                        }}
                        transition={{ duration: 0.15 }}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        className="w-full px-4 py-3 rounded-2xl bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all hover:bg-white/80 dark:hover:bg-gray-700/80"
                        placeholder="your.email@example.com"
                        whileFocus={{
                          borderColor: 'rgb(139, 92, 246)',
                          boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.3)'
                        }}
                        transition={{ duration: 0.15 }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <motion.input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      minLength={3}
                      className="w-full px-4 py-3 rounded-2xl bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all hover:bg-white/80 dark:hover:bg-gray-700/80"
                      placeholder="What would you like to discuss?"
                      whileFocus={{
                        borderColor: 'rgb(139, 92, 246)',
                        boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.3)'
                      }}
                      transition={{ duration: 0.15 }}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      minLength={10}
                      rows={6}
                      className="w-full px-4 py-3 rounded-2xl bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none hover:bg-white/80 dark:hover:bg-gray-700/80"
                      placeholder="Tell me about your project..."
                      whileFocus={{
                        borderColor: 'rgb(139, 92, 246)',
                        boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.3)'
                      }}
                      transition={{ duration: 0.15 }}
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
                    onClick={handleSubmit}
                    loadingText="Sending..."
                    icon={isSuccess ? CheckCircle : Send}
                    className="group relative w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold shadow-lg overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-violet-500"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    {isSuccess ? 'Thank you! Your message has been sent.' : showCaptcha ? 'Send Message' : 'Continue to Verification'}
                  </LoadingButton>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mt-20"
        >
          <motion.h3 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100"
          >
            What Clients Say
          </motion.h3>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Testimonial Slider */}
            <div className="overflow-hidden rounded-3xl">
              <motion.div
                ref={testimonialRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.author}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <motion.div
                      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Stars */}
                      <div className="flex justify-center items-center mb-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current mx-0.5" />
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      
                      {/* Author */}
                      <div className="flex items-center justify-center gap-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full object-cover border-2 border-violet-200 dark:border-violet-700"
                        />
                        <div className="text-left">
                          <p className="font-semibold text-gray-800 dark:text-gray-100">
                            {testimonial.author}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <motion.button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </motion.button>
              
              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial
                        ? 'bg-violet-500 scale-125'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
              
              <motion.button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;