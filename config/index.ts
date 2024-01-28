import envSchema from "./env";

const env = envSchema.parse(process.env);

export default env;
