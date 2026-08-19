import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/noreium';
export const APP_ENV = process.env.APP_ENV || 'development';
export const JWT_SECRET = process.env.JWT_SECRET || 'replace-me-in-prod';
