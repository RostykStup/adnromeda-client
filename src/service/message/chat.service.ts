import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {Observable} from 'rxjs';
import {ChatResponse} from '../../entity/message/chat-response';
import {NavigationService} from '../../common/navigation.service';
import {MessageResponse} from '../../entity/message/message-response';
import {MessageRequest} from '../../entity/message/MessageRequest';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private httpClient: HttpClient, private navigationService: NavigationService) {
  }

  charUrl = GlobalConstants.API_URL + 'chat';

  getChatById(id: number): Observable<ChatResponse> {
    const url = this.charUrl + '?id=' + id;
    return this.httpClient.get<ChatResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  sendMessage(id: number, request: MessageRequest): Observable<any> {
    const url = this.charUrl + '/message?chatId=' + id;
    return this.httpClient.post(url, request, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }
}
