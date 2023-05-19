/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from "express";
import helloRouter from "./HelloRouter";
import { LogInfo } from "../utils/logger";

// Server instance
let server = express();

// Router instance
let rootRouter = express.Router();

// Activate for requests to http://localhost:8000/api/

// GET: http://localhost:8000/api/
rootRouter.get("/", (req: Request, res: Response) => {
  LogInfo("[ Routes - index ] GET: http://localhost:8000/api/");
  // Send HELLO WORLD
  res.send(
    "Welcome to API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose"
  );
});

// Redirections to Routers & Controllers
server.use("/", rootRouter); // http://localhost:8000/api/
server.use("/hello", helloRouter); // http://localhost:8000/api/hello --> HelloRouter
// Add more routes

export default server;
