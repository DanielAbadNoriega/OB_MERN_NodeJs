import { ByeResponse } from './types';
import { IByeController } from './interfaces';
import { LogSuccess } from '../utils/logger';

export class ByeController implements IByeController {
  public async getMessage(name: string | undefined): Promise<ByeResponse> {
    LogSuccess('[api/goodbye] Get Request');
    const timePassed = Date.now();

    return {
      message: `Goodbye${ (" "+name+"!") || "!"}`,
      Date: new Date(timePassed).toDateString(),
    };
  }
}
