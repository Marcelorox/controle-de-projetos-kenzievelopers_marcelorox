import { QueryResult } from "pg";

type Developers = {
  id: number;
  name: string;
  email: string;
};

type DevelopersCreate = Omit<Developers, "id">;
type DevelopersResulte = QueryResult<Developers>;

interface DeveloperInfo {
  id: number;
  developerSince: string; // Formato: "YYYY-MM-DDTHH:mm:ss.sssZ"
  preferredOS: "Windows" | "Linux" | "MacOS";
  developerId: number;
}

type DevelopersInfoCreate = Omit<DeveloperInfo, "id">;
type DevelopersInfoResulte = QueryResult<DeveloperInfo>;

export {
  Developers,
  DevelopersCreate,
  DevelopersResulte,
  DeveloperInfo,
  DevelopersInfoCreate,
  DevelopersInfoResulte,
};
