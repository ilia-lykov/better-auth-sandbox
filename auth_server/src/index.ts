import { toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "./lib/auth.js";

const app = express();
const port = 3005;

// app.all('/api/auth/*splat', toNodeHandler(auth));
app.all("/api/auth/*splat", (req, resp) => {
  resp.send(`\n Отработал middleware \n`);
  toNodeHandler(auth);
});

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});
