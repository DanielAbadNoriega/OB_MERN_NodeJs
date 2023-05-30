import express, { Request, Response } from 'express';
import { AuthController } from '../controller/auth.controller';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '@/domain/interfaces/IAuth.interface';

// BCRYPT for passwords
import bcrypt from 'bcrypt';

// Router Express
let authRouter = express.Router();

authRouter
  .route('/auth')
  // REGISTER
  .post(async (req: Request, res: Response) => {
    let { name, mail, password, age } = req.body;
    let hashedPassword = '';

    if (name && mail && password && age) {
      // Obtain the password in request and cypher
      hashedPassword = bcrypt.hashSync(password, 8);

      let newUser: IUser = {
        name,
        mail,
        password: hashedPassword,
        age,
      };
      // Controller Instance to execute method
      const controller: AuthController = new AuthController();
      //Obtain response
      const response: any = await controller.registerUser(newUser);
      // Send to the client the response
      return res.status(200).send(response);
    }
  })
  // LOGIN
  .post(async (req: Request, res: Response) => {
    let { mail, password } = req.body;

    if (mail && password) {
      // Controller Instance to execute method
      const controller: AuthController = new AuthController();

      // TODO: use IAuth
      let auth: IAuth = {
        mail,
        password,
      };

      //Obtain response
      const response: any = await controller.loginUser(auth);

      // Send to the client the response which includes the JWT to authorize requests
      return res.status(200).send(response);
    }
  });

export default authRouter;
