import prod from "./prod";
import dev from "./dev";

import dotenv from "dotenv";
dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const env = process.env.NODE_ENV;
let envConfig;

console.log("DBdev", process.env.DATABASE_URL_DEV);

if (env === "prod") {
  envConfig = prod;
} else if (env === "dev") {
  envConfig = dev;
}

const defaultConfig = {
  env,
  PORT: 4000,
};
console.log(envConfig);
const config = {
  ...defaultConfig,
  ...envConfig,
};

export default config;
