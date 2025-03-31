import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";
import {
  account,
  jwks,
  session,
  user,
  verification,
} from "../db/auth-schema.js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user,
      account,
      verification,
      session,
      jwks,
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
    // crossSubDomainCookies: {
    //   enabled: true,
    // },
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: "None", // Allows CORS-based cookie sharing across subdomains
      partitioned: true, // New browser standards will mandate this for foreign cookies
    },
  },
  trustedOrigins: ["http://localhost:3000"],
  plugins: [jwt()],
});
