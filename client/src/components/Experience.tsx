import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TimelineItem from './TimelineItem';

const Experience = () => {
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
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };
  
  const experienceItems = [
    {
      title: 'Software Engineer',
      company: 'Philips',
      period: '2021 - Present',
      description: 'Leading backend development for healthcare imaging systems using .NET Core, AWS services, and SQL databases.',
      bullets: [
        'Designed and implemented microservices architecture for medical data processing',
        'Optimized database queries improving response time by 40%',
        'Implemented CI/CD pipelines using AWS CodePipeline',
        'Set up monitoring using Prometheus and Grafana dashboards'
      ],
      tags: ['.NET Core', 'AWS', 'SQL', 'Docker', 'Kubernetes']
    },
    {
      title: 'Backend Developer',
      company: 'Healthcare Tech Inc.',
      period: '2018 - 2021',
      description: 'Developed and maintained backend services for patient management systems using C# and SQL Server.',
      bullets: [
        'Built RESTful APIs serving over 10,000 daily active users',
        'Migrated legacy systems to cloud infrastructure',
        'Implemented data encryption standards for HIPAA compliance',
        'Created automated test suites achieving 90% code coverage'
      ],
      tags: ['C#', 'SQL Server', 'Azure', 'Redis']
    },
    {
      title: 'Software Developer',
      company: 'Tech Solutions Group',
      period: '2016 - 2018',
      description: 'Full-stack development with focus on backend technologies and database optimization.',
      bullets: [
        'Developed web applications using ASP.NET MVC framework',
        'Designed and implemented database schemas for various clients',
        'Created internal development tools to improve team efficiency',
        'Mentored junior developers in best practices and coding standards'
      ],
      tags: ['ASP.NET', 'JavaScript', 'PostgreSQL', 'Git']
    }
  ];
  
  return (
    <section 
      id="experience" 
      className="py-20 relative"
      ref={ref}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-mono font-bold inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.5 } 
              }
            }}
          >
            <span className="text-primary">/</span> Experience <span className="text-primary">/</span>
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
        
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="relative border-l-2 border-primary ml-6 pl-8 pb-8 timeline-container"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {experienceItems.map((item, index) => (
              <TimelineItem
                key={index}
                title={item.title}
                company={item.company}
                period={item.period}
                description={item.description}
                bullets={item.bullets}
                tags={item.tags}
                isLast={index === experienceItems.length - 1}
                delay={index * 0.2}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
