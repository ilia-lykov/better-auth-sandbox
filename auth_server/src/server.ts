import cors from "cors";
import express, { Request, Response, ErrorRequestHandler } from "express";
import { toNodeHandler } from "better-auth/node";

import emailAuthRouter from "./routes/email.auth.routes.js";
import { auth } from "./lib/auth.js";
import otpAuthRouter from "./routes/otp.auth.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.all("/*splat", (req, res, next) => {
  console.log(`[${req.method}] URL: ${req.url}`);
  next();
});
app.use(express.json());

emailAuthRouter.all("/api/auth/*splat", (res, req, next) => {
  toNodeHandler(auth);
  next();
});

app.use("/api/auth", emailAuthRouter);
app.use("/api/auth/phone-number", otpAuthRouter);

export default app;
