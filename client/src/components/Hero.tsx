import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type HeroProps = {
  onContactClick: () => void;
  onProjectsClick: () => void;
};

const Hero = ({ onContactClick, onProjectsClick }: HeroProps) => {
  const [text, setText] = useState('');
  const fullText = 'Building resilient cloud-native backend systems';
  
  useEffect(() => {
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
    
    return () => clearInterval(typeInterval);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      }
    }
  };
  
  return (
    <section className="min-h-screen relative flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 z-10 pt-20">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-mono font-bold mb-4"
              variants={itemVariants}
            >
              <span className="block text-foreground leading-tight">John Doe</span>
              <span className="block text-primary mt-2">Software Engineer</span>
            </motion.h1>
            
            <motion.div 
              className="flex items-baseline mt-4 mb-8 justify-center md:justify-start"
              variants={itemVariants}
            >
              <h2 className="text-xl md:text-2xl font-mono text-foreground opacity-90">
                {text}
              </h2>
              <span className="typewriter-cursor"></span>
            </motion.div>
            
            <motion.p 
              className="text-muted-foreground max-w-md mx-auto md:mx-0 mb-8"
              variants={itemVariants}
            >
              Backend specialist at Philips, working with .NET, AWS ecosystem, and SQL to create scalable and maintainable systems.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card text-foreground hover:text-primary transition-colors"
              >
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card text-foreground hover:text-primary transition-colors"
              >
                <i className="ri-github-fill text-xl"></i>
              </a>
              <a 
                href="mailto:john.doe@example.com" 
                className="p-3 rounded-full bg-card text-foreground hover:text-primary transition-colors"
              >
                <i className="ri-mail-fill text-xl"></i>
              </a>
            </motion.div>
            
            <motion.div 
              className="mt-12 flex justify-center md:justify-start"
              variants={itemVariants}
            >
              <motion.button
                onClick={onProjectsClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium flex items-center justify-center glow-border"
              >
                View Projects
                <i className="ri-arrow-right-line ml-2"></i>
              </motion.button>
              
              <motion.button
                onClick={onContactClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-primary text-primary rounded-md ml-4 hover:bg-primary/10 transition-colors font-medium"
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
          
          <div className="hidden md:block w-full md:w-1/2">
            {/* This area is intentionally left empty as it will be filled by the ThreeJS canvas */}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#" className="text-foreground opacity-50 hover:opacity-100 transition-opacity">
          <i className="ri-arrow-down-line text-2xl"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
