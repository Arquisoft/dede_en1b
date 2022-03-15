import dotenv from 'dotenv';

dotenv.config();

export  default {
    DB_URI: process.env.DB_URI,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,

};