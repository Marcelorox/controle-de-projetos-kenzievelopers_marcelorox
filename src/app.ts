import "dotenv/config";
import express, { Application, json } from "express";
import { developersRoute } from "./routers";

const app: Application = express();
app.use(json());

app.use("/developers", developersRoute);

export default app;
