import { QueryResult } from "pg";

type Developers = {
  id: number;
  name: string;
  email: string;
};

type DevelopersCreate = Omit<Developers, "id">;
type DevelopersResulte = QueryResult<Developers>;

export { Developers, DevelopersCreate, DevelopersResulte };
