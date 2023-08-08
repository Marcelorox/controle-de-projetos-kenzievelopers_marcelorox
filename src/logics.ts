import { Request, Response } from "express";
import { client } from "./database";
import format from "pg-format";
import { Developers, DevelopersCreate, DevelopersResulte } from "./interfaces";

const registerDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: DevelopersCreate = req.body;

  const queryString: string = format(
    `
  INSERT INTO "developers" (%I)
  VALUES (%L)
  RETURNING *;
  `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: DevelopersResulte = await client.query(queryString);
  const developer: Developers = queryResult.rows[0];

  return res.status(201).json(developer);
};

export { registerDeveloper };
