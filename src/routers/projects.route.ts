import { Router } from "express";
import { verifyDeveloperIdProject, verifyIdProject } from "../middlewares";
import { projectsControllers } from "../controllers";

const projectsRouter: Router = Router();

projectsRouter.post(
  "",
  verifyDeveloperIdProject,
  projectsControllers.createProject
);
projectsRouter.get("/:id", verifyIdProject, projectsControllers.listProject);
projectsRouter.patch(
  "/:id",
  verifyIdProject,
  verifyDeveloperIdProject,

  projectsControllers.patchProject
);
export default projectsRouter;
