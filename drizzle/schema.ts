import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("imageUrl"),
  technologies: text("technologies"),
  category: varchar("category", { length: 50 }).notNull(),
  githubUrl: text("githubUrl"),
  liveUrl: text("liveUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  message: text("message").notNull(),
  read: int("read").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }),
  order: int("order").default(0).notNull(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;