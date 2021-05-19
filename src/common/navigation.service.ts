import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaginationRequest} from '../entity/pagination-request';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../service/account/account.service';


@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService) {
  }

  private static userUrlPrefix = '/u/';
  private static sellerUrlPrefix = '/s/';

  public static getSellerUrl(): string {
    return this.sellerUrlPrefix;
  }

  static getSellerGoodsListUrl(): string {
    return this.sellerUrlPrefix + 'goods';
  }

  public static getSellerOrdersUrl(): string {
    return this.sellerUrlPrefix + 'orders';
  }

  public static getUserUrl(): string {
    return this.userUrlPrefix;
  }

  public static getUserNotificationsUrl(): string {
    return this.userUrlPrefix + 'notifications';
  }

  public static getUserCartUrl(): string {
    return this.userUrlPrefix + 'cart';
  }

  public static getUserMakingOrderUrl(): string {
    return this.userUrlPrefix + 'make-order';
  }

  public static getUserOrdersUrl(): string {
    return this.userUrlPrefix + 'orders';
  }

  public static getUserOrderDataUrl(): string {
    return this.userUrlPrefix + 'order-data';
  }

  public static getUserLeaveFeedbackUrl(): string {
    return this.userUrlPrefix + 'leave-feedback';
  }

  public static getUserAddressesUrl(): string {
    return this.userUrlPrefix + 'addresses';
  }

  public static getUserSavedAdvertisementsUrl(): string {
    return this.userUrlPrefix + 'saved';
  }

  public static getUserProfileUrl(): string {
    return this.userUrlPrefix + 'profile';
  }

  public static getUserSettingsUrl(): string {
    return this.userUrlPrefix + 'settings';
  }

  public static getUserViewsUrl(): string {
    return this.userUrlPrefix + 'views';
  }

  public static convertPaginationRequestToParamsQuery(request: PaginationRequest): string {
    return 'page=' + request.page
      + '&size=' + request.size
      + '&direction=' + request.direction
      + (request.field != null ? '&field=' + request.field : '');
  }

  public getPaginationFromCurrentRoute(): PaginationRequest {
    const pagination = new PaginationRequest();
    // @ts-ignore
    pagination.direction = this.route.snapshot.queryParamMap.get('direction') != null ? this.route.snapshot.queryParamMap.get('direction') : 'ASC';
    // @ts-ignore
    pagination.size = +(this.route.snapshot.queryParamMap.get('size') != null ? this.route.snapshot.queryParamMap.get('size') : 10);
    // @ts-ignore
    pagination.page = +(this.route.snapshot.queryParamMap.get('page') != null ? this.route.snapshot.queryParamMap.get('page') : 0);
    pagination.field = this.route.snapshot.queryParamMap.get('field');
    return pagination;
  }

  public getAuthNumFromCurrentRoute(): number {
    if (this.route.snapshot.queryParamMap.get('auth') !== null) {
      return Number(this.route.snapshot.queryParamMap.get('auth'));
    } else {
      return this.accountService.getAuthNumForEmptyParam();
    }
  }

  public getAuthQueryFromRoute(): string {
    if (this.route.snapshot.queryParamMap.get('auth') !== null) {
      return 'auth=' + this.route.snapshot.queryParamMap.get('auth');
    } else {
      return '';
    }
  }

  public getAuthQueryByAccountNum(authNum: number): string {
    return 'auth=' + authNum;
  }

  public createUrlWithAuthParameter(authNum: number): string {
    let url = this.getUrlWithoutParams();
    this.route.queryParams.forEach((p) => {
      const params = this.getArrayOfQueryParamNames();
      if (params.indexOf('auth') == -1) {
        params.push('auth');
      }
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < params.length; i++) {
        if (params[i] === 'auth') {
          url = url + (i === 0 ? '?' : '&') + params[i] + '=' + authNum;
        } else {
          url = url + (i === 0 ? '?' : '&') + params[i] + '=' + p[params[i]];
        }
      }

    });
    return url;
  }

  public addAuthParamToUrl(authNum: number): string {
    const url = this.router.url;
    if (url.indexOf('?') !== -1) {
      return url + '&' + this.getAuthQueryByAccountNum(authNum);
    } else {
      return url + '?' + this.getAuthQueryByAccountNum(authNum);
    }
  }

  public getUrlWithoutParams(): string {
    return this.router.url.split('?')[0];
  }

  public getArrayOfQueryParamNames(): Array<string> {
    const keys = new Array<string>();
    this.route.queryParams.subscribe((params) => {
      const paramsObject = {...params.keys, ...params};
      const paramKeys = Object.keys(paramsObject);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < paramKeys.length; i++) {
        keys.push(paramKeys[i]);
      }
    });
    return keys;
  }

  public getCurrentRequestAuthorizationHeader(): any {
    console.log(this.getAuthNumFromCurrentRoute());
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accountService.getAccountMainDataByAuthNum(this.getAuthNumFromCurrentRoute()).token
    };
  }


}
