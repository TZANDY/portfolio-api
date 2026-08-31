import { projects, SelectProject, SelectTechnologies, technologies, projectTechnologies } from '../schema';
import { db } from '../index';
import { eq, and } from 'drizzle-orm';

export async function deleteProject(id: SelectProject['id']) {
  await db.delete(projects).where(eq(projects.id, id));
}

export async function deleteTechnology(id: SelectTechnologies['id']) {
  await db.delete(technologies).where(eq(technologies.id, id));
}

export async function deleteProjectTechnology(
  projectId: SelectProject['id'],
  technologyId: SelectTechnologies['id']
) {
  await db
    .delete(projectTechnologies)
    .where(
      and(
        eq(projectTechnologies.projectId, projectId),
        eq(projectTechnologies.technologyId, technologyId)
      )
    );
}
