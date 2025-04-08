import { Router, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { APIError } from "better-auth/api";

const otpAuthRouter = Router();

otpAuthRouter.post("/send-otp", async (req, res) => {
  console.log(req.body.phoneNumber);
  const { phoneNumber } = req.body;

  const data = await auth.api.sendPhoneNumberOTP({
    body: {
      phoneNumber,
    },
  });

  res.json(data);
});

otpAuthRouter.post("/verify", async (req, res) => {
  const { code, phoneNumber } = req.body;
  const data = await auth.api.verifyPhoneNumber({
    body: {
      code,
      phoneNumber,
    },
  });
  res.json(data);
});

export default otpAuthRouter;
