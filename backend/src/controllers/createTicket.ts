import { type Request, type Response } from "express";

export function createTicket(req: Request, res: Response) {
    res.status(200).json({"confiramtion": "OK", "status": "create tickets"});
}