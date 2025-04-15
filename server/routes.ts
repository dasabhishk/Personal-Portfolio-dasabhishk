import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Contact form endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate request body using zod schema
      const validatedMessage = insertContactMessageSchema.parse(req.body);
      
      // Store the contact message in the database
      const savedMessage = await storage.createContactMessage(validatedMessage);
      
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
