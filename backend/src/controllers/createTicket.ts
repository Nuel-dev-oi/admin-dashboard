import { type Request, type Response } from "express";
import Ticket from "../models/ticket.js";

export async function createTicket(req: Request, res: Response) {
  try {
    const { name, email, description, createdBy, priority } = req.body;
    if (!name || !email || !createdBy || !priority)
      throw new Error("Please, fill the required fields");
    const ticket = await Ticket.create({
      name,
      email,
      description,
      createdBy,
      priority,
    });
    console.log(ticket);
    if (!ticket)
      res.status(400).json({ error: "Error, something, went wrong" });

    res
      .status(200)
      .json({ confiramtion: "OK", message: "Ticket created successfully" });
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}
