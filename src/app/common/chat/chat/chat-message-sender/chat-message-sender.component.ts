import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '../../../../../service/message/chat.service';
import {MessageRequest} from '../../../../../entity/message/MessageRequest';
import {ChatResponse} from '../../../../../entity/message/chat-response';

@Component({
  selector: 'app-chat-message-sender',
  templateUrl: './chat-message-sender.component.html',
  styleUrls: ['./chat-message-sender.component.scss']
})
export class ChatMessageSenderComponent implements OnInit {

  constructor(private chatService: ChatService) {
  }

  // @ts-ignore
  @Input() chat: ChatResponse;

  text = '';

  ngOnInit(): void {
  }

  sendMessage(): void {
    if (this.text.length > 0) {
      const request = new MessageRequest();
      request.text = this.text;
      this.chatService.sendMessage(this.chat.id, request).subscribe(() => {
        this.text = '';
      });
    }
  }
}
