import { Request } from "express";

export interface IAuthRequest extends Request {
  user?: {
    id: string | object; // Depending on what `jwt.verify()` returns (typically an object)
  };
}
