import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    API_VERSION: process.env.API_VERSION,
    SWAGGER_HOST: process.env.SWAGGER_HOST,
    DATABASE_URL: process.env.DATABASE_URL
};