import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

// Email validation schema
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

const Blog = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      // Validate email
      const result = emailSchema.safeParse({ email });
      if (!result.success) {
        setError(result.error.errors[0].message);
        return;
      }
      
      setIsSubmitting(true);
      
      // Submit to API
      const response = await apiRequest('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      setSuccess(true);
      setEmail("");
      
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to my newsletter.",
        variant: "default",
      });
      
    } catch (err: any) {
      console.error("Subscription error:", err);
      
      // Handle API errors
      if (err.status === 429) {
        setError("Too many subscription attempts. Please try again later.");
      } else if (err.data?.message) {
        setError(err.data.message);
      } else {
        setError("Failed to subscribe. Please try again later.");
      }
      
      toast({
        title: "Subscription failed",
        description: err.data?.message || "There was a problem with your subscription request.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section 
      id="blog" 
      className="py-20 relative"
      ref={ref}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-mono font-bold inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.5 } 
              }
            }}
          >
            <span className="text-primary">/</span> Blog <span className="text-primary">/</span>
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-primary mx-auto mt-4"
            initial={{ opacity: 0, width: 0 }}
            animate={controls}
            variants={{
              visible: { 
                opacity: 1, 
                width: 80,
                transition: { duration: 0.5, delay: 0.3 } 
              }
            }}
          ></motion.div>
          <motion.p 
            className="text-muted-foreground mt-4 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: { 
                opacity: 1,
                transition: { duration: 0.5, delay: 0.4 } 
              }
            }}
          >
            Thoughts, insights, and technical tutorials on backend development, cloud architecture, and more.
          </motion.p>
        </div>
        
        {/* Empty State / Placeholder */}
        <motion.div 
          className="max-w-2xl mx-auto text-center bg-card p-10 rounded-lg shadow-lg glow-border"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.5, delay: 0.5 } 
            }
          }}
        >
          <div className="text-4xl text-primary mb-4">
            <i className="ri-quill-pen-line"></i>
          </div>
          <h3 className="text-xl font-mono font-bold text-secondary mb-3">Coming Soon</h3>
          <p className="text-muted-foreground mb-6">
            I'm working on some exciting articles about backend development, cloud architecture, and performance optimization.
            Check back soon or subscribe to get notified when new content is published.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-2 bg-background rounded-md border border-muted focus:outline-none focus:border-primary"
            />
            <motion.button 
              type="button" 
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium flex items-center justify-center whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
              <i className="ri-mail-send-line ml-2"></i>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
