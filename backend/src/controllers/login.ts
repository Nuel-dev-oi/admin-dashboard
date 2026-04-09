import { type Request, type Response } from "express";
import User from "../models/user.js";
//import { StatusCodes } from "http-status-codes";

export async function login(req: Request, res: Response) {
    const {password, email} = req.body;

    if (!password || !email) throw new Error("name, password and email is required");

    const user = await User.findOne({email});
    
    if (!user) {
        throw new Error("Unauthorize, please sign up");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new Error("password is not correct");

    const token = user.createJWT();

    res.status(200).json({ user: { name: user.name, Admin: user.isAdmin }, token  });
}