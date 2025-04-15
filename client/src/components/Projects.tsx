import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './ProjectCard';

const Projects = () => {
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
  
  const projects = [
    {
      title: 'Healthcare Data Pipeline',
      description: 'A scalable ETL pipeline for processing and analyzing healthcare data from multiple sources. Built with AWS Lambda, S3, and DynamoDB with a focus on HIPAA compliance and data security.',
      tags: ['AWS', 'Lambda', 'DynamoDB', 'Python'],
      imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com',
      projectUrl: '#'
    },
    {
      title: 'Microservices Framework',
      description: 'A lightweight framework for building microservices in .NET Core with integrated service discovery, circuit breakers, and distributed tracing capabilities.',
      tags: ['.NET Core', 'Docker', 'Kubernetes', 'gRPC'],
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com',
      projectUrl: '#'
    },
    {
      title: 'SQL Query Optimizer',
      description: 'A tool for analyzing and optimizing SQL queries for performance. Features query analysis, index recommendations, and visualization of query execution plans.',
      tags: ['C#', 'SQL', 'WPF', 'LINQ'],
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com',
      projectUrl: '#'
    },
    {
      title: 'Serverless Analytics',
      description: 'A serverless application for real-time analytics processing. Uses AWS Lambda, API Gateway, and DynamoDB with WebSocket connections for live dashboard updates.',
      tags: ['AWS', 'Serverless', 'WebSockets', 'Node.js'],
      imageUrl: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com',
      projectUrl: '#'
    },
    {
      title: 'API Gateway Framework',
      description: 'A lightweight API gateway solution with rate limiting, JWT authentication, and request/response transformation capabilities for microservice architectures.',
      tags: ['.NET Core', 'Redis', 'JWT', 'OWIN'],
      imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com',
      projectUrl: '#'
    },
    {
      title: 'Monitoring Dashboard',
      description: 'A custom monitoring dashboard built with Grafana and Prometheus for visualizing application metrics, logs, and system health information with alerting capabilities.',
      tags: ['Grafana', 'Prometheus', 'Docker', 'InfluxDB'],
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com',
      projectUrl: '#'
    }
  ];
  
  return (
    <section 
      id="projects" 
      className="py-20 relative digital-grid"
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
            <span className="text-primary">/</span> Projects <span className="text-primary">/</span>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageUrl={project.imageUrl}
              githubUrl={project.githubUrl}
              projectUrl={project.projectUrl}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
