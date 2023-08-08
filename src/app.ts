import express, { Application } from "express";
import "dotenv/config";
import { startDatabase } from "./database";
import { registerDeveloper } from "./logics";

const app: Application = express();
app.use(express.json());

app.post("/developers", registerDeveloper);

app.listen(process.env.DB_PORT, async () => {
  await startDatabase();
  console.log("listening");
});
export default app;
