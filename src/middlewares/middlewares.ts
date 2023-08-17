import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import format from "pg-format";
import { Developers, DevelopersCreate, DevelopersResulte } from "../interfaces";

// async function verifyDeveloper(
//   req: Request,
//   res: Response,
//   Next: NextFunction
// ): Promise<Response> {
//   const payload: DevelopersCreate = req.body;

//   const queryString: string = format(
//     `
//   SELECT * FROM developers
//   `,
//     Object.keys(payload),
//     Object.values(payload)
//   );

//   const queryResult: DevelopersResulte = await client.query(queryString);
//   const developer: Developers = queryResult.rows[0];

//   return res.status(201).json(developer);
// }

// export { verifyDeveloper };
