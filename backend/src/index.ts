import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { notFound } from "./middlewares/not-found.js";
import { serverError } from "./middlewares/serverError.js";
import helmet from "helmet";
import ticketRoute from "./routes/ticket.route.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js"
import { connectDB } from "./db/index.js"

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({"extended": false}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

const URL = process.env.MONGODB_URL;

app.get("/", (req, res) => {
    res.status(200).send("Welcome to home page");
});

app.use("/api/tickets", ticketRoute);
app.use("/api/users", userRoute);

app.use("/api", authRoute);


//Error middleware
app.use(notFound);
app.use(serverError);

connectDB(URL!).then(() => {
    app.listen(PORT, () => {
        console.log(`App started on http://localhost:${PORT}`);
    });
});

