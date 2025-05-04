import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = process.env.DATABASE_URL;
export const dbPool = mysql.createPool(dbConfig);
