import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {AccountLoginRequest} from '../../entity/account/account-login-request';
import {AuthenticationResponse} from '../../entity/account/authentication-response';
import {RestCountry} from '../../entity/country/rest-country';
import {DeliveryTypeResponse} from '../../entity/country/delivery-type-response';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  constructor(private httpClient: HttpClient) {
  }

  deliveryUrl = GlobalConstants.API_URL + 'delivery';

  getDeliveriesByCountryCode(code: string): Observable<Array<DeliveryTypeResponse>> {
    const url = this.deliveryUrl + '/' + code;
    return this.httpClient.get<Array<DeliveryTypeResponse>>(url);
  }

  getDeliveriesByAccountCountry(): Observable<Array<DeliveryTypeResponse>> {
    const url = this.deliveryUrl + '/account';
    return this.httpClient.get<Array<DeliveryTypeResponse>>(url, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  getDeliveriesByAdvertisementId(id: number): Observable<Array<DeliveryTypeResponse>> {
    const url = this.deliveryUrl + '/advertisement?id=' + id;
    return this.httpClient.get<Array<DeliveryTypeResponse>>(url, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

}
