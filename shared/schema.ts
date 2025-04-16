import { pgTable, text, serial, timestamp, integer, varchar, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  githubUrl: text("github_url").notNull(),
  projectUrl: text("project_url").notNull(),
  tags: json("tags").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: integer("user_id").references(() => users.id),
});

// Skills table
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  percentage: integer("percentage").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: integer("user_id").references(() => users.id),
});

// Tech Stack items
export const techStack = pgTable("tech_stack", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  icon: text("icon").notNull(),
  color: varchar("color", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: integer("user_id").references(() => users.id),
});

// Experience items
export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  period: varchar("period", { length: 100 }).notNull(),
  description: text("description").notNull(),
  bullets: json("bullets").$type<string[]>().notNull(),
  tags: json("tags").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: integer("user_id").references(() => users.id),
});

// Contact messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Subscribers table
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  isConfirmed: boolean("is_confirmed").default(false),
  ipAddress: varchar("ip_address", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Fire counter table to keep track of fire emoji clicks
export const fireCounter = pgTable("fire_counter", {
  id: serial("id").primaryKey(),
  count: integer("count").notNull().default(0),
  lastReset: timestamp("last_reset").defaultNow(),
});

// Fire votes table to track individual votes and prevent duplicates
export const fireVotes = pgTable("fire_votes", {
  id: serial("id").primaryKey(),
  ipAddress: varchar("ip_address", { length: 50 }).notNull(),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
  // Add a daily limit to reset votes every day
  voteDate: varchar("vote_date", { length: 10 }).notNull(), // Format: YYYY-MM-DD
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  skills: many(skills),
  techStack: many(techStack),
  experience: many(experience),
}));

export const projectsRelations = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  user: one(users, {
    fields: [skills.userId],
    references: [users.id],
  }),
}));

export const techStackRelations = relations(techStack, ({ one }) => ({
  user: one(users, {
    fields: [techStack.userId],
    references: [users.id],
  }),
}));

export const experienceRelations = relations(experience, ({ one }) => ({
  user: one(users, {
    fields: [experience.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({ 
  id: true,
  createdAt: true,
});

export const insertSkillSchema = createInsertSchema(skills).omit({ 
  id: true,
  createdAt: true,
});

export const insertTechStackSchema = createInsertSchema(techStack).omit({ 
  id: true,
  createdAt: true,
});

export const insertExperienceSchema = createInsertSchema(experience).omit({ 
  id: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages)
  .omit({ 
    id: true,
    createdAt: true,
  })
  .extend({
    name: z.string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(100, { message: "Name cannot exceed 100 characters" })
      .refine(name => !/^\s*$/.test(name), { message: "Name cannot be just whitespace" }),
    email: z.string()
      .email({ message: "Invalid email address format" })
      .max(255, { message: "Email cannot exceed 255 characters" })
      .refine(email => {
        // Basic email validation - check for common domains and patterns
        return email.includes('@') && 
              email.split('@')[1].includes('.') && 
              !/^[^@]+@(example|test|mailinator|tempmail)\.com$/.test(email.toLowerCase());
      }, { message: "Please use a valid email address" }),
    subject: z.string()
      .min(3, { message: "Subject must be at least 3 characters long" })
      .max(200, { message: "Subject cannot exceed 200 characters" }),
    message: z.string()
      .min(10, { message: "Message must be at least 10 characters long" })
      .max(2000, { message: "Message cannot exceed 2000 characters" })
      .refine(message => !/^\s*$/.test(message), { message: "Message cannot be just whitespace" })
  });

export const insertSubscriberSchema = createInsertSchema(subscribers)
  .omit({ 
    id: true,
    createdAt: true,
    isConfirmed: true,
  })
  .extend({
    email: z.string()
      .email({ message: "Invalid email address format" })
      .max(255, { message: "Email cannot exceed 255 characters" })
      .refine(email => {
        // Basic email validation - check for common domains and patterns
        return email.includes('@') && 
              email.split('@')[1].includes('.') && 
              !/^[^@]+@(example|test|mailinator|tempmail)\.com$/.test(email.toLowerCase());
      }, { message: "Please use a valid email address" }),
  });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

export type InsertTechStack = z.infer<typeof insertTechStackSchema>;
export type TechStack = typeof techStack.$inferSelect;

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experience.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;

// FireVote schema and type
export const insertFireVoteSchema = createInsertSchema(fireVotes)
  .omit({ 
    id: true,
    createdAt: true,
  });
export type InsertFireVote = z.infer<typeof insertFireVoteSchema>;
export type FireVote = typeof fireVotes.$inferSelect;

// FireCounter schema and type
export type FireCounter = typeof fireCounter.$inferSelect;
