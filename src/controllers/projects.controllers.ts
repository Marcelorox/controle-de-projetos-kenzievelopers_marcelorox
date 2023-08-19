import { Request, Response } from "express";
import { Developers, Projects } from "../interfaces";
import { projectsServices } from "../services";

const createProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developers: Projects = await projectsServices.createProject(req.body);
  return res.status(201).json(developers);
};

const listProject = async (req: Request, res: Response): Promise<Response> => {
  const developers: Projects = await projectsServices.listProject(
    req.params.id
  );
  return res.status(200).json(developers);
};

const patchProject = async (req: Request, res: Response): Promise<Response> => {
  const developers: Projects = await projectsServices.patchProject(
    req.params.id,
    req.body
  );
  return res.status(200).json(developers);
};

export default { createProject, listProject, patchProject };
