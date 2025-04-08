import { betterAuth } from "better-auth";
import { jwt, phoneNumber } from "better-auth/plugins";
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
    expiresIn: 300,
    updateAge: 10,
    // expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  advanced: {
    cookies: {
      session_token: {
        name: "refresh_token",
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
  plugins: [
    jwt({
      jwt: {
        issuer: process.env.BASE_URL,
        audience: "http://localhost:3000",
        expirationTime: "1h",
        definePayload: (session) => {
          return {
            id: session.user.id,
            email: session.user.email,
          };
        },
      },
    }),
    phoneNumber({
      sendOTP({ phoneNumber, code }, request) {
        console.log("Сode Dev Mode", code);
        console.log(request);
      },
      async callbackOnVerification({ phoneNumber, user }, request) {
        console.log("callbackOnVefircation", phoneNumber, user);
      },
    }),
  ],
});
