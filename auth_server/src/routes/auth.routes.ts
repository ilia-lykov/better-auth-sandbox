import { Router, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { db } from "../db/index.js";
import { session, user } from "../db/auth-schema.js";
import { eq } from "drizzle-orm";

const authRouter = Router();

const handleAuthError = async (error: unknown, res: Response) => {
  console.error("Auth API Error:", error);
  // Better-auth может возвращать ошибки в определенном формате,
  // здесь можно добавить более детальную обработку
  if (error instanceof Error) {
    return res
      .status(400)
      .json({ error: error.message || "Authentication failed" });
  }
  res.status(500).json({ error: "An unexpected error occurred" });
};

authRouter.all("/*splat", (res, req, next) => {
  toNodeHandler(auth);
  next();
});

authRouter.post("/sign-up/email", (req: Request, res: Response) => {
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
  }); // returns a response object instead of data

  res.json(response);
});

authRouter.post("/sign-in/email", async (req: Request, res: Response) => {
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
  console.log(res.getHeaders());
  res.status(200).json(response);
});

// authRouter.get("/api/auth/get-session1", async (req, res) => {
//   const cookie = req.headers.cookie;
//   const tokenId = cookie?.split("=")[1].split(".")[0];

//   const userIdBySessionId = await db
//     .select({
//       userId: session.userId,
//     })
//     .from(session)
//     .where(eq(session.token, <string>tokenId));
//   console.log("SQL_select:", userIdBySessionId);

//   const { userId } = userIdBySessionId[0];

//   const userInfoByUserID = await db
//     .select()
//     .from(user)
//     .where(eq(user.id, <string>userId));
//   console.log("SQL_select:", userInfoByUserID);
//   res.send(userInfoByUserID);
// });

authRouter.get("/get-session", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      res.json("Token not found");
    }
    console.log(session);
    res.json(session);
    // const requestHeaders = new Headers();

    // const sessionData = await auth.api.getSession({ headers: requestHeaders });
    // console.log(sessionData);
    // if (!sessionData?.user) {
    //   res.status(401).json({ user: null });
    // } else {
    //   res.status(200);
    // }
  } catch (error) {
    handleAuthError(error, res);
  }
});

export default authRouter;
