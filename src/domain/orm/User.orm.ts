import { userEntity } from '../entities/User.entity';

import { LogError, LogSuccess } from '../../utils/logger';

// CRUD

/**
 * Method to obtain all Users from Collection 'Users' in Mongo Server
 */
export const GetAllUsers = async (): Promise<any[] | undefined> => {
  try {
    let userModel = userEntity();

    LogSuccess(`[ ORM / GET - ALL USERS ]: Success.`);
    // Search all users
    return await userModel.find({ isDelete: false });
  } catch (error) {
    LogError(`[ ORM / GET - ALL USERS ] Error: ${error}`);
  }
};


// TODO: 
// - get User By ID
// - get User By Email
// - Delete User By ID
// - Create New User
// - Update User By ID