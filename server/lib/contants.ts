import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 8080;
export const dbPort = process.env.DB_PORT;
export const dbHost = process.env.DB_HOST;
export const dbUser = process.env.DB_USER;
export const dbPwd = process.env.DB_PWD;
export const dbName = process.env.DB_NAME;
export const apiVersion = process.env.API_VERSION;
export const jwtSecretKey = process.env.JWT_SECRET_KEY || 'secret';
