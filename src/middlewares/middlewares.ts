import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import format from "pg-format";
import { Developers } from "../interfaces";

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
const verifyIdProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const projectId = req.params.id;

  const querySearchId = await client.query(
    "SELECT * FROM projects WHERE id = $1;",
    [projectId]
  );

  if (!querySearchId.rowCount) {
    return res.status(404).json({ message: "Project not found." });
  }

  return next();
};

const verifyDeveloperInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const developerId = req.params.id;

  const querySearchId = await client.query(
    `SELECT * FROM "developerInfos" WHERE "developerId" = $1;`,
    [developerId]
  );

  if (!querySearchId.rowCount) {
    return next();
  }

  return res.status(409).json({ message: "Developer infos already exists." });
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

const verifyDeveloperIdProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const developerId: number = req.body.developerId;
  if (developerId) {
    const querySearchId = await client.query(
      "SELECT * FROM developers WHERE id = $1;",
      [developerId]
    );

    if (!querySearchId.rowCount) {
      return res.status(404).json({ message: "Developer not found." });
    } else {
      return next();
    }
  }
};
const validatePreferredOS = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { preferredOS } = req.body;

  if (!["Windows", "Linux", "MacOS"].includes(preferredOS)) {
    return res.status(400).json({
      message: "Invalid OS option.",
    });
  }

  next();
};

export {
  verifyEmail,
  verifyId,
  verifyDeveloperIdProject,
  verifyDeveloperInfo,
  validatePreferredOS,
  verifyIdProject,
};
