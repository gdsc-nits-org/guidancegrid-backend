import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "prod"]).default("dev"),
    PORT: z.coerce.number().default(4000),
    DATABASE_URL_DEV: z.string(),
    DATABASE_URL_PROD: z.string(),
    JWT_SIGNING_KEY: z.string(),
    AWS_SES_ACCESS_KEY: z.string(),
    AWS_SES_SECRET_ACCESS_KEY: z.string(),
    AWS_SES_IAM_USER: z.string(),
    AWS_SMTP_USERNAME: z.string(),
    AWS_SMTP_PASSWORD: z.string(),
});

export default envSchema;
