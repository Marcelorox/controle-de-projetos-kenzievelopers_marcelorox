import { Request, Response } from "express";
import { client } from "./database";
import format from "pg-format";
import {
  Developers,
  DevelopersCreate,
  DevelopersResulte,
} from "./interfaces/developers.interface";
import { QueryConfig, QueryResult } from "pg";

const getAllDeveloperInfo = async (req: Request, res: Response) => {
  const queryString = `
  SELECT * FROM "developers, projects, developerInfos"`;

  const query = await client.query(queryString);

  return res.status(200).json(query);
};

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

const patchDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developerId = req.params.id;
  const payload: Partial<DevelopersCreate> = req.body;

  const queryString: string = format(
    `
    UPDATE "developers"
    SET (%I) = ROW (%L)
    WHERE "id" = $1
    RETURNING *;
  `,
    Object.keys(payload),
    Object.values(payload)
  );
  const QueryConfig: QueryConfig = {
    text: queryString,
    values: [developerId],
  };

  const queryResult: DevelopersResulte = await client.query(QueryConfig);
  const developer: Developers = queryResult.rows[0];

  return res.status(201).json();
};

const deleteDevelopers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const Id = req.params.id;

  const insertQuery: string = format(
    `
  DELETE FROM "developers" 
  WHERE "id" = (%L) 
  RETURNING *
  `,
    Object.values(Id)
  );

  const queryConfig: QueryConfig = {
    text: insertQuery,
    values: [Id],
  };

  const QueryResult = await client.query(queryConfig);
  const developers = QueryResult.rows[0];

  return res.status(204).json(developers);
};

export {
  registerDeveloper,
  patchDeveloper,
  deleteDevelopers,
  getAllDeveloperInfo,
};
