import { Request, Response } from "express";
import { Developers } from "../interfaces";
import developersServices from "../services/developers.services";
import { DeveloperInfo } from "../interfaces/developers.interface";

const createDev = async (req: Request, res: Response): Promise<Response> => {
  const developers: Developers = await developersServices.createDev(req.body);
  return res.status(201).json(developers);
};

const createDevInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developers = await developersServices.createDevInfo(
    req.params.id,
    req.body
  );
  return res.status(201).json(developers);
};

const listDev = async (req: Request, res: Response): Promise<Response> => {
  const developers: Developers = await developersServices.listDev(
    req.params.id
  );
  return res.status(200).json(developers);
};

const patchDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developers: Developers = await developersServices.patchDev(
    req.params.id,
    req.body
  );
  return res.status(200).json(developers);
};

const deleteDev = async (req: Request, res: Response): Promise<Response> => {
  const developers: Developers = await developersServices.deleteDev(
    req.params.id
  );
  return res.status(204).json();
};

export default {
  createDev,
  listDev,
  patchDeveloper,
  deleteDev,
  createDevInfo,
};
