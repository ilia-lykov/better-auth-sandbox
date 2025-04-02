import { Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { APIError } from "better-auth/api";

export async function getToken(req: Request, res: Response) {
  try {
    await auth.api
      .getToken({
        headers: fromNodeHeaders(req.headers),
      })
      .then(({ token }) => {
        res.cookie("set-auth-jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 30 * 1000,
        });
        console.log(res.getHeaders());
        res.status(200).json(token);
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    if (error instanceof APIError) {
      res.status(error.statusCode).json(error);
    }
  }
}
