import {MessageResponse} from './message-response';

export class DateBlockMessageResponse {
  messages = new Array<MessageResponse>();
  // @ts-ignore
  date: string;
}
