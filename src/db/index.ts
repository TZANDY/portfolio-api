import { drizzle } from "drizzle-orm/libsql";
import { config} from "dotenv";
import { env } from "process";

config({ path: ".env" });

export const db = drizzle({
  connection: {
    url: env.DATABASE_URL!,
    authToken: env.DATABASE_AUTH_TOKEN!,
  },
});