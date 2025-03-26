import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Request, Response } from "express";
import { auth } from "./lib/auth.js";

const app = express();
const port = 3005;

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(express.json());

// app.all('/api/auth/*splat', toNodeHandler(auth));
app.all("/api/auth/*splat", (req, res, next) => {
  toNodeHandler(auth);
  next();
});

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth

app.post("/api/auth/sign-up/email", (req: Request, res: Response) => {
  console.log("Received sign-up request:", req.body);
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ error: "Missing required fields" });
  }

  const response = auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
    asResponse: true,
  });
  // returns a response object instead of data

  res.json(response);
});

app.post("/api/auth/sign-in/email", async (req: Request, res: Response) => {
  console.log("Received sign-in request:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Missing required fields" });
  }
  const response = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    asResponse: true,
  });

  console.log(response);

  res.json(response);
});

app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});
