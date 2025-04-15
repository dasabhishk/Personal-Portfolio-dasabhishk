import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TechStackItem from './TechStackItem';
import SkillBar from './SkillBar';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const skills = [
    { name: 'Backend Development', percentage: 95 },
    { name: 'Cloud Architecture', percentage: 90 },
    { name: 'Database Design', percentage: 85 },
    { name: 'API Development', percentage: 92 },
    { name: 'System Architecture', percentage: 88 }
  ];
  
  const techStack = [
    { name: 'AWS', icon: 'ri-aws-fill', color: '#FF9900' },
    { name: '.NET', icon: 'ri-code-box-line', color: '#512BD4' },
    { name: 'C#', icon: 'ri-code-s-slash-line', color: '#239120' },
    { name: 'SQL', icon: 'ri-database-2-line', color: '#336791' },
    { name: 'Prometheus', icon: 'ri-bar-chart-box-line', color: '#E6522C' },
    { name: 'Grafana', icon: 'ri-dashboard-line', color: '#F46800' }
  ];
  
  const strengths = [
    { 
      title: 'Clean Code', 
      icon: 'ri-code-s-slash-line', 
      description: 'Writing maintainable, efficient, and well-documented code' 
    },
    { 
      title: 'Cloud Native', 
      icon: 'ri-cloud-line', 
      description: 'Building scalable applications for modern cloud environments' 
    },
    { 
      title: 'Data Design', 
      icon: 'ri-database-2-line', 
      description: 'Creating optimized database schemas and queries' 
    },
    { 
      title: 'Collaboration', 
      icon: 'ri-team-line', 
      description: 'Working effectively in cross-functional teams' 
    }
  ];
  
  return (
    <section 
      id="about" 
      className="py-20 relative digital-grid"
      ref={ref}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-mono font-bold inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={itemVariants}
          >
            <span className="text-primary">/</span> About Me <span className="text-primary">/</span>
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-primary mx-auto mt-4"
            initial={{ opacity: 0, width: 0 }}
            animate={controls}
            variants={{
              visible: { 
                opacity: 1, 
                width: 80,
                transition: { duration: 0.5, delay: 0.3 } 
              }
            }}
          ></motion.div>
        </div>
        
        <motion.div 
          className="flex flex-col lg:flex-row items-start gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div 
            className="w-full lg:w-1/2"
            variants={itemVariants}
          >
            <div className="bg-card p-6 rounded-lg shadow-lg glow-border">
              <h3 className="text-xl font-mono font-bold mb-4 text-secondary">Who Am I</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                I'm a passionate Software Engineer with expertise in backend development, currently working at Philips. 
                I specialize in building resilient, scalable cloud-native systems that power critical healthcare applications.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                With a strong foundation in .NET, AWS, and database technologies, I focus on creating robust architectures 
                that prioritize performance, security, and maintainability.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                and sharing knowledge with the developer community.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              {strengths.map((strength, index) => (
                <motion.div 
                  key={index}
                  className="bg-card p-5 rounded-lg shadow-md strength-item transition-all duration-300"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl text-primary mb-2">
                    <i className={strength.icon}></i>
                  </div>
                  <h4 className="font-mono font-bold text-lg mb-1">{strength.title}</h4>
                  <p className="text-sm text-muted-foreground">{strength.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2"
            variants={itemVariants}
          >
            <div className="bg-card p-6 rounded-lg shadow-lg glow-border h-full">
              <h3 className="text-xl font-mono font-bold mb-6 text-secondary">Technical Skills</h3>
              
              {/* Tech Stack Constellation */}
              <div className="mb-10">
                <h4 className="font-mono text-lg mb-4 flex items-center">
                  <i className="ri-stack-line mr-2 text-primary"></i>
                  Tech Stack Constellation
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 tech-stack-constellation">
                  {techStack.map((tech, index) => (
                    <TechStackItem 
                      key={index}
                      name={tech.name}
                      icon={tech.icon}
                      color={tech.color}
                    />
                  ))}
                </div>
              </div>
              
              {/* Skills Bars */}
              <div>
                <h4 className="font-mono text-lg mb-4 flex items-center">
                  <i className="ri-bar-chart-grouped-line mr-2 text-primary"></i>
                  Proficiency
                </h4>
                
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <SkillBar 
                      key={index}
                      name={skill.name}
                      percentage={skill.percentage}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
