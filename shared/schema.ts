import { pgTable, text, serial, timestamp, integer, varchar, json } from "drizzle-orm/pg-core";
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

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ 
  id: true,
  createdAt: true,
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
