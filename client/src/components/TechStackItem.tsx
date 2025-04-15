import { motion } from 'framer-motion';
import { useState } from 'react';

type TechStackItemProps = {
  name: string;
  icon: string;
  color: string;
};

// List of tech that should have hover animations
const ANIMATED_TECHS = ['.NET', 'C#', 'SQL', 'Prometheus', 'Grafana'];

const TechStackItem = ({ name, icon, color }: TechStackItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldAnimate = ANIMATED_TECHS.includes(name);
  
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
        animate={{
          y: shouldAnimate && isHovered ? [-3, 3, -3] : 0
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          times: [0, 0.5, 1]
        }}
      >
        <i className={`${icon} text-3xl`} style={{ color }}></i>
      </motion.div>
      <p className="text-foreground mt-2 font-mono text-sm">{name}</p>
    </motion.div>
  );
};

export default TechStackItem;
