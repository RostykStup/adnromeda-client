import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {AccountLoginRequest} from '../../entity/account/account-login-request';
import {AuthenticationResponse} from '../../entity/account/authentication-response';
import {RestCountry} from '../../entity/country/rest-country';
import {DeliveryTypeResponse} from '../../entity/country/delivery-type-response';
import {CurrencyResponse} from '../../entity/country/currency-response';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private httpClient: HttpClient) {
  }

  currencyURL = GlobalConstants.API_URL + 'currency';

  getAll(): Observable<Array<CurrencyResponse>> {
    const url = this.currencyURL + '/all';
    return this.httpClient.get<Array<CurrencyResponse>>(url);
  }

}
