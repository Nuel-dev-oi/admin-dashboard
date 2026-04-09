import { type Request, type Response } from "express";

export function updateTicket(req: Request, res: Response) {
    res.status(200).json({"confiramtion": "OK", "status": "update ticket"});
}