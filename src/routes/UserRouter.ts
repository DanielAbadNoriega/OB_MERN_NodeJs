import express, { Request, Response } from 'express';
import { UserController } from '../controller/user.controller';
import { LogInfo } from '../utils/logger';

// Router from express
let userRouter = express.Router();

// http://localhost:8000/api/users?id=646b8cfaa41a0d1ea4c9af3a
userRouter
  .route('/')
  // GET
  .get(async (req: Request, res: Response) => {
    // Obtain Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo(`[ UserRouter - GET (ID) ] Query Param: ${id}`);
    // Controller Instance to execute method
    const controller: UserController = new UserController();
    // Obtain Response
    const response = await controller.getUsers(id);
    // Send to the client the response
    return res.send(response);
  })
  .delete(async (req: Request, res: Response) => {
    // Obtain Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo(`[ UserRouter - DELETE (ID) ] Query Param: ${id}`);
    // Controller Instance to execute method
    const controller: UserController = new UserController();
    // Obtain Response
    const response = await controller.deleteUser(id);
    // Send to the client the response
    return res.send(response);
  });

export default userRouter;
