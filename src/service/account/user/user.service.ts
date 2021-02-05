import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserDataResponse} from '../../../entity/account/user/user-data-response';
import {GlobalConstants} from '../../../common/global-constants';
import {UserSettingsRequest} from '../../../entity/account/user/user-settings-request';
import {UserAdvertisementViewsResponse} from '../../../entity/statistics/advertisement-view/user-advertisement-views-response';
import {PaginationRequest} from '../../../entity/pagination-request';
import {UserDataRequest} from '../../../entity/account/user/user-data-request';

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

  // http://localhost:8080/user/views?page=0&size=30

  getUserViews(request: PaginationRequest, dateFrom: string | null, dateTo: string | null): Observable<UserAdvertisementViewsResponse> {
    const url = this.userURL + '/views';

    let params = new HttpParams();
    params = params.append('page', request.page.toString());
    params = params.append('size', request.size.toString());
    if (dateFrom != null) {
      params = params.append('dateFrom', dateFrom);
    }
    if (dateTo != null) {
      params = params.append('dateTo', dateTo);
    }

    return this.httpClient.get<UserAdvertisementViewsResponse>(url, {headers: GlobalConstants.getRequestAuthorizationHeader(), params});
  }


  changeUserData(request: UserDataRequest): Observable<any> {
    const url = this.userURL + '/change-data';
    return this.httpClient.put(url, request, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  deleteUserAvatar(): Observable<any> {
    const url = this.userURL + '/delete-avatar';
    return this.httpClient.delete(url, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

}
