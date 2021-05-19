import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '../../../../service/message/chat.service';
import {ChatResponse} from '../../../../entity/message/chat-response';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  // @ts-ignore
  @Input() chatId: number;

  // @ts-ignore
  chat: ChatResponse;

  constructor(private charService: ChatService) {
  }

  ngOnInit(): void {
    this.charService.getChatById(this.chatId).subscribe((r) => {
      console.log(r);
      this.chat = r;
    });
  }

}
