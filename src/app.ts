import express, { Application } from "express";
import init from "./utils/init";
import * as dotenv from "dotenv";
import authRouter from "./routes/auth.route";
import qrRouter from "./routes/qr.route";
const cors = require("cors");
dotenv.config({});

const app: Application = express();

app.use(cors("*"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/qr", qrRouter);

init(app);
