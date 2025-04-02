import cors from "cors";
import express, { Request, Response, ErrorRequestHandler } from "express";

import authRouter from "./routes/auth.routes.js";

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

app.use("/api/auth", authRouter);

export default app;
