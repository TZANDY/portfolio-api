import { Hono } from "hono";
import { cors } from "hono/cors";
import projectsRouter from '../routes/projects';
import technologiesRouter from '../routes/technologies';
import projectsTechnologiesRouter from '../routes/projectsTechnologies';

type Bindings = {
  DATABASE_URL: string;
  DATABASE_AUTH_TOKEN: string;
  ALLOWED_ORIGIN_PROD: string
  ALLOWED_ORIGIN_PREVIEW: string
  // API_SECRET_TOKEN: string
  // ALLOWED_ORIGIN_DEV: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// const CLIENT_API_KEY = process.env.CLIENT_API_KEY;

app.use('/*', cors({ 
    origin: (origin,c)=>{
      if (origin === c.env.ALLOWED_ORIGIN_PROD) {
        return origin;
      }

      // if (origin === c.env.ALLOWED_ORIGIN_DEV) {
      //   return origin;
      // }

      if (origin === c.env.ALLOWED_ORIGIN_PREVIEW) {
        return origin;
      }

      // Permitir URLs de previsualización (Preview Deployments) de Vercel usando un Regex simple
      if (origin.match(/^https:\/\/tu-app-.[a-zA-Z0-9-]+-vercel\.app$/)) {
        return origin
      }

      return '';
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
}));

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.route('/api/projects',projectsRouter);
app.route('/api/technologies',technologiesRouter)
app.route('/api/projects-technologies', projectsTechnologiesRouter);


export default app;
