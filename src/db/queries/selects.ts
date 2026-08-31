import { eq } from 'drizzle-orm';
import { db } from '../index';
import {
  projects,
  SelectTechnologies,
  technologies,
  projectTechnologies,
} from '../schema';

export async function getProjectsByPage(
  page = 1,
  pageSize = 5,
): Promise<
  Array<{
    url: string | null;
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    demoUrl: string | null;
    repoUrl: string | null;
    createdAt: Date | null;
  }>
> {
  return db
    .select()
    .from(projects)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getAllProjects(): Promise<
  Array<{
    url: string | null;
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    demoUrl: string | null;
    repoUrl: string | null;
    createdAt: Date | null;
  }>
> {
  return db.select().from(projects);
}
export async function getProjectById(id: number): Promise<
  Array<{
    url: string | null;
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    demoUrl: string | null;
    repoUrl: string | null;
    createdAt: Date | null;
  }>
> {
  return db.select().from(projects).where(eq(projects.id, id));
}
export async function getAllTechnologies(): Promise<
  Array<{
    id: number;
    name: string;
  }>
> {
  return db.select().from(technologies);
}

export async function getTecnologyById(id: SelectTechnologies['id']): Promise<
  Array<{
    id: number;
    name: string;
  }>
> {
  return db.select().from(technologies).where(eq(technologies.id, id));
}

export async function getProjectsByTechnologyId(
  technologyId: SelectTechnologies['id'],
) {
  return db
    .select({
      id: projects.id,
      title: projects.title,
      description: projects.description,
      imageUrl: projects.imageUrl,
      demoUrl: projects.demoUrl,
      url: projects.url,
      repoUrl: projects.repoUrl,
      createdAt: projects.createdAt,
    })
    .from(projects)
    .innerJoin(
      projectTechnologies,
      eq(projectTechnologies.projectId, projects.id),
    )
    .where(eq(projectTechnologies.technologyId, technologyId));
}

export async function getAllProjectsWithTechnologies() {
  const rows = await db
    .select({
      id: projects.id,
      title: projects.title,
      description: projects.description,
      imageUrl: projects.imageUrl,
      demoUrl: projects.demoUrl,
      url: projects.url,
      repoUrl: projects.repoUrl,
      createdAt: projects.createdAt,
      technology: technologies.name,
    })
    .from(projects)
    .leftJoin(
      projectTechnologies,
      eq(projectTechnologies.projectId, projects.id),
    )
    .leftJoin(
      technologies,
      eq(projectTechnologies.technologyId, technologies.id),
    );

  const projectsMap = new Map<
    number,
    {
      id: number;
      title: string;
      description: string;
      imageUrl: string | null;
      demoUrl: string | null;
      url: string | null;
      repoUrl: string | null;
      createdAt: Date | null;
      technologies: string[];
    }
  >();

  for (const row of rows) {
    if (!projectsMap.has(row.id)) {
      projectsMap.set(row.id, {
        id: row.id,
        title: row.title,
        description: row.description,
        imageUrl: row.imageUrl,
        demoUrl: row.demoUrl,
        url: row.url,
        repoUrl: row.repoUrl,
        createdAt: row.createdAt,
        technologies: [],
      });
    }

    if (row.technology) {
      projectsMap.get(row.id)!.technologies.push(row.technology);
    }
  }

  return Array.from(projectsMap.values());
}
