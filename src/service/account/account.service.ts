import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {AccountLoginRequest} from '../../entity/account/account-login-request';
import {AuthenticationResponse} from '../../entity/account/authentication-response';
import {AccountDataRequest} from '../../entity/account/account-data-request';
import {ImageRequest} from '../../entity/account/image-request';
import {CookieService} from 'ngx-cookie-service';
import {formatI18nPlaceholderName} from '@angular/compiler/src/render3/view/i18n/util';
import {AccountMainData} from '../../entity/account/account-main-data';
import {NavigationService} from '../../common/navigation.service';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private httpClient: HttpClient,
              private cookiesService: CookieService, private route: ActivatedRoute) {
  }

  private accountsCount = 5;

  accountURL = GlobalConstants.API_URL + 'account';

  getLoggedAuthNumbers(): Array<number> {
    const nums = new Array<number>();
    for (let i = 0; i < this.accountsCount; i++) {
      if (this.isLoggedByAuthNum(i)) {
        nums.push(i);
      }
    }
    return nums;
  }

  getAccountMainDataByAuthNum(authNum: number): AccountMainData {
    const data = new AccountMainData();
    data.authNum = authNum;
    data.username = this.cookiesService.get('andromeda-username-' + authNum);
    data.id = +this.cookiesService.get('andromeda-id-' + authNum);
    data.avatar = this.cookiesService.get('andromeda-avatar-' + authNum);
    if (data.avatar === 'null') {
      data.avatar = null;
    }
    data.userRole = this.cookiesService.get('andromeda-role-' + authNum);
    data.login = this.cookiesService.get('andromeda-login-' + authNum);
    data.password = this.cookiesService.get('andromeda-password-' + authNum);
    data.token = this.cookiesService.get('andromeda-token-' + authNum);
    return data;
  }

  getAuthNumForLogin(): number {
    for (let i = 0; i < this.accountsCount; i++) {
      if (!this.cookiesService.check('andromeda-token-' + i)) {
        return i;
      }
    }
    return -1;
  }

  getAuthNumForEmptyParam(): number {
    for (let i = 0; i < this.accountsCount; i++) {
      if (this.cookiesService.check('andromeda-token-' + i)) {
        return i;
      }
    }
    return -1;
  }


  isAccountLogged(login: string): boolean {
    for (let i = 0; i < this.accountsCount; i++) {
      if (this.cookiesService.get('andromeda-login-' + i) === login) {
        return true;
      }
    }
    return false;
  }

  writeLoginPasswordDataToCookies(login: string, password: string, authNum: number | null): void {
    if (authNum == null) {
      authNum = this.getAuthNumForEmptyParam();
    }
    this.cookiesService.set('andromeda-login-' + authNum, login, {expires: 365, path: '/'});
    this.cookiesService.set('andromeda-password-' + authNum, password, {expires: 365, path: '/'});
  }

  writeAuthenticationToCookies(authentication: AuthenticationResponse): number {
    const authNum = this.getAuthNumForLogin();
    if (authNum !== -1) {
      this.cookiesService.set('andromeda-token-' + authNum, authentication.token, {expires: 365, path: '/'});
      this.cookiesService.set('andromeda-role-' + authNum, authentication.userRole, {expires: 365, path: '/'});
      this.cookiesService.set('andromeda-id-' + authNum, authentication.id.toString(), {expires: 365, path: '/'});
      this.cookiesService.set('andromeda-username-' + authNum, authentication.username, {expires: 365, path: '/'});
      this.cookiesService.set('andromeda-avatar-' + authNum, authentication.avatar, {expires: 365, path: '/'});
    }
    return authNum;
  }

  isLoggedByAuthNum(authNum: number): boolean {
    return this.cookiesService.check('andromeda-token-' + authNum);
  }


  isLogged(): boolean {
    for (let i = 0; i < this.accountsCount; i++) {
      if (this.cookiesService.check('andromeda-token-' + i)) {
        return true;
      }
    }
    return false;
  }

  logOut(authNum: number | null): void {
    if (authNum == null) {
      authNum = this.getAuthNumForEmptyParam();
    }
    this.cookiesService.delete('andromeda-token-' + authNum, '/');
    this.cookiesService.delete('andromeda-role-' + authNum, '/');
    this.cookiesService.delete('andromeda-id-' + authNum, '/');
    this.cookiesService.delete('andromeda-username-' + authNum, '/');
    this.cookiesService.delete('andromeda-avatar-' + authNum, '/');
    this.cookiesService.delete('andromeda-login-' + authNum, '/');
    this.cookiesService.delete('andromeda-password-' + authNum, '/');
  }

  registerGoodsSeller(accountLoginRequest: AccountLoginRequest): Observable<AuthenticationResponse> {
    const url = this.accountURL + '/register/goods-seller';
    return this.httpClient.post<AuthenticationResponse>(url, accountLoginRequest);
  }

  registerUser(accountLoginRequest: AccountLoginRequest): Observable<AuthenticationResponse> {
    const url = this.accountURL + '/register/user';
    return this.httpClient.post<AuthenticationResponse>(url, accountLoginRequest);
  }

  updateAccountCountry(accountData: AccountDataRequest): Observable<any> {
    const url = this.accountURL + '/update';
    return this.httpClient.put<any>(url, accountData, {headers: this.getCurrentRequestAuthorizationHeader()})
      ;
  }

  getAvatarImagePath(imageName: string | null, accountId: number): string {
    return imageName !== null && imageName !== '' ? GlobalConstants.API_URL + 'image/user_' + accountId + '/' + imageName : 'https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png';
  }


  loginRequest(accountLoginRequest: AccountLoginRequest): Observable<AuthenticationResponse> {
    const url = this.accountURL + '/login';
    return this.httpClient.post<AuthenticationResponse>(url, accountLoginRequest);
  }

  changeAvatar(request: ImageRequest): Observable<any> {
    const url = this.accountURL + '/avatar';
    return this.httpClient.put(url, request, {headers: this.getCurrentRequestAuthorizationHeader()});
  }

  public getCurrentRequestAuthorizationHeader(): any {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAccountMainDataByAuthNum(this.getAuthNumFromCurrentRoute()).token
    };
  }

  public getAuthNumFromCurrentRoute(): number {
    if (this.route.snapshot.queryParamMap.get('auth') !== null) {
      return Number(this.route.snapshot.queryParamMap.get('auth'));
    } else {
      return this.getAuthNumForEmptyParam();
    }
  }
}
