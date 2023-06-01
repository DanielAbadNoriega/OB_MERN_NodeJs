import { userEntity } from '../entities/User.entity';
import { LogError, LogSuccess } from '../../utils/logger';
import { IUser } from '../interfaces/IUser.interface';
import { IAuth } from '../interfaces/IAuth.interface';

// BCRYPT for passwords
import bcrypt from 'bcrypt';

// JWT
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

// Configuration the .env file
dotenv.config();

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

// - GET User By ID
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

// - DELETE User By ID
export const deleteUserByID = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    LogSuccess(`[ ORM / DELETE USER (ID) ] Success.`);

    // DELETE User By iD
    return await userModel.findByIdAndDelete(id);
  } catch (error) {
    LogError(`[ ORM - DELETE USER (ID) ] Error: ${error}`);
  }
};

// - CREATE New User
export const createUser = async (user: any): Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    LogSuccess(`[ ORM / CREATE USER ] Success.`);

    // CREATE New User
    return await userModel.create(user);
  } catch (error) {
    LogError(`[ ORM - CREATING USER ] Error: ${error}`);
  }
};

// - UPDATE User By ID
export const updateUserByID = async (
  id: string,
  user: any
): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    // UPDATE User
    return await userModel.findByIdAndUpdate(id, user);
  } catch (error) {
    LogError(`[ ORM - UPDATING USER ] Error updating user ${id}: ${error}`);
  }
};

// - REGISTER User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    LogSuccess(`[ ORM / POST - REGISTER ] Success.`);

    // Register User
    return await userModel.create(user);
  } catch (error) {
    LogError(`[ ORM / POST - REGISTER ] Error: ${error}`);
  }
};

// - LOGIN User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  // TODO: NOT IMPLEMENTED
  try {
    let userModel = userEntity();
    LogSuccess(`[ ORM / POST - LOGIN ] Success.`);

    // FIND user by mail
    return await userModel.findOne(
      { mail: auth.mail },
      (err: any, user: IUser) => {
        if (err) {
          // TODO: return ERROR --> ERROR while searching(500)
        }

        if (!user) {
          // TODO: return ERROR --> ERROR USER NOT FOUND(404)
        }

        // use Bcrypt to Compare Password
        let validPassword = bcrypt.compareSync(auth.password, user.password);

        if (!validPassword) {
          // TODO --> NOT AUTHORISED (401)
        }
        const secretWord: string = process.env.SECRETKEY || 'MYSECRET';
        // Create JWT
        // TODO: Secret must be in .env
        let token = jwt.sign({ mail: user.mail }, secretWord, {
          expiresIn: '2h',
        });

        return token;
      }
    );
  } catch (error) {
    LogError(`[ ORM / POST - LOGIN ] Error: ${error}`);
  }
};

// -LOGOUT User
export const logoutUser = async (): Promise<any | undefined> => {
  // TODO: NOT IMPLEMENTED
};
