import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type SkillBarProps = {
  name: string;
  percentage: number;
  delay?: number;
};

const SkillBar = ({ name, percentage, delay = 0 }: SkillBarProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  });
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  return (
    <div 
      className="skill-bar" 
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between mb-1">
        <span className="font-mono text-sm">{name}</span>
        <span className="text-secondary text-sm">{percentage}%</span>
      </div>
      <div className="h-3 w-full bg-background rounded-full overflow-hidden">
        <motion.div 
          className={`h-full rounded-full relative ${isHovered ? 'bg-gradient-to-r from-primary to-secondary background-shimmer' : 'bg-gradient-to-r from-primary to-secondary'}`}
          initial={{ width: 0 }}
          animate={controls}
          variants={{
            visible: { 
              width: `${percentage}%`,
              transition: { duration: 1, delay: delay } 
            }
          }}
          whileHover={{
            boxShadow: '0 0 8px rgba(var(--color-primary), 0.6)'
          }}
        >
          {isHovered && (
            <motion.div
              className="absolute inset-0 opacity-30 bg-white"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SkillBar;
