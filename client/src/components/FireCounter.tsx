import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const FireCounter = () => {
  const [count, setCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const { toast } = useToast();
  
  // Fetch the current fire counter
  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await fetch('/api/fire-counter');
        const data = await response.json();
        setCount(data.count || 0);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching fire counter:', error);
        setIsLoading(false);
      }
    };
    
    fetchCounter();
  }, []);
  
  // Function to trigger the fire animation
  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1500);
  };
  
  // Handle click to increment the fire counter
  const handleClick = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      const response = await fetch('/api/fire-counter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setCount(data.count || count + 1);
        triggerAnimation();
        toast({
          title: 'Thanks for the 🔥!',
          description: 'Your vote has been counted.',
        });
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to update counter. Try again later.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error updating fire counter:', error);
      toast({
        title: 'Error',
        description: 'Failed to update counter. Try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.button
        onClick={handleClick}
        disabled={isUpdating || isLoading}
        className="relative text-4xl cursor-pointer p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="sr-only">Fire Rating</span>
        <motion.div className="relative inline-block">
          {/* Glowing background effect */}
          {isAnimating && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-md -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.7, 0],
                scale: [0.8, 1.5, 1.8],
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          )}
          
          <motion.span
            className="inline-block"
            animate={isAnimating ? {
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            🔥
          </motion.span>
        </motion.div>
        
        {/* Animated fire particles when clicked */}
        {isAnimating && (
          <>
            {/* First particle group - flames */}
            <motion.span
              className="absolute text-xl"
              initial={{ opacity: 1, scale: 0.5, top: '50%', left: '50%' }}
              animate={{ 
                opacity: 0,
                scale: 0.3,
                top: '0%',
                left: '30%',
                rotate: 45
              }}
              transition={{ duration: 1.5 }}
            >
              🔥
            </motion.span>
            <motion.span
              className="absolute text-xl"
              initial={{ opacity: 1, scale: 0.5, top: '50%', left: '50%' }}
              animate={{ 
                opacity: 0,
                scale: 0.3,
                top: '0%',
                left: '70%',
                rotate: -45
              }}
              transition={{ duration: 1.5 }}
            >
              🔥
            </motion.span>
            
            {/* Second particle group - sparks */}
            <motion.div
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              initial={{ opacity: 1, top: '50%', left: '50%' }}
              animate={{ 
                opacity: 0,
                top: '20%',
                left: '45%',
                scale: [1, 0.5]
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.div
              className="absolute w-1 h-1 bg-orange-500 rounded-full"
              initial={{ opacity: 1, top: '50%', left: '50%' }}
              animate={{ 
                opacity: 0,
                top: '10%',
                left: '55%',
                scale: [1, 0.5]
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            <motion.div
              className="absolute w-2 h-2 bg-red-500 rounded-full"
              initial={{ opacity: 1, top: '50%', left: '50%' }}
              animate={{ 
                opacity: 0,
                top: '30%',
                left: '60%',
                scale: [1, 0.5]
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.div
              className="absolute w-1 h-1 bg-yellow-500 rounded-full"
              initial={{ opacity: 1, top: '50%', left: '50%' }}
              animate={{ 
                opacity: 0,
                top: '25%',
                left: '40%',
                scale: [1, 0.5]
              }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
            
            {/* Third particle group - embers */}
            <motion.div
              className="absolute w-1 h-1 bg-amber-500 rounded-full"
              initial={{ opacity: 1, top: '50%', left: '50%' }}
              animate={{ 
                opacity: [1, 0.8, 0],
                top: ['50%', '30%', '10%'],
                left: ['50%', '48%', '46%'],
                scale: [1, 0.8, 0.2]
              }}
              transition={{ duration: 1.2, ease: "easeOut", times: [0, 0.7, 1] }}
            />
            <motion.div
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              initial={{ opacity: 1, top: '50%', left: '50%' }}
              animate={{ 
                opacity: [1, 0.8, 0],
                top: ['50%', '30%', '15%'],
                left: ['50%', '52%', '54%'],
                scale: [1, 0.8, 0.2]
              }}
              transition={{ duration: 1.3, ease: "easeOut", times: [0, 0.7, 1] }}
            />
          </>
        )}
      </motion.button>
      
      <div className="mt-1 text-sm font-semibold">
        {isLoading ? (
          <span className="inline-block w-12 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></span>
        ) : (
          <span className="flex items-center justify-center gap-1">
            <span>{count}</span>
            <span className="text-xs text-muted-foreground">votes</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default FireCounter;