import { Delete, Get, Query, Route, Tags } from 'tsoa';
import { IUsersController } from './interfaces';
import { LogError, LogSuccess, LogWarning } from '../utils/logger';

// ORM - Users Collection
import {
  deleteUserByID,
  getAllUsers,
  getUserByID,
} from '../domain/orm/User.orm';

@Route('/api/users')
@Tags('UsersController')
export class UserController implements IUsersController {
  /**
   * Endpoint to retrieve the Users in the collection 'Users' of DB
   */
  @Get('/')
  public async getUsers(@Query() id?: string): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[ /api/users - UsersController ]  GET USER By ID: ${id}`);
      response = await getUserByID(id);
    } else {
      LogSuccess('[ /api/users - UsersController ]  GET ALL USERS Request');
      response = await getAllUsers();
    }
    console.log(response);
    return response;
  }

  @Delete('/')
  public async deleteUser(@Query() id?: string): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[ /api/users - UsersController ]  DELETE USER By ID: ${id}`);
      response = await deleteUserByID(id);
    } else {
      LogWarning(
        `[ /api/users - UsersController ] DELETE USER By ID: need an ID to Delete User.`
      );
      response = {
        message: 'DELETE USER By ID: need an ID to Delete User.',
      };
    }

    return response;
  }
}
