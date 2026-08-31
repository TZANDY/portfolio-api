import {
  InsertProject,
  projects,
  InsertTechnologies,
  technologies,
  InsertProjectTechnologies,
  projectTechnologies,
} from '../schema';
import { db } from '../index';

export async function createProject(data: InsertProject) {
  await db.insert(projects).values(data);
}

export async function createTechnology(data: InsertTechnologies) {
  await db.insert(technologies).values(data);
}

export async function createProjectTechnology(data: InsertProjectTechnologies) {
  await db.insert(projectTechnologies).values(data);
}
