import { type Request, type Response } from "express";

export function notFound(req: Request, res: Response) {
  res.status(404).send("<h1>Sorry, Page not found</h1>");
}
