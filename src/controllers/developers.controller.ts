import { Request, Response } from "express";
import { Developers } from "../interfaces";
import developersServices from "../services/developers.services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const developers: Developers = await developersServices.create(req.body);
  return res.status(201).json(developers);
};

const list = async (req: Request, res: Response): Promise<Response> => {
  const developers: Developers = await developersServices.list(req.params.id);
  return res.status(200).json(developers);
};

export default { create, list };
