import "dotenv/config";
import express, { Application, json } from "express";
import { developersRoute, projectsRouter } from "./routers";

const app: Application = express();
app.use(json());

app.use("/developers", developersRoute);
app.use("/projects", projectsRouter);

export default app;
