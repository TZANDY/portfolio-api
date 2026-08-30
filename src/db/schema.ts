import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

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
  name: text('name').notNull().unique(),
});

export const projectTechnologies = sqliteTable('project_technologies', {
  projectId: integer('project_id')
   .notNull()
   .references(() => projects.id, { onDelete: 'cascade' }),
  technologyId: integer('technology_id')
   .notNull()
   .references(() => technologies.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.projectId, table.technologyId] }),
}));