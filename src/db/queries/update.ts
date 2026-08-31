import {
  projects,
  SelectProject,
  SelectTechnologies,
  technologies,
} from '../schema';
import { db } from '../index';
import { eq } from 'drizzle-orm';

export async function updateProject(
  id: SelectProject['id'],
  data: Partial<Omit<SelectProject, 'id'>>,
) {
  await db.update(projects).set(data).where(eq(projects.id, id));
}

export async function updateTechnology(
  id: SelectTechnologies['id'],
  data: Partial<Omit<SelectTechnologies, 'id'>>,
) {
  await db
    .update(technologies)
    .set(data)
    .where(eq(technologies.id, id));
}
