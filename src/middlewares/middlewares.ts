import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import format from "pg-format";
import { Developers, DevelopersCreate, DevelopersResulte } from "../interfaces";

const verifyId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const developerId = req.params.id;

  const querySearchId = await client.query(
    "SELECT * FROM developers WHERE id = $1;",
    [developerId]
  );

  if (!querySearchId.rowCount) {
    return res.status(404).json({ message: "Developer not found." });
  }

  return next();
};

const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const payload: Developers = req.body;

  if (payload.email) {
    const queryName = await client.query(
      "SELECT * FROM developers WHERE email = $1;",
      [payload.email]
    );
    if (queryName.rowCount) {
      return res.status(409).json({ message: "Email already exists." });
    }
  }
  return next();
};
export { verifyEmail, verifyId };
