import { motion } from 'framer-motion';

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  projectUrl: string;
  delay?: number;
};

const ProjectCard = ({ 
  title, 
  description, 
  tags, 
  imageUrl, 
  githubUrl, 
  projectUrl,
  delay = 0 
}: ProjectCardProps) => {
  return (
    <motion.div 
      className="bg-card rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 project-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, delay } 
      }}
      whileHover={{ y: -10 }}
    >
      <div className="h-48 bg-muted relative overflow-hidden">
        <img 
          src={imageUrl}
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-mono font-bold text-secondary mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 h-24 overflow-hidden">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="bg-background text-xs text-secondary px-2 py-1 rounded font-mono">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between">
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            <i className="ri-github-fill mr-1"></i> Source Code
          </a>
          <a 
            href={projectUrl}
            className="text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            View Project <i className="ri-arrow-right-line ml-1"></i>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
