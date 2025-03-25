import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/libsql';

dotenv.config();
export const db = drizzle(process.env.DB_FILE_NAME!);
