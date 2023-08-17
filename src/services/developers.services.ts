import { Request, Response } from "express";
import { Developers, DevelopersCreate, DevelopersResulte } from "../interfaces";
import format from "pg-format";
import { QueryResult } from "pg";
import { client } from "../database";

const create = async (payload: DevelopersCreate): Promise<Developers> => {
  const queryString: string = format(
    'INSERT INTO  "developers" (%I) VALUES (%L) RETURNING * ',
    Object.keys(payload),
    Object.values(payload)
  );

  const queryresult: DevelopersResulte = await client.query(queryString);

  return queryresult.rows[0];
};

const list = async (id: string): Promise<Developers> => {
  const queryResult: DevelopersResulte = await client.query(
    "SELECT * FROM developers WHERE id = $1;",
    [id]
  );
  return queryResult.rows[0];
};

export default { create, list };
