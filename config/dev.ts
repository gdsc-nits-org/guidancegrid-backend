import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: 4000,
  DATABASE_URL: process.env.DATABASE_URL_DEV,
};
