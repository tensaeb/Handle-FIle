import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.DB_PASSWORD;
const port = (process.env.PORT || 3306) as number;

if (!dbName || !dbUser) {
  throw new Error("Database configuration is missing");
}

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  logging: false,
});
