import { Hono } from "hono";
import { cors } from "hono/cors";
import projectsRouter from '../routes/projects';
import technologiesRouter from '../routes/technologies';
import projectsTechnologiesRouter from '../routes/projectsTechnologies';

const app = new Hono<{ Bindings: Env }>();

// const CLIENT_API_KEY = process.env.CLIENT_API_KEY;

// app.use('*', cors({ 
//     origin: 'https://www.andiis.dev',
//     allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] 
// }));

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.route('/api/projects',projectsRouter);
app.route('/api/technologies',technologiesRouter)
app.route('/api/projects-technologies', projectsTechnologiesRouter);


export default app;
