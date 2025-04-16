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
      const response = await apiRequest('POST', '/api/subscribe', { email });
      
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
          {success ? (
            <motion.div 
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4 text-green-800 dark:text-green-300 max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Successfully subscribed!</span>
              </div>
              <p className="mt-2 text-sm">Thank you for subscribing to my newsletter. You'll be notified when new content is published.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 max-w-md mx-auto">
              <div className="relative w-full">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full ${error ? 'border-red-500 dark:border-red-700 focus-visible:ring-red-500' : ''}`}
                  disabled={isSubmitting}
                  required
                />
                {error && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1 text-left">
                    {error}
                  </p>
                )}
              </div>
              <div className="flex justify-center sm:justify-start">
                <Button 
                  type="submit" 
                  className="flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                I respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
