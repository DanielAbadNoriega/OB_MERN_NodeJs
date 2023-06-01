import express, { Request, Response } from 'express';
import { UserController } from '../controller/user.controller';
import { LogInfo } from '../utils/logger';

// Body Parser to read BODY from requests
import bodyParser from 'body-parser';

let jsonParser = bodyParser.json();

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
    return res.status(200).send(response);
  })
  // DELETE
  .delete(async (req: Request, res: Response) => {
    // Obtain Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo(`[ UserRouter - DELETE (ID) ] Query Param: ${id}`);
    // Controller Instance to execute method
    const controller: UserController = new UserController();
    // Obtain Response
    const response = await controller.deleteUser(id);
    // Send to the client the response
    return res.status(200).send(response);
  })
  // CREATE
  // * jsonParser let us use body request.
  .post(jsonParser, async (req: Request, res: Response) => {
    let name: any = req?.query?.name;
    let mail: any = req?.query?.mail;
    let age: any = req?.query?.age;

    let user = {
      name: name || 'default',
      mail: mail || 'default@mail.com',
      age: age || 18,
    };

    let name2: any = req?.body?.name;
    LogInfo(`### NAME in BODY: ${name2}`);

    LogInfo(`[ UserRouter - CREATE USER ]`);
    const controller: UserController = new UserController();

    const response = await controller.createUser(user);
    res.status(201).send(response);
  })
  .put(async (req: Request, res: Response) => {
    // Obtain Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo(`[ UserRouter - UPDATE (ID) ] Query Param: ${id}`);

    let name: any = req?.query?.name;
    let mail: any = req?.query?.mail;
    let age: any = req?.query?.age;

    let user = {
      name: name || 'default',
      mail: mail || 'default@mail.com',
      age: age || 18,
    };

    // Controller Instance to execute method
    const controller: UserController = new UserController();
    // Obtain Response
    const response = await controller.updateUserByID(id, user);
    // Send to the client the response
    res.status(200).send(response);
  });

export default userRouter;
