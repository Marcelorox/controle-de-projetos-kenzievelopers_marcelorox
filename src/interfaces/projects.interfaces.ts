import { QueryResult } from "pg";

type Projects = {
  name: string;
  description: string;
  repository: string;
  startDate: string;
  endDate?: string | null;
  developerId?: number | null;
};

type ProjectsCreate = Omit<Projects, "id">;
type ProjectsResulte = QueryResult<Projects>;

export { Projects, ProjectsCreate, ProjectsResulte };
