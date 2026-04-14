import { type Request, type Response } from "express";

export function getTickets(req: Request, res: Response) {
  res.status(200).json({ confiramtion: "OK", status: "Get all tickets" });
}
