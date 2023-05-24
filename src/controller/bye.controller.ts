import { Get, Query, Route, Tags } from 'tsoa';
import { ByeResponse } from './types';
import { IByeController } from './interfaces';
import { LogSuccess } from '../utils/logger';

@Route('/api/goodbye')
@Tags('ByeController')
export class ByeController implements IByeController {
  /**
   * Endpoint to retreive a Message "Goodbye {name}" and the date in JSON
   * @param { string } name Name of user to be greeted
   * @returns {ByeResponse} Promise of BasicResponse
   */
  @Get('/')
  public async getMessage(@Query() name: string): Promise<ByeResponse> {
    LogSuccess('[api/goodbye] Get Request');
    const timePassed = Date.now();

    return {
      message: `Goodbye${' ' + name + '!' || '!'}`,
      Date: new Date(timePassed).toDateString(),
    };
  }
}
