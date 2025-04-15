import { useEffect } from 'react';
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
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  return (
    <div className="skill-bar" ref={ref}>
      <div className="flex justify-between mb-1">
        <span className="font-mono text-sm">{name}</span>
        <span className="text-secondary text-sm">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-background rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          animate={controls}
          variants={{
            visible: { 
              width: `${percentage}%`,
              transition: { duration: 1, delay: delay } 
            }
          }}
        ></motion.div>
      </div>
    </div>
  );
};

export default SkillBar;
