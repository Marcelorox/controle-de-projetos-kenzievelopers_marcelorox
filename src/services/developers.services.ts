import { Developers, DevelopersCreate, DevelopersResulte } from "../interfaces";
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

const createDev = async (payload: DevelopersCreate): Promise<Developers> => {
  const queryString: string = format(
    'INSERT INTO  "developers" (%I) VALUES (%L) RETURNING * ',
    Object.keys(payload),
    Object.values(payload)
  );

  const queryresult: DevelopersResulte = await client.query(queryString);

  return queryresult.rows[0];
};

const listDev = async (id: string): Promise<Developers> => {
  const queryList: string = `
    SELECT 
    "d"."id" AS "developerId",
    "d"."name" AS "developerName",
    "d"."email" AS "developerEmail",
    "di"."DeveloperSince" AS "developerInfoDeveloperSince",
    "di"."prefferedOS" AS "developerInfoPrefferedOS",
    FROM "developers" AS "d"
    LEFT JOIN "developerInfos" AS "di"
    ON "di"."id" - "d"."id"
    WHERE "d"."id" - $1
    `;
  const queryResult: DevelopersResulte = await client.query(queryList, [id]);

  return queryResult.rows[0];
};

const patchDev = async (
  id: string,
  payload: Developers
): Promise<Developers> => {
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

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: DevelopersResulte = await client.query(queryConfig);

  return queryResult.rows[0];
};

const deleteDeveloper = async (id: string) => {
  const queryString: string = `
      DELETE FROM "developers"
      WHERE "id" = $1
      RETURNING *;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: DevelopersResulte = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default { createDev, listDev, patchDev, deleteDeveloper };
