import { Hono } from 'hono';
import { getAllTechnologies } from '../db/queries/selects';
import { createTechnology } from '../db/queries/inserts';
import { updateTechnology } from '../db/queries/update';
import { deleteTechnology } from '../db/queries/delete';

import { DrizzleD1Database } from 'drizzle-orm/d1';

type Env = {
  DB: DrizzleD1Database;
};

const tecnologiesRouter = new Hono<{ Bindings: Env }>();

tecnologiesRouter.get('/', async (c) => {
  try {
    const allTecnologies = await getAllTechnologies();
    return c.json({ data: allTecnologies });
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

tecnologiesRouter.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { name } = body;
    if (!name) {
      return c.json({ error: 'Name is required' },400);
    }
    await createTechnology(body);
    return c.json({ message: 'successfully created technology' }, 201);
  } catch (error) {
    console.error('Error creating technology:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

tecnologiesRouter.put('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const technologyId = Number(id);

    if (Number.isNaN(technologyId)) {
      return c.json({ error: 'Invalid technology id' }, 400);
    }

    const body = await c.req.json();
    const { name } = body;
    if (!name) {
      return c.json({ error: 'Name is required' }, 400);
    }

    await updateTechnology(technologyId, body);
    return c.json({ message: 'successfully updated technology' });
  } catch (error) {
    console.error('Error updating technology:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

tecnologiesRouter.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const technologyId = Number(id);

    if (Number.isNaN(technologyId)) {
      return c.json({ error: 'Invalid technology id' }, 400);
    }

    // Assuming you have a deleteTechnology function in your queries/delete file
    await deleteTechnology(technologyId);
    return c.json({ message: 'successfully deleted technology' });
  } catch (error) {
    console.error('Error deleting technology:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

export default tecnologiesRouter;