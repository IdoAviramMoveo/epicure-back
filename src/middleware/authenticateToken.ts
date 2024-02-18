import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret", (err: any, user: any) => {
    if (err) {
      console.log("Token verification error:", err);
      return res.sendStatus(403);
    }
    console.log("Token is valid, user:", user);
    req.user = user;
    next();
  });
};
