import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const adminAuth = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  // Verify the token
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    console.log(decoded);
    if (decoded.user.role != 'ADMIN') {
        return res.sendStatus(403);
    }
    (req as any).user = decoded;
    return next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

export default adminAuth;