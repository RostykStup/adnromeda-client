import {MessageResponse} from './message-response';
import {DateBlockMessageResponse} from './date-block-message-response';

export class ChatResponse {
  // @ts-ignore
  id: number;
  dayBlocks = new Array<DateBlockMessageResponse>();
  // @ts-ignore
  username: string;
  // @ts-ignore
  userId: number;
}
