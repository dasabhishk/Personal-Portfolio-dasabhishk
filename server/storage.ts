import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  skills, type Skill, type InsertSkill,
  techStack, type TechStack, type InsertTechStack,
  experience, type Experience, type InsertExperience,
  contactMessages, type ContactMessage, type InsertContactMessage,
  subscribers, type Subscriber, type InsertSubscriber,
  fireCounter, fireVotes, type FireVote, type InsertFireVote, type FireCounter
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Skill methods
  getSkills(): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;
  
  // TechStack methods
  getTechStack(): Promise<TechStack[]>;
  getTechStackItem(id: number): Promise<TechStack | undefined>;
  createTechStackItem(techStackItem: InsertTechStack): Promise<TechStack>;
  updateTechStackItem(id: number, techStackItem: Partial<InsertTechStack>): Promise<TechStack | undefined>;
  deleteTechStackItem(id: number): Promise<boolean>;
  
  // Experience methods
  getExperiences(): Promise<Experience[]>;
  getExperience(id: number): Promise<Experience | undefined>;
  createExperience(experienceItem: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experienceItem: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<boolean>;
  
  // Contact message methods
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  deleteContactMessage(id: number): Promise<boolean>;
  
  // Subscriber methods
  getSubscribers(): Promise<Subscriber[]>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  deleteSubscriber(id: number): Promise<boolean>;
  
  // Fire counter methods
  getFireCounter(): Promise<number>;
  incrementFireCounter(): Promise<number>;
  hasVotedToday(ipAddress: string): Promise<boolean>;
  addFireVote(vote: InsertFireVote): Promise<FireVote>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Project methods
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const [createdProject] = await db.insert(projects).values(project).returning();
    return createdProject;
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return true; // In Drizzle, delete doesn't return the count, so we just assume success
  }
  
  // Skill methods
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }
  
  async getSkill(id: number): Promise<Skill | undefined> {
    const [skill] = await db.select().from(skills).where(eq(skills.id, id));
    return skill;
  }
  
  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [createdSkill] = await db.insert(skills).values(skill).returning();
    return createdSkill;
  }
  
  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [updatedSkill] = await db
      .update(skills)
      .set(skill)
      .where(eq(skills.id, id))
      .returning();
    return updatedSkill;
  }
  
  async deleteSkill(id: number): Promise<boolean> {
    const result = await db.delete(skills).where(eq(skills.id, id));
    return true;
  }
  
  // TechStack methods
  async getTechStack(): Promise<TechStack[]> {
    return await db.select().from(techStack);
  }
  
  async getTechStackItem(id: number): Promise<TechStack | undefined> {
    const [item] = await db.select().from(techStack).where(eq(techStack.id, id));
    return item;
  }
  
  async createTechStackItem(techStackItem: InsertTechStack): Promise<TechStack> {
    const [createdItem] = await db.insert(techStack).values(techStackItem).returning();
    return createdItem;
  }
  
  async updateTechStackItem(id: number, techStackItem: Partial<InsertTechStack>): Promise<TechStack | undefined> {
    const [updatedItem] = await db
      .update(techStack)
      .set(techStackItem)
      .where(eq(techStack.id, id))
      .returning();
    return updatedItem;
  }
  
  async deleteTechStackItem(id: number): Promise<boolean> {
    const result = await db.delete(techStack).where(eq(techStack.id, id));
    return true;
  }
  
  // Experience methods
  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experience);
  }
  
  async getExperience(id: number): Promise<Experience | undefined> {
    const [experienceItem] = await db.select().from(experience).where(eq(experience.id, id));
    return experienceItem;
  }
  
  async createExperience(experienceItem: InsertExperience): Promise<Experience> {
    const [createdItem] = await db.insert(experience).values(experienceItem).returning();
    return createdItem;
  }
  
  async updateExperience(id: number, experienceItem: Partial<InsertExperience>): Promise<Experience | undefined> {
    const [updatedItem] = await db
      .update(experience)
      .set(experienceItem)
      .where(eq(experience.id, id))
      .returning();
    return updatedItem;
  }
  
  async deleteExperience(id: number): Promise<boolean> {
    const result = await db.delete(experience).where(eq(experience.id, id));
    return true;
  }
  
  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message;
  }
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [createdMessage] = await db.insert(contactMessages).values(message).returning();
    return createdMessage;
  }
  
  async deleteContactMessage(id: number): Promise<boolean> {
    const result = await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return true;
  }
  
  // Subscriber methods
  async getSubscribers(): Promise<Subscriber[]> {
    return await db.select().from(subscribers);
  }
  
  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return subscriber;
  }
  
  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const [createdSubscriber] = await db.insert(subscribers).values(subscriber).returning();
    return createdSubscriber;
  }
  
  async deleteSubscriber(id: number): Promise<boolean> {
    const result = await db.delete(subscribers).where(eq(subscribers.id, id));
    return true;
  }
  
  // Fire counter methods
  async getFireCounter(): Promise<number> {
    // Get the current fire counter, initialize it if it doesn't exist
    const counters = await db.select().from(fireCounter);
    
    if (counters.length === 0) {
      // Initialize the counter if it doesn't exist
      const [newCounter] = await db.insert(fireCounter)
        .values({ count: 0 })
        .returning();
      return newCounter.count;
    }
    
    return counters[0].count;
  }
  
  async incrementFireCounter(): Promise<number> {
    const counters = await db.select().from(fireCounter);
    
    if (counters.length === 0) {
      // Initialize the counter if it doesn't exist
      const [newCounter] = await db.insert(fireCounter)
        .values({ count: 1 })
        .returning();
      return newCounter.count;
    }
    
    // Update the existing counter
    const [updatedCounter] = await db.update(fireCounter)
      .set({ count: counters[0].count + 1, lastReset: new Date() })
      .where(eq(fireCounter.id, counters[0].id))
      .returning();
      
    return updatedCounter.count;
  }
  
  async hasVotedToday(ipAddress: string): Promise<boolean> {
    // Get the current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Check if the IP address has already voted today
    const existingVotes = await db.select()
      .from(fireVotes)
      .where(and(
        eq(fireVotes.ipAddress, ipAddress),
        eq(fireVotes.voteDate, today)
      ));
      
    return existingVotes.length > 0;
  }
  
  async addFireVote(vote: InsertFireVote): Promise<FireVote> {
    const [createdVote] = await db.insert(fireVotes)
      .values(vote)
      .returning();
      
    return createdVote;
  }
}

export const storage = new DatabaseStorage();
