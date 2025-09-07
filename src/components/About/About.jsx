import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import skillsData from '../../data/skills.json';
import SkillOrb from './SkillOrb';

const About = () => {
  const [ref, controls] = useScrollAnimation();

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
      id="about" 
      className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-800 dark:via-gray-900 dark:to-purple-900"
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
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent"
          >
            About Me & My Skills
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            I'm a passionate full-stack developer who loves creating beautiful, functional, and user-friendly applications. 
            With expertise in modern web technologies, I bring ideas to life through clean code and thoughtful design.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillOrb
                    key={skill.name}
                    skill={skill}
                    delay={categoryIndex * 0.2 + skillIndex * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              My Development Philosophy
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I believe in writing clean, maintainable code that not only works beautifully but also scales effortlessly. 
              Every project is an opportunity to learn something new and push the boundaries of what's possible with technology. 
              I'm passionate about creating experiences that delight users while solving real-world problems.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;