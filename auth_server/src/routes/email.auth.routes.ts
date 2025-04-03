import { Router, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { APIError } from "better-auth/api";
import { getToken } from "../handlers/getToken.handler.js";

const emailAuthRouter = Router();

emailAuthRouter.post("/sign-up/email", async (req: Request, res: Response) => {
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
      res.status(error.statusCode).json(error);
    }
  }
});

emailAuthRouter.post("/sign-in/email", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
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
      res.status(error.statusCode).json(error);
    }
  }
});

emailAuthRouter.get("/get-session", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      throw new APIError("UNAUTHORIZED");
    }
    res.json(session);
  } catch (error) {
    if (error instanceof APIError) {
      console.log("session catch");
      res.status(error.statusCode).json(error);
    }
  }
});

emailAuthRouter.post("/token", getToken);

export default emailAuthRouter;
