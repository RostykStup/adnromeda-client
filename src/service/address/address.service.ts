import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {UserDeliveryAddressRequest} from '../../entity/address/user-delivery-address-request';
import {Observable} from 'rxjs';
import {UserDeliveryAddressResponse} from '../../entity/address/user-delivery-address-response';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private httpClient: HttpClient) {
  }

  addressURL = GlobalConstants.API_URL + 'user-delivery-address';

  saveAddress(request: UserDeliveryAddressRequest): Observable<any> {
    return this.httpClient.post(this.addressURL, request, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  getDefaultUserAddress(): Observable<UserDeliveryAddressResponse> {
    const url = this.addressURL + '/default';
    return this.httpClient.get<UserDeliveryAddressResponse>(url, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  getAllUserAddresses(): Observable<Array<UserDeliveryAddressResponse>> {
    const url = this.addressURL + '/user';
    return this.httpClient.get<Array<UserDeliveryAddressResponse>>(url, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  makeAddressDefault(id: number): Observable<any> {
    const url = this.addressURL + '/make-default?id=' + id;
    return this.httpClient.put(url, null, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }
}
