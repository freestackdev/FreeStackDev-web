import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Code, Smartphone, Globe, Database, Zap, Heart } from 'lucide-react';

const Services = () => {
  const [ref, controls] = useScrollAnimation();

  const services = [
    {
      icon: Code,
      title: "Full-Stack MERN Development",
      description: "Complete web applications using MongoDB, Express.js, React, and Node.js with modern architecture and best practices.",
      features: ["RESTful APIs", "Database Design", "Authentication", "Real-time Features"]
    },
    {
      icon: Smartphone,
      title: "Hybrid Mobile Apps",
      description: "Cross-platform mobile applications using React Native and Flutter for both iOS and Android platforms.",
      features: ["React Native", "Flutter", "Push Notifications", "App Store Deployment"]
    },
    {
      icon: Globe,
      title: "Single Page Applications",
      description: "Fast, responsive SPAs with modern frameworks, optimized performance, and seamless user experiences.",
      features: ["React/Next.js", "Vue.js", "Progressive Web Apps", "Performance Optimization"]
    },
    {
      icon: Database,
      title: "API Design & Development",
      description: "Robust, scalable APIs with comprehensive documentation, security, and performance optimization.",
      features: ["RESTful Design", "GraphQL", "API Documentation", "Security Implementation"]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed up your existing applications with code optimization, caching strategies, and performance monitoring.",
      features: ["Code Splitting", "Lazy Loading", "Caching", "Monitoring"]
    },
    {
      icon: Heart,
      title: "UI/UX Development",
      description: "Beautiful, intuitive user interfaces with modern design principles and accessibility standards.",
      features: ["Responsive Design", "Accessibility", "Animation", "User Testing"]
    }
  ];

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
      id="services" 
      className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-teal-900 dark:to-cyan-900"
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
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
          >
            What I Offer
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            From concept to deployment, I provide comprehensive development services to bring your digital ideas to life 
            with modern technologies and best practices.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden"
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
              }}
            >
              {/* Floating orb effect */}
              <motion.div
                className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                    >
                      <motion.div
                        className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mr-3"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: featureIndex * 0.2 
                        }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50"
                  whileHover={{ x: 5 }}
                >
                  <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium cursor-pointer">
                    Learn More
                    <motion.svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;