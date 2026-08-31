import { Hono } from 'hono';
import { getProjectsByTechnologyId, getAllProjectsWithTechnologies } from '../db/queries/selects';
import { createProjectTechnology } from '../db/queries/inserts';
import { deleteProjectTechnology } from '../db/queries/delete';

const projectsTechnologiesRouter = new Hono();

projectsTechnologiesRouter.get('/', async (c) => {
  try {
    const allProjectsWithTechnologies = await getAllProjectsWithTechnologies();
    return c.json({ data: allProjectsWithTechnologies }, 200);
  } catch (error) {
    console.error('Error fetching all projects with technologies:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

projectsTechnologiesRouter.get('/:technologyId', async (c) => {
  try {
    const technologyIdParam = c.req.param('technologyId');
    const technologyId = parseInt(technologyIdParam, 10);
    if (isNaN(technologyId)) {
      return c.json({ error: 'Invalid technology ID' }, 400);
    }
    const allProjectTechnologies = await getProjectsByTechnologyId(technologyId);
    return c.json({ data: allProjectTechnologies }, 200);
  } catch (error) {
    console.error('Error fetching project technologies:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

projectsTechnologiesRouter.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { projectId, technologyId } = body;
    if (!projectId || !technologyId) {
      return c.json({ error: 'Project ID and Technology ID are required' }, 400);
    }
    // Aquí deberías llamar a la función que inserta la relación en la base de datos
    await createProjectTechnology(body);
    return c.json({ message: 'successfully created project-technology relation' }, 201);
  } catch (error) {
    console.error('Error creating project-technology relation:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

projectsTechnologiesRouter.delete('/:technologyId/:projectId', async (c) => {
  try {
    const technologyIdParam = c.req.param('technologyId');
    const projectIdParam = c.req.param('projectId');
    const technologyId = parseInt(technologyIdParam, 10);
    const projectId = parseInt(projectIdParam, 10);
    if (isNaN(technologyId) || isNaN(projectId)) {
      return c.json({ error: 'Invalid technology ID or project ID' }, 400);
    }
    // Aquí deberías llamar a la función que elimina la relación en la base de datos
    await deleteProjectTechnology(projectId, technologyId);
    return c.json({ message: 'successfully deleted project-technology relation' }, 200);
  } catch (error) {
    console.error('Error deleting project-technology relation:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

export default projectsTechnologiesRouter;