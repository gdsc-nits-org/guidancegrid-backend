import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "prod"]).default("dev"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL_DEV: z.string(),
  DATABASE_URL_PROD: z.string(),
});

export default envSchema;
