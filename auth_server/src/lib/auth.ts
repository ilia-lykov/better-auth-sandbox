import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";
import { account, session, user, verification } from "../db/auth-schema.js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user,
      account,
      verification,
      session,
    }, // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data, request) {
      // Send an email to the user with a link to reset their password
    },
  },
  session: {
    freshAge: 0,
  },
  advanced: {
    cookies: {
      session_token: {
        name: "custom_session_token",
      },
    },
  },
  plugins: [jwt()],
});
