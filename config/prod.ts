import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: 8080,
  DATABASE_URL: process.env.DATABASE_URL_PROD,
};
