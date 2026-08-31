import { Hono } from 'hono';
import { getAllProjects } from '../db/queries/selects';
import { deleteProject } from '../db/queries/delete';
import { updateProject } from '../db/queries/update';
import { createProject } from '../db/queries/inserts';
import { DrizzleD1Database } from 'drizzle-orm/d1';

type Env = {
  DB: DrizzleD1Database;
};

const projectsRouter = new Hono<{ Bindings: Env }>();

// GET: Obtener proyectos
projectsRouter.get('/', async (c) => {
  try {
    // Nota: Es posible que necesites pasar c.env a getProjects si usas D1
    const allProjects = await getAllProjects();
    return c.json({ data: allProjects }, 200);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

// DELETE: Eliminar un proyecto por ID
// Cambiamos la ruta a /api/projects/:id para pasar el parámetro en la URL
projectsRouter.delete('/:id', async (c) => {
  try {
    // 1. Extraemos el parámetro del contexto de Hono
    const idParam = c.req.param('id');
    const id = parseInt(idParam, 10);

    // 2. Validamos que el ID sea un número válido
    if (isNaN(id)) {
      return c.json({ error: 'Invalid project ID' }, 400);
    }

    // 3. Ejecutamos la query
    await deleteProject(id);

    // 4. Devolvemos respuesta exitosa
    return c.json({ message: 'Project deleted successfully' }, 200);
    // Alternativa: return c.body(null, 204); (Si no quieres devolver nada)
  } catch (error) {
    console.error(`Error deleting project ${c.req.param('id')}:`, error);
    return c.json({ error: 'Failed to delete project' }, 500);
  }
});

projectsRouter.put('/:id', async (c) => {
  try {
    const body = await c.req.json();
    const { title, description } = body;
    if (!title || !description) {
      return c.json({ error: 'Title and Description should not be empty or null' }, 400);
    }
    const idParam = c.req.param('id');
    const id = parseInt(idParam, 10);
    await updateProject(id, body);
    return c.json({message:'successfully update project'})
  } catch (error) {
    console.error(`Error updating project ${c.req.param('id')}:`, error);
    return c.json({ error: 'Failed to update project' }, 500);
  }
});

projectsRouter.post('/', async (c)=>{
  try{
    const body = await c.req.json();
    const { title, description } = body;
    if (!title || !description) {
      return c.json({ error: 'Title and Description are required' }, 400);
    }
    await createProject(body);
    return c.json({message:'successfully created project'})
  }catch(error){
    console.log('Error creating project',error)
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

export default projectsRouter;
