import express, {type Request, type Response, type NextFunction} from "express";

export function serverError(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err.message);
    return res.status(500).json({"message": err.message});
}