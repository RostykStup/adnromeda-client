import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChatResponse} from '../../../../../entity/message/chat-response';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.scss']
})
export class ChatBodyComponent implements OnInit {

  // @ts-ignore
  @ViewChild('chat_body') private chatBody: ElementRef;

  // @ts-ignore
  @Input() chat: ChatResponse;

  constructor() {
  }

  ngOnInit(): void {
    while (this.chat === undefined) {

    }
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      } catch (err) {
        this.scrollToBottom();
      }
    }, 300);

  }

}
