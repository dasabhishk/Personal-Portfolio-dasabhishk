import { motion } from 'framer-motion';

type TimelineItemProps = {
  title: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  bullets: string[];
  tags: string[];
  isLast: boolean;
  delay?: number;
};

const TimelineItem = ({ 
  title, 
  company, 
  period, 
  location,
  description, 
  bullets, 
  tags, 
  isLast,
  delay = 0 
}: TimelineItemProps) => {
  return (
    <motion.div 
      className={`mb-12 timeline-item ${isLast ? 'mb-0' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.5, delay } 
      }}
    >
      <div className="absolute -left-6 w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center glow-border">
        <i className="ri-briefcase-line text-primary"></i>
      </div>
      <motion.div 
        className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -5 }}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
          <h3 className="text-xl font-mono font-bold text-secondary">{title}</h3>
          <div className="flex items-center mt-2 md:mt-0">
            <span className="text-muted-foreground mr-2">{company}</span>
            <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded font-mono">{period}</span>
          </div>
        </div>
        {location && (
          <div className="flex items-center mb-3 text-sm text-muted-foreground">
            <i className="ri-map-pin-line mr-1"></i>
            <span>{location}</span>
          </div>
        )}
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2">
          {bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-background text-secondary text-xs px-2 py-1 rounded font-mono">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TimelineItem;
