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

// Obtain Secret key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY';

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
export const updateUserByID = async (id: string, user: any): Promise<any | undefined> => {
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
  try {
    let userModel = userEntity();

    let userFound: IUser | undefined = undefined;
    let token = undefined;

    // Check if user exists by Unique Email
    await userModel
      .findOne({ mail: auth.mail })
      .then((user: IUser) => {
        userFound = user;
      })
      .catch((error) => {
        console.error(`[ERROR Authentication in ORM]: User Not Found`);
        throw new Error(`[ERROR Authentication in ORM]: User Not Found: ${error}`);
      });

    // Check if Password is Valid (compare with bcrypt)
    let validPassword = bcrypt.compareSync(auth.password, userFound!.password);

    if (!validPassword) {
      console.error(`[ERROR Authentication in ORM]: Password Not Valid`);
      throw new Error(`[ERROR Authentication in ORM]: Password Not Valid`);
    }

    // Generate our JWT
    token = jwt.sign({ email: userFound!.mail }, secret, {
      expiresIn: '2h',
    });

    return {
      user: userFound,
      token: token,
    };
  } catch (error) {
    LogError(`[ ORM / POST - LOGIN ] Error: ${error}`);
  }
};

// -LOGOUT User
export const logoutUser = async (): Promise<any | undefined> => {
  // TODO: NOT IMPLEMENTED
};
