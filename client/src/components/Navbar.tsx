import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

type NavbarProps = {
  onAboutClick: () => void;
  onExperienceClick: () => void;
  onProjectsClick: () => void;
  onContactClick: () => void;
};

const Navbar = ({ onAboutClick, onExperienceClick, onProjectsClick, onContactClick }: NavbarProps) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background/70 border-b border-primary/20">
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-xl md:text-2xl font-mono font-bold text-primary flex items-center gap-2">
          <span className="text-muted-foreground">&lt;</span>JD<span className="text-muted-foreground">/&gt;</span>
        </a>
        
        <div className="hidden md:flex space-x-8 items-center">
          <button 
            onClick={onAboutClick}
            className="hover:text-primary transition-colors duration-300"
          >
            About
          </button>
          <button 
            onClick={onExperienceClick}
            className="hover:text-primary transition-colors duration-300"
          >
            Experience
          </button>
          <button 
            onClick={onProjectsClick}
            className="hover:text-primary transition-colors duration-300"
          >
            Projects
          </button>
          <button 
            onClick={onContactClick}
            className="hover:text-primary transition-colors duration-300"
          >
            Contact
          </button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-card hover:bg-muted transition-colors"
          >
            {isDarkMode ? (
              <i className="ri-sun-line text-secondary text-xl"></i>
            ) : (
              <i className="ri-moon-line text-secondary text-xl"></i>
            )}
          </motion.button>
        </div>
        
        <button 
          className="md:hidden text-foreground text-2xl" 
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <i className="ri-close-line"></i>
          ) : (
            <i className="ri-menu-line"></i>
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-card absolute w-full border-b border-primary/20"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button 
              onClick={() => {
                onAboutClick();
                toggleMobileMenu();
              }}
              className="hover:text-primary transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => {
                onExperienceClick();
                toggleMobileMenu();
              }}
              className="hover:text-primary transition-colors duration-300"
            >
              Experience
            </button>
            <button 
              onClick={() => {
                onProjectsClick();
                toggleMobileMenu();
              }}
              className="hover:text-primary transition-colors duration-300"
            >
              Projects
            </button>
            <button 
              onClick={() => {
                onContactClick();
                toggleMobileMenu();
              }}
              className="hover:text-primary transition-colors duration-300"
            >
              Contact
            </button>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme} 
              className="p-2 w-fit rounded-full bg-background hover:bg-muted transition-colors"
            >
              {isDarkMode ? (
                <i className="ri-sun-line text-secondary text-xl"></i>
              ) : (
                <i className="ri-moon-line text-secondary text-xl"></i>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
