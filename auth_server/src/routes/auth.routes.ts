import { Router, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { APIError } from "better-auth/api";

const authRouter = Router();

authRouter.all("/*splat", (res, req, next) => {
  toNodeHandler(auth);
  next();
});

authRouter.post("/sign-up/email", async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const { headers, response } = await auth.api.signUpEmail({
      returnHeaders: true,
      body: {
        name,
        email,
        password,
      },
    });
    res.setHeaders(headers);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof APIError) {
      res.status(error.statusCode).json({ error: error.message });
    }
  }
});

authRouter.post("/sign-in/email", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Missing required fields" });
    }
    const { headers, response } = await auth.api.signInEmail({
      returnHeaders: true,
      body: {
        email,
        password,
      },
    });
    res.setHeaders(headers);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof APIError) {
      res.status(error.statusCode).json({ error: error.message });
    }
  }
});

authRouter.get("/get-session", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    console.log(res.getHeaders());
    res.json(session);
  } catch (error) {
    console.log("Ошибка", error);
  }
});

authRouter.post("/token", async (req, res) => {
  try {
    const { token } = await auth.api.getToken({
      headers: fromNodeHeaders(req.headers),
    });
    res.cookie("set-auth-jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });
    console.log(res.getHeaders());
    res.status(200).json(token);
  } catch (error) {
    console.log("Ошибка", error);
  }
});

export default authRouter;
