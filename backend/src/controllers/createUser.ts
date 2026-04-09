import { type Request, type Response } from "express";
import User from "../models/user.js";

export async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new Error("A name, email and password is required");
    } 
    const user = await User.create({ ...req.body });

    res.status(200).json({"confiramtion": "OK", "user": user});
}