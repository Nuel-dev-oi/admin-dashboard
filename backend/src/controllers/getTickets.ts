import { type Request, type Response } from "express";
import Ticket from "../models/ticket.js";
import jwt from "jsonwebtoken";

export async function getTickets(req: Request, res: Response) {
  try {
    const { token } = req.query;
    console.log(token);
    if (!token) return res.status(400).json({ error: "authorized user" });
    const payload = jwt.verify(token as string, process.env.JWT_SECRET!);
    const { userId, admin } = payload as any;

    if (!admin)
      return res.status(400).json({ error: "Only admins can fetch tickets" });
    const tickets = await Ticket.find();

    console.log(tickets);
    res.status(200).json({ confiramtion: "OK", message: tickets });
  } catch (error: any) {
    console.log(error);
    if (error instanceof jwt.TokenExpiredError)
      return res
        .status(500)
        .json({ error: "Token Expired", redirect: "/login" });
    throw new Error(error.message);
  }
}
