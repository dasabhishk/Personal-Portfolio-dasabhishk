import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import rateLimit from "express-rate-limit";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create contact form rate limiter
  const contactFormLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5, // 5 requests per window
    standardHeaders: 'draft-7', // Set Rate-Limit headers
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many contact requests. Please try again after 15 minutes.'
    }
  });
  // API endpoints for projects
  app.get('/api/projects', async (req: Request, res: Response) => {
    try {
      const projects = await storage.getProjects();
      return res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch projects. Please try again later.' 
      });
    }
  });
  
  // API endpoints for skills
  app.get('/api/skills', async (req: Request, res: Response) => {
    try {
      const skills = await storage.getSkills();
      return res.status(200).json(skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch skills. Please try again later.' 
      });
    }
  });
  
  // API endpoints for tech stack
  app.get('/api/tech-stack', async (req: Request, res: Response) => {
    try {
      const techStack = await storage.getTechStack();
      return res.status(200).json(techStack);
    } catch (error) {
      console.error('Error fetching tech stack:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch tech stack. Please try again later.' 
      });
    }
  });
  
  // API endpoints for experience
  app.get('/api/experience', async (req: Request, res: Response) => {
    try {
      const experience = await storage.getExperiences();
      return res.status(200).json(experience);
    } catch (error) {
      console.error('Error fetching experience:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch experience. Please try again later.' 
      });
    }
  });

  // Contact form endpoint with rate limiting
  app.post('/api/contact', contactFormLimiter, async (req: Request, res: Response) => {
    try {
      // Get client IP for logging
      const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
      
      // Additional spam detection checks
      const { name, email, subject, message } = req.body;
      
      // Check for suspicious patterns
      if (
        message && (
          message.includes('http') || 
          /\b(?:casino|viagra|lottery|winning|prize|buy now)\b/i.test(message) ||
          message.split('\n').length > 20
        )
      ) {
        console.warn(`Potential spam detected from ${clientIp}, message content filtered`);
        return res.status(400).json({
          success: false,
          message: 'Your message appears to contain suspicious content. Please remove links or promotional content.'
        });
      }
      
      // Validate length limits to prevent excessive data
      if (
        (name && name.length > 100) ||
        (subject && subject.length > 200) ||
        (message && message.length > 2000)
      ) {
        return res.status(400).json({
          success: false,
          message: 'Message content exceeds allowed length limits.'
        });
      }
      
      // Validate request body using Zod schema
      const validatedMessage = insertContactMessageSchema.parse(req.body);
      
      // Store the contact message in the database
      const savedMessage = await storage.createContactMessage(validatedMessage);
      
      console.log(`Contact message received from ${email} (IP: ${clientIp})`);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Message received! I will get back to you soon.',
        data: savedMessage
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Validation error',
          errors: error.errors 
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to submit form. Please try again later.' 
      });
    }
  });
  
  // Admin routes for fetching contact messages
  app.get('/api/admin/contact-messages', async (req: Request, res: Response) => {
    try {
      // In a real app, you would add authentication middleware here
      // to ensure only admins can access this endpoint
      
      const messages = await storage.getContactMessages();
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch contact messages. Please try again later.' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
