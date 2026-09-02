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

app.use(
  "/api/*",
  cors({
    origin: (origin, c) => {
      // Requests sin Origin, por ejemplo algunos requests
      // directos desde servidor o herramientas.
      if (!origin) {
        return "";
      }

      // Producción
      if (origin === c.env.ALLOWED_ORIGIN_PROD) {
        return origin;
      }

      // Preview específico configurado en Cloudflare
      if (origin === c.env.ALLOWED_ORIGIN_PREVIEW) {
        return origin;
      }

      // Previews de Vercel de tu proyecto
      //
      // Cambia "TU-PROYECTO" por el nombre real del proyecto https://portfolio-react-git-master-andi-infantes-projects.vercel.app/ en Vercel.
      const vercelPreviewRegex =
        //^https:\/\/TU-PROYECTO(?:-git-[a-zA-Z0-9._-]+)?(?:-[a-zA-Z0-9._-]+)?\.vercel\.app$/;
        /^https:\/\/portfolio-react-git-master-andi-infantes-projects.vercel.app$/;

      if (vercelPreviewRegex.test(origin)) {
        return origin;
      }

      return "";
    },

    allowMethods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],

    allowHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.route('/api/projects',projectsRouter);
app.route('/api/technologies',technologiesRouter)
app.route('/api/projects-technologies', projectsTechnologiesRouter);


export default app;
