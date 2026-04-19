import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { MongooseError } from "mongoose";

export function serverError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(err);
  if (err.code === 11000) {
    const message = Object.entries(err.keyValue)
      .map(
        ([key, value]) =>
          `This ${key} with value: ${value} is already in our database`,
      )
      .join("");
    return res.status(400).json({ error: message });
  }
  console.log(err);
  return res.status(500).json({ error: err.message || "Server timeout" });
}
