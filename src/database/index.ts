// Dependencies
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const connection = new Pool({
  connectionString: process?.env?.DATABASE_URL,
});

connection.on('connect', () => {
  console.log('Database connected successfully');
});
