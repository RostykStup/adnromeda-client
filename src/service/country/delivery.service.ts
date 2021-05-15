import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {AccountLoginRequest} from '../../entity/account/account-login-request';
import {AuthenticationResponse} from '../../entity/account/authentication-response';
import {RestCountry} from '../../entity/country/rest-country';
import {DeliveryTypeResponse} from '../../entity/country/delivery-type-response';
import {NavigationService} from '../../common/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  constructor(private httpClient: HttpClient, private navigationService: NavigationService) {
  }

  deliveryUrl = GlobalConstants.API_URL + 'delivery';

  getDeliveriesByCountryCode(code: string): Observable<Array<DeliveryTypeResponse>> {
    const url = this.deliveryUrl + '/' + code;
    return this.httpClient.get<Array<DeliveryTypeResponse>>(url);
  }

  getDeliveriesByAccountCountry(): Observable<Array<DeliveryTypeResponse>> {
    const url = this.deliveryUrl + '/account';
    return this.httpClient.get<Array<DeliveryTypeResponse>>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getDeliveriesByAdvertisementId(id: number): Observable<Array<DeliveryTypeResponse>> {
    const url = this.deliveryUrl + '/advertisement?id=' + id;
    return this.httpClient.get<Array<DeliveryTypeResponse>>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getDeliveriesBySellerId(id: number): Observable<Array<DeliveryTypeResponse>> {
    const url = this.deliveryUrl + '/seller?id=' + id;
    return this.httpClient.get<Array<DeliveryTypeResponse>>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }


  getDefaultDeliveryType(): DeliveryTypeResponse {
    const delivery = new DeliveryTypeResponse();
    delivery.title = 'default';
    delivery.id = 1;
    return delivery;
  }

}
