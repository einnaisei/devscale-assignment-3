import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { IAuthRequest } from "../types/auth";

// Define the structure of your decoded token (with user id, for example)
interface DecodedToken {
  id: string;
}

const authMiddleware = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied" });
    return; // Ensure return to prevent further execution
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
    req.user = { id: verified.id }; // Explicitly assign `id` to `req.user`
    next(); // Pass the request to the next middleware or route
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
