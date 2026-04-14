import express from "express";
import { getTickets } from "../controllers/getTickets.js";
import { createTicket } from "../controllers/createTicket.js";
import { updateTicket } from "../controllers/updateTicket.js";

const router = express.Router();

router.route("/").get(getTickets).post(createTicket);

router.route("/:id/status").post(updateTicket);

export default router;
