import { Router } from "express";
import { registerDeveloper } from "../logics";
import { developersController } from "../controllers";
import { verifyEmail, verifyId } from "../middlewares/middlewares";

const developersRoute: Router = Router();

developersRoute.post("", verifyEmail, developersController.createDev);
developersRoute.get("/:id", verifyId, developersController.listDev);
developersRoute.patch(
  "/:id",
  verifyId,
  verifyEmail,
  developersController.patchDeveloper
);
export default developersRoute;
