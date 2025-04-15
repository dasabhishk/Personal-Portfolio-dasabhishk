import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-background border-t border-primary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="text-xl font-mono font-bold text-primary flex items-center gap-2">
              <span className="text-muted-foreground">&lt;</span>ABD<span className="text-muted-foreground">/&gt;</span>
            </a>
          </div>
          
          <div className="text-muted-foreground text-sm">
            &copy; {currentYear} Abhishek Das. All rights reserved.
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <motion.a 
              href="#" 
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
