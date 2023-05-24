import { BasicResponse, ByeResponse } from '../types';

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}

export interface IByeController {
  getMessage(name?: string): Promise<ByeResponse>;
}

export interface IUsersController {
  // READ ALL USERS from Data Base || GET USER By ID
  getUsers(id?: string): Promise<any>;

  // DELETE USER by ID
  deleteUser(id?: string): Promise<any>;
}
