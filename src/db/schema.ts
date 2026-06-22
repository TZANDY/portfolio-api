import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url'),
  demoUrl: text('demo_url'),
  url: text('url'),
  repoUrl: text('repo_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(new Date()),
});

export const technologies = sqliteTable('technologies', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  projectId: integer('project_id').references(() => projects.id),
  name: text('name').notNull(),
});