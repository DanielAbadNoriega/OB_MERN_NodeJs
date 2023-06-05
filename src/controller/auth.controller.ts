import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogWarning, LogError, LogInfo } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

// ORM imports
import { registerUser, loginUser, logoutUser, getUserByID } from '../domain/orm/User.orm';
import { AuthResponse, ErrorResponse } from './types';

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
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
          LogSuccess(`[ /api/auth/register - AuthController ]  Register user: ${user.mail}`);
          response = {
            message: `USER REGISTERED successfully: ${user.name}`,
          };
        })
        .catch((e) => {
          LogError(`[ /api/auth/register - AuthController ] ERROR REGISTER USER: ${e}`);
          LogError(`[ /api/auth/register - AuthController ] ERROR REGISTER USER: ${JSON.stringify(user)}`);
        });
    } else {
      LogWarning(`[ /api/auth/register - AuthController ] Register user: need a user to register.`);
      response = {
        status: 400,
        message: 'Need a user to register.',
      };
    }
    // console.log(response);
    return response;
  }

  /*   @Post('/login') */
  public async loginUser(auth: IAuth): Promise<any> {
    let response: AuthResponse | ErrorResponse | undefined;

    LogInfo(`[ LOGIN - CONTROLLER ] User: ${JSON.stringify(auth)}`);

    if (auth) {
      LogSuccess(`[ /api/auth/register - AuthController ] LOGIN: ${JSON.stringify(auth.mail)}`);
      let data = await loginUser(auth);
      response = {
        token: data.token,
        message: `Welcome, ${data.user.name}`,
      };
    } else {
      LogWarning(`[ /api/auth/login - AuthController ] LOGIN: needs Auth Entity (email && password) to login.`);
      response = {
        error: '[AUTH ERROR]: Email & Password are needed',
        message: 'Please, provide a email && password to logi',
      };
    }
    // console.log(response);
    return response;
  }

  /**
   * Endpoint to retreive the User in the Collection "Users" of DB
   * Middleware: Validate JWT
   * In headers you must add the x-access-token with a valid JWT
   * @param {string} id Id of user to retreive (optional)
   * @returns All user o user found by iD
   */
  @Get('/me')
  public async userData(@Query() id: string): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[ /api/auth/me - AuthController ] Get User Data By ID: ${id} `);
      response = await getUserByID(id);
    }

    return response;
  }

  /*  @Post('/logout') */
  public async logoutUser(): Promise<any> {
    // TODO: Close session of user
    let response: any = '';
    return;
  }
}
