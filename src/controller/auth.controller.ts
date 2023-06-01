import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogWarning, LogError } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

// ORM imports
import { registerUser, loginUser, logoutUser } from '../domain/orm/User.orm';
import { AuthResponse, ErrorResponse } from './types';

@Tags('AuthController')
@Route('/api/auth')
export class AuthController implements IAuthController {
  @Post('/register')
  public async registerUser(user: IUser): Promise<any> {
    let response: any = '';

    if (user) {
      LogSuccess(`[/api/auth/register] Register New User: ${user.mail} `);
      /*       await registerUser(user).then((r) => {
        LogSuccess(`[/api/auth/register] Created User: ${user.mail} `);
        response = {
            message: `User created successfully: ${user.name}`
        }
    }); */
      await registerUser(user)
        .then((r) => {
          LogSuccess(
            `[ /api/auth/register - AuthController ]  Register user: ${user.mail}`
          );
          response = {
            message: `USER REGISTERED successfully: ${user.name}`,
          };
        })
        .catch((e) => {
          LogError(
            `[ /api/auth/register - AuthController ] ERROR REGISTER USER: ${e}`
          );
          LogError(
            `[ /api/auth/register - AuthController ] ERROR REGISTER USER: ${JSON.stringify(
              user
            )}`
          );
        });
    } else {
      LogWarning(
        `[ /api/auth/register - AuthController ] Register user: need a user to register.`
      );
      response = {
        status: 400,
        message: 'Need a user to register.',
      };
    }
    // console.log(response);
    return response;
  }

  @Post('/login')
  public async loginUser(auth: IAuth): Promise<any> {

    let response: AuthResponse | ErrorResponse | undefined;

    if (auth) {
     await loginUser(auth)
        .then((r) => {
          LogSuccess(
            `[ /api/auth/register - AuthController ] LOGIN: ${JSON.stringify(
              auth.mail
            )}`
          );
          response = {
            message: `USER LOGIN successfully: ${auth.mail}`,
            token: r.token, // JWT generated for logged in user
          };
        })
        .catch((e) => {
          LogError(
            `[ /api/auth/login - AuthController ] ERROR LOGIN USER: ${e}`
          );
          LogError(
            `[ /api/auth/login - AuthController ] ERROR LOGIN USER: ${JSON.stringify(
              auth.mail
            )}`
          );
        });
    } else {
      LogWarning(
        `[ /api/auth/login - AuthController ] LOGIN: needs Auth Entity (email && password) to login.`
      );
      response = {
        error: '[AUTH ERROR]: Email & Password are needed',
        message: 'Please, provide a email && password to logi',
      };
    }
    // console.log(response);
    return response;
  }

  @Post('/logout')
  public async logoutUser(): Promise<any> {
    // TODO: Close session of user
    let response: any = '';
    return;
  }
}
