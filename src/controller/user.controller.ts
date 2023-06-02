import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { IUsersController } from './interfaces';
import { LogError, LogSuccess, LogWarning } from '../utils/logger';

// ORM - Users Collection
import {
  createUser,
  deleteUserByID,
  getAllUsers,
  getUserByID,
  updateUserByID,
} from '../domain/orm/User.orm';

@Route('/api/users')
@Tags('UsersController')
export class UserController implements IUsersController {
  /**
   * Endpoint to retrieve the Users in the collection 'Users' of DB.
   * @param {string} id Id of user to retrieve (optional).
   * @returns All user or user found by ID.
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
      // TODO: remove passwords from response
    }
    // console.log(response);
    return response;
  }

  /**
   * Endpoint to DELETE user in the collection 'Users' of DB.
   * @param {string} id Id of user to DELETE (optional).
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
            status: 204,
            message: `DELETE USER By ID: ${id} done successfully`,
          })
      );
    } else {
      LogWarning(
        `[ /api/users - UsersController ] DELETE USER By ID: need an ID to Delete User.`
      );
      response = {
        status: 400,
        message: 'DELETE USER By ID: need an ID to Delete User.',
      };
    }

    return response;
  }

  /**
   * Endpoint to CREATE user in the collection 'Users' of DB.
   * @param user JSON with properties of new User.
   * @returns message informing if creating user is success.
   */
  // @Post()
/*   public async createUser(user: any): Promise<any> {
    let response: any = '';

    await createUser(user)
      .then((r) => {
        LogSuccess(
          `[ /api/users - UsersController ] CREATE USER: ${JSON.stringify(
            user
          )}`
        );
        response = {
          message: `CREATE USER successfully: ${user.name}`,
        };
      })
      .catch((e) => {
        LogError(`[ /api/users - UsersController ] ERROR CREATE USER: ${e}`);
        LogError(
          `[ /api/users - UsersController ] ERROR CREATE USER: ${JSON.stringify(
            user
          )}`
        );
      });

    return response;
  } */

  /**
   * Endpoint to UPDATE user in the collection 'Users' of DB.
   * @param user JSON with new properties of User filtered by ID.
   * @param {string} id id from user to update.
   * @returns message informing if update is success.
   */
  public async updateUserByID(@Query() id: string, user: any): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(
        `[ /api/users - UsersController ] UPDATE USER ID ${id}: ${user}`
      );
      await updateUserByID(id, user).then(
        (r) =>
          (response = {
            status: 204,
            message: `User ${user.name} with id ${id} successfully updated.`,
          })
      );
    } else {
      LogWarning(
        `[ /api/users - UsersController ] UPDATING USER By ID: need an ID to Update User.`
      );
      response = {
        status: 400,
        message: 'UPDATING USER By ID: need an ID to Update User.',
      };
    }

    return response;
  }
}
