import { Router } from "express";
import { registerDeveloper } from "../logics";
import { developersController } from "../controllers";

const developersRoute: Router = Router();

developersRoute.post("", developersController.create);
developersRoute.get("/:id", developersController.list);
export default developersRoute;
