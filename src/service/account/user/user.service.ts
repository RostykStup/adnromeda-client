import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserDataResponse} from '../../../entity/account/user/user-data-response';
import {GlobalConstants} from '../../../common/global-constants';
import {UserSettingsRequest} from '../../../entity/account/user/user-settings-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  userURL = GlobalConstants.API_URL + 'user';

  loadUserData(): Observable<UserDataResponse> {
    const url = this.userURL + '/data';
    return this.httpClient.get<UserDataResponse>(url, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  changeUserSettings(request: UserSettingsRequest): Observable<any> {
    const url = this.userURL + '/settings';
    return this.httpClient.put(url, request, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

}
