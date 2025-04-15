import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

type FooterProps = {
  onLogoClick: () => void;
};

const Footer = ({ onLogoClick }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const [isLogoWiggling, setIsLogoWiggling] = useState(false);
  
  const handleLogoClick = useCallback(() => {
    setIsLogoWiggling(true);
    setTimeout(() => setIsLogoWiggling(false), 800); // Duration of wiggle animation
    onLogoClick(); // Scroll to top
  }, [onLogoClick]);
  
  return (
    <footer className="py-8 bg-background border-t border-primary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a 
              href="#" 
              className="text-xl font-mono font-bold flex items-center gap-2 cursor-pointer"
              onClick={handleLogoClick}
            >
              <motion.span 
                className={`text-muted-foreground ${isLogoWiggling ? 'animate-wiggle' : ''}`}
                whileTap={{ scale: 0.95 }}
              >
                &lt;
              </motion.span>
              <span className="logo-flash logo-text">
                ABD
              </span>
              <motion.span 
                className={`text-muted-foreground ${isLogoWiggling ? 'animate-wiggle' : ''}`}
                whileTap={{ scale: 0.95 }}
              >
                /&gt;
              </motion.span>
            </a>
          </div>
          
          <div className="text-muted-foreground text-sm">
            &copy; {currentYear} Abhishek Das. All rights reserved.
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <motion.a 
              href="#" 
              onClick={onLogoClick}
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="ri-arrow-up-circle-line text-2xl"></i>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
