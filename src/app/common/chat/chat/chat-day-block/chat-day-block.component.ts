import {Component, Input, OnInit} from '@angular/core';
import {DateBlockMessageResponse} from '../../../../../entity/message/date-block-message-response';

@Component({
  selector: 'app-chat-day-block',
  templateUrl: './chat-day-block.component.html',
  styleUrls: ['./chat-day-block.component.scss']
})
export class ChatDayBlockComponent implements OnInit {

  constructor() { }

  // @ts-ignore
  @Input() block: DateBlockMessageResponse;

  ngOnInit(): void {
  }

}
