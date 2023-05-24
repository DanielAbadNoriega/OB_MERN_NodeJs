import { userEntity } from '../entities/User.entity';

import { LogError, LogSuccess } from '../../utils/logger';

// CRUD

/**
 * Method to obtain all Users from Collection 'Users' in Mongo Server
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
  try {
    let userModel = userEntity();
    LogSuccess(`[ ORM / GET - ALL USERS ] Success.`);

    // Search all users
    return await userModel.find();
  } catch (error) {
    LogError(`[ ORM / GET - ALL USERS ] Error: ${error}`);
  }
};

// - get User By ID
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    LogSuccess(`[ ORM / GET USER (ID) ] Success.`);

    // Search User By iD
    return await userModel.findById(id);
  } catch (error) {
    LogError(`[ ORM - GET USER (ID) ] Error: ${error}`);
  }
};

// - Delete User By ID
export const deleteUserByID = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    LogSuccess(`[ ORM / DELETE USER (ID) ] Success.`);

    // Search User By iD
    return await userModel.findByIdAndDelete(id);
  } catch (error) {
    LogError(`[ ORM - DELETE USER (ID) ] Error: ${error}`);
  }
};

// TODO:
// - get User By Email
// - Create New User
// - Update User By ID
