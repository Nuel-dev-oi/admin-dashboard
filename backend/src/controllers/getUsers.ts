import { type Request, type Response } from "express";
import User from "../models/user.js";

export async function getUsers(req: Request, res: Response) {
    const users = await User.find();  

    res.status(200).json({"confiramtion": "OK", "data": users});
}