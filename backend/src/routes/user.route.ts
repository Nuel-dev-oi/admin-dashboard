import express from "express";
import { createUser } from "../controllers/createUser.js";
import { getUsers } from "../controllers/getUsers.js";


const router = express.Router();

router.route("/").get(getUsers).post(createUser);

export default router;