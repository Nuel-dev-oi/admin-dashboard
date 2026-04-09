import { login } from "../controllers/login.js";
import express from "express";

const router = express.Router();

router.route("/login").post(login);

export default router;