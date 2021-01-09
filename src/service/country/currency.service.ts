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

  courseEUR = 0;
  courseUSD = 0;
  courseRUB = 0;

  currencyURL = GlobalConstants.API_URL + 'currency';
  privatBankAPIUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

  loadExchange(): void {
    this.getPBCourse().subscribe((r) => {
      this.courseUSD = Number(r[0].sale);
      this.courseEUR = Number(r[1].sale);
      this.courseRUB = Number(r[2].sale);
    });
  }

  getAll(): Observable<Array<CurrencyResponse>> {
    const url = this.currencyURL + '/all';
    return this.httpClient.get<Array<CurrencyResponse>>(url);
  }

  getPBCourse(): Observable<any> {
    return this.httpClient.get(this.privatBankAPIUrl);
  }

  exchangeToHryvnia(currency: string, value: number): number {
    switch (currency) {
      case 'USD' :
        return this.courseUSD * value;
      case 'EUR' :
        return this.courseEUR * value;
      case 'RUB' :
        return this.courseRUB * value;
      default :
        return value;
    }
  }

  exchangeHryvniaTo(currency: string, value: number): number {
    switch (currency) {
      case 'USD' :
        return value / this.courseUSD;
      case 'EUR' :
        return value / this.courseEUR;
      case 'RUB' :
        return value / this.courseRUB;
      default :
        return value;
    }
  }

  exchangeCurrencies(currencyFrom: string, currencyTo: string, value: number): number {
    if (currencyFrom === currencyTo) {
      return value;
    }
    switch (currencyFrom) {
      case 'USD' :
        return this.exchangeHryvniaTo(currencyTo, this.exchangeToHryvnia('USD', value));
      case 'EUR' :
        return this.exchangeHryvniaTo(currencyTo, this.exchangeToHryvnia('EUR', value));
      case 'RUB' :
        return this.exchangeHryvniaTo(currencyTo, this.exchangeToHryvnia('RUB', value));
      default :
        return this.exchangeHryvniaTo(currencyTo, this.exchangeToHryvnia('UAH', value));
    }
  }


}
