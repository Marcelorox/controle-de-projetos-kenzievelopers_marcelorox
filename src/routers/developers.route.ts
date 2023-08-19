import { Router } from "express";
import { registerDeveloper } from "../logics";
import { developersController } from "../controllers";
import {
  validatePreferredOS,
  verifyDeveloperInfo,
  verifyEmail,
  verifyId,
} from "../middlewares";

const developersRoute: Router = Router();

developersRoute.delete("/:id", verifyId, developersController.deleteDev);

developersRoute.post("", verifyEmail, developersController.createDev);
developersRoute.post(
  "/:id/infos",
  validatePreferredOS,
  verifyId,
  verifyDeveloperInfo,
  developersController.createDevInfo
);
developersRoute.get("/:id", verifyId, developersController.listDev);
developersRoute.patch(
  "/:id",
  verifyId,
  verifyEmail,
  developersController.patchDeveloper
);

export default developersRoute;
