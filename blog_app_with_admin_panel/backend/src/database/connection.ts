import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

// Validate environment variables
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error('Missing required environment variables for database connection');
}

// Initialize Sequelize with sequelize-typescript
export const connection = new Sequelize({
  dialect: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  models: [__dirname + '/../models'], // Path to models
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
