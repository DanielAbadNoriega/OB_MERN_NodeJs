import express, { Request, Response } from 'express';
import { ByeController } from '../controller/ByeController';
import { LogInfo } from '../utils/logger';

// Router from express
let byeRouter = express.Router();

byeRouter.route('/').get(async (req: Request, res: Response) => {
  let name: any = req?.query?.name;
  LogInfo(`[byeRouer] Query Param: ${name}`);
  // Controller instance to execute method
  const controller: ByeController = new ByeController();
  // Obtain response
  const response = await controller.getMessage(name);
  // Send to the client the response
  return res.send(response);
});

export default byeRouter;