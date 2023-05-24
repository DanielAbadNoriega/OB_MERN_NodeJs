import { Delete, Get, Post, Query, Route, Tags } from 'tsoa';
import { IUsersController } from './interfaces';
import { LogError, LogSuccess, LogWarning } from '../utils/logger';

// ORM - Users Collection
import {
  createUser,
  deleteUserByID,
  getAllUsers,
  getUserByID,
} from '../domain/orm/User.orm';

@Route('/api/users')
@Tags('UsersController')
export class UserController implements IUsersController {
  /**
   * Endpoint to retrieve the Users in the collection 'Users' of DB
   * @param {string} id Id of user to retrieve (optional)
   * @returns All user or user found by ID
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

  /**
   * Endpoint to DELETE user in the collection 'Users' of DB
   * @param {string} id Id of user to DELETE (optional)
   * @returns message informing if deletion is success.
   */
  @Delete('/')
  public async deleteUser(@Query() id?: string): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[ /api/users - UsersController ]  DELETE USER By ID: ${id}`);
      await deleteUserByID(id).then(
        (res) =>
          (response = {
            message: `DELETE USER By ID: ${id} done successfully`,
          })
      );
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

  @Post('/')
  public async createUser(user: any): Promise<any> {
    let response: any = '';

    await createUser(user).then((r) => {
      LogSuccess(`[ /api/users - UsersController ] CREATE USER: ${user}`);
      response = {
        message: `CREATE USER successfully: ${user.name}`,
      };
    });

    return response;
  }
}
