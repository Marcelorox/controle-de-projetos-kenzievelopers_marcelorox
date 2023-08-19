import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { Projects, ProjectsCreate, ProjectsResulte } from "../interfaces";

const createProject = async (payload: ProjectsCreate): Promise<Projects> => {
  const queryString: string = format(
    'INSERT INTO  "projects" (%I) VALUES (%L) RETURNING * ',
    Object.keys(payload),
    Object.values(payload)
  );

  const queryresult: ProjectsResulte = await client.query(queryString);

  return queryresult.rows[0];
};

const listProject = async (id: string): Promise<Projects> => {
  const queryResult: ProjectsResulte = await client.query(
    "SELECT * FROM projects WHERE id = $1;",
    [id]
  );
  return queryResult.rows[0];
};

const patchProject = async (
  id: string,
  payload: Projects
): Promise<Projects> => {
  const queryString: string = format(
    `
    UPDATE "projects"
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
  const queryResult: ProjectsResulte = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default { createProject, listProject, patchProject };
