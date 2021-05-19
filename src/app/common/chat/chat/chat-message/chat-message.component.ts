import {Component, Input, OnInit} from '@angular/core';
import {MessageResponse} from '../../../../../entity/message/message-response';
import {AccountService} from '../../../../../service/account/account.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  // @ts-ignore
  @Input() message: MessageResponse;

  // @ts-ignore
  accountId: number;

  ngOnInit(): void {
    this.accountId = this.accountService.getAccountMainDataByAuthNum(this.accountService.getAuthNumFromCurrentRoute()).id;
  }

}
