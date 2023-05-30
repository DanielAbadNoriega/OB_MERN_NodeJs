import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogWarning, LogError } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

// ORM imports
import { registerUser, loginUser, logoutUser } from '../domain/orm/User.orm';

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
  @Post('/register')
  public async registerUser(user: IUser): Promise<any> {
    let response: any = '';

    if (user) {
      response = await registerUser(user)
        .then((r) => {
          LogSuccess(
            `[ /api/auth/register - AuthController ]  Register user: ${JSON.stringify(
              user
            )}`
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
    let response: any = '';

    if (auth) {
      response = await loginUser(auth)
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
        status: 400,
        message: 'Need a need a email or password to login.',
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
