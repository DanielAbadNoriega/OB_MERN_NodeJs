import express, { Request, Response } from 'express';
import { KataController } from '../controller/kata.controller';
import { LogInfo } from '../utils/logger';
import { ErrorResponse } from '@/controller/types';

let katasRouter = express.Router();

katasRouter
.route('/')
// GET (ALL KATAS)
.get(async (req: Request, res: Response) => {
  
  LogInfo(`[ KatasRouter - GET ] Get all katas.`);
  // Controller Instance to execute method
  const controller: KataController = new KataController();
  // Obtain Response
  const response: ErrorResponse | any = await controller.getKatas();
  // Send to the client the response

  return response?.error ? res.status(response.error).send(response.message) : res.status(200).send(response);
})

katasRouter
.route('/level')
// GET (by level)
.get(async (req: Request, res: Response) => {
  
  LogInfo(`[ KatasRouter - GET ] Get katas by level.`);
  // Controller Instance to execute method
  const controller: KataController = new KataController();
  // Obtain Response
  const response: any = await controller.getKatasByLevel();
  // Send to the client the response

  return response?.error ? res.status(response.error).send(response.message) : res.status(200).send(response);
})

export default katasRouter;