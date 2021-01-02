import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {AccountLoginRequest} from '../../entity/account/account-login-request';
import {AuthenticationResponse} from '../../entity/account/authentication-response';
import {AccountDataRequest} from '../../entity/account/account-data-request';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private httpClient: HttpClient) {
  }

  accountURL = GlobalConstants.API_URL + 'account';

  registerGoodsSeller(accountLoginRequest: AccountLoginRequest): Observable<AuthenticationResponse> {
    const url = this.accountURL + '/register/goods-seller';
    return this.httpClient.post<AuthenticationResponse>(url, accountLoginRequest);
  }

  updateAccountCountry(accountData: AccountDataRequest): Observable<any> {
    const url = this.accountURL + '/update';
    return this.httpClient.put<any>(url, accountData, {headers: GlobalConstants.getRequestAuthorizationHeader()})
      ;
  }

  writeAuthenticationToLocalStorage(authentication: AuthenticationResponse): void {
    localStorage.setItem('andro_user_token', authentication.token);
    localStorage.setItem('andro_user_name', authentication.username);
    localStorage.setItem('andro_user_role', authentication.userRole);
  }
}
