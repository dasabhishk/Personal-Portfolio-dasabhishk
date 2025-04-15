import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaAws } from 'react-icons/fa';
import { SiDotnet, SiPrometheus, SiGrafana, SiPostgresql, SiSharp, SiMysql } from 'react-icons/si';

type TechStackItemProps = {
  name: string;
  icon: string;
  color: string;
};

// All tech stack items will animate on hover, no need for filtering

const TechStackItem = ({ name, icon, color }: TechStackItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const renderIcon = () => {
    switch(name) {
      case 'AWS':
        return <FaAws size={24} color={color} />;
      case '.NET':
        return <SiDotnet size={24} color={color} />;
      case 'C#':
        return <SiSharp size={24} color={color} />;
      case 'SQL':
        return <SiMysql size={24} color={color} />;
      case 'Prometheus':
        return <SiPrometheus size={24} color={color} />;
      case 'Grafana':
        return <SiGrafana size={24} color={color} />;
      default:
        return <i className={`${icon} text-3xl`} style={{ color }}></i>;
    }
  };
  
  return (
    <motion.div 
      className="tech-stack-item p-3 bg-background rounded-lg text-center cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-tech={name.toLowerCase()}
    >
      <motion.div 
        className="h-12 flex items-center justify-center"
        // Only animate on hover and stop animation when not hovered
        initial={{ y: 0 }}
        animate={{
          y: isHovered ? [-3, 3, -3] : 0
        }}
        transition={isHovered ? {
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          times: [0, 0.5, 1]
        } : {
          duration: 0.3,
          ease: 'easeOut'
        }}
      >
        {renderIcon()}
      </motion.div>
      <p className="text-foreground mt-2 font-mono text-sm">{name}</p>
    </motion.div>
  );
};

export default TechStackItem;
