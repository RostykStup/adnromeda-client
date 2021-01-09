import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {AccountLoginRequest} from '../../entity/account/account-login-request';
import {AuthenticationResponse} from '../../entity/account/authentication-response';
import {RestCountry} from '../../entity/country/rest-country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  allCountries = new Array<RestCountry>();

  constructor(private httpClient: HttpClient) {
    this.getAllCountries().subscribe(r => {
      this.allCountries = r;
    });
  }

  restCountriesUrl = 'https://restcountries.eu/rest/v2/';

  getAllCountries(): Observable<Array<RestCountry>> {
    const url = this.restCountriesUrl + 'all?fields=name;nativeName;alpha2Code;flag';
    return this.httpClient.get<Array<RestCountry>>(url);
  }

  filterCountriesListByNamePeace(peace: string): Array<RestCountry> {
    const newCountries = Array<RestCountry>();
    for (let i = 0; i < this.allCountries.length; i++) {
      if (this.allCountries[i].nativeName.toLocaleLowerCase().includes(peace.toLocaleLowerCase())) {
        newCountries.push(this.allCountries[i]);
      } else if (this.allCountries[i].name.toLocaleLowerCase().includes(peace.toLocaleLowerCase())) {
        newCountries.push(this.allCountries[i]);
      }
    }
    return newCountries;
  }

  getRestCountryByCountryName(name: string | null): Observable<RestCountry> {
    let restCountry = new BehaviorSubject<RestCountry>(new RestCountry());
    this.allCountries.forEach((c) => {
      if (c.name === name) {
        restCountry = new BehaviorSubject<RestCountry>(c);
      }
    });
    return restCountry.asObservable();
  }

  getRestCountryByCountryCode(code: string | null): Observable<RestCountry> {
    let restCountry = new BehaviorSubject<RestCountry>(new RestCountry());
    this.allCountries.forEach((c) => {
      if (c.alpha2Code === code) {
        restCountry = new BehaviorSubject<RestCountry>(c);
      }
    });
    return restCountry.asObservable();
  }

}
