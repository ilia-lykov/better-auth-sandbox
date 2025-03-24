import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db/index.js';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite' // or "mysql", "sqlite"
	}),
	emailAndPassword: {
		enabled: true
	}
});
