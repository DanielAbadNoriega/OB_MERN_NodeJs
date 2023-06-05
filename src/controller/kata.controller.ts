import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { IKataController } from './interfaces';
import { LogError, LogSuccess, LogWarning } from '../utils/logger';

// ORM - Katas Collection
import { getKatas, getKatasByLevel } from '../domain/orm/Kata.orm';
import { ErrorResponse } from './types';

export class KataController implements IKataController {
  /**
   * Endpoint to retrieve the katas in the collection 'katas' of DB.
   * @returns All katas sorted by level.
   */
  @Get('/')
  public async getKatas(): Promise<any> {

    let response: any = {};

    try {

      LogSuccess(`[ /api/katas - KatasController ]  GET ALL KATAS.`);

      response = await getKatas();

    } catch (error) {

      LogError(`[ /api/katas - KatasController ]  GET KATAS: ${error}`);

      response = {
        error: 404,
        message: "Error at the Katas' request.",
      };
    }

    return response;
  }

  /**
   * Endpoint to retrieve the katas in the collection 'katas' of DB.
   * @returns All katas sorted by level.
   */
  @Get('/level')
  public async getKatasByLevel(): Promise<any> {
    let response: ErrorResponse | any = {};

    try {
      LogSuccess(`[ /api/katas - KatasController ]  GET KATAS By LEVEL.`);

      response = await getKatasByLevel();
    } catch (error) {
      LogError(`[ /api/katas - KatasController ]  GET KATAS By LEVEL: ${error}`);

      response = {
        error: 404,
        message: "Error at the Katas' request by level.",
      };
    }

    return response;
  }
}
