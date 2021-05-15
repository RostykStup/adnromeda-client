import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {UserDeliveryAddressRequest} from '../../entity/address/user-delivery-address-request';
import {Observable} from 'rxjs';
import {UserDeliveryAddressResponse} from '../../entity/address/user-delivery-address-response';
import {NavigationService} from '../../common/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private httpClient: HttpClient, private navigationService: NavigationService) {
  }

  addressURL = GlobalConstants.API_URL + 'user-delivery-address';

  saveAddress(request: UserDeliveryAddressRequest): Observable<UserDeliveryAddressResponse> {
    return this.httpClient.post<UserDeliveryAddressResponse>(this.addressURL, request, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  updateAddress(request: UserDeliveryAddressRequest, id: number): Observable<UserDeliveryAddressResponse> {
    const url = this.addressURL + '?id=' + id;
    return this.httpClient.put<UserDeliveryAddressResponse>(url, request, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  deleteAddress(id: number): Observable<any> {
    const url = this.addressURL + '?id=' + id;
    return this.httpClient.delete(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getDefaultUserAddress(): Observable<UserDeliveryAddressResponse> {
    const url = this.addressURL + '/default';
    return this.httpClient.get<UserDeliveryAddressResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getAllUserAddresses(): Observable<Array<UserDeliveryAddressResponse>> {
    const url = this.addressURL + '/user';
    return this.httpClient.get<Array<UserDeliveryAddressResponse>>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  makeAddressDefault(id: number): Observable<any> {
    const url = this.addressURL + '/make-default?id=' + id;
    return this.httpClient.put(url, null, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }
}
