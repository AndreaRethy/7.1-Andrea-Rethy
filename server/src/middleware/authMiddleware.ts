import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddlewareJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log("Auth Middleware Invoked");

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token in Authorization header:", token);

  if (!token) {
    console.log("Token missing in headers");
    return res.status(401).json({ error: "Token not provided" });
  }

  // Verify the token
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    console.log("Decoded token:", decoded);
    (req as any).user = decoded;
    return next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

export default authMiddlewareJWT;
