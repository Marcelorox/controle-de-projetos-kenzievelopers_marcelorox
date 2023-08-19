import { Router } from "express";
import { verifyEmail, verifyId } from "../middlewares/middlewares";
import { projectsControllers } from "../controllers";

const projectsRouter: Router = Router();

projectsRouter.post("", verifyId, projectsControllers.createProject);
projectsRouter.get("/:id", verifyIdProject, projectsControllers.listProject);
projectsRouter.patch("/:id", verifyIdProject, projectsControllers.patchProject);
export default projectsRouter;
