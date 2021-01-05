import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {AccountLoginRequest} from '../../entity/account/account-login-request';
import {AuthenticationResponse} from '../../entity/account/authentication-response';
import {RestCountry} from '../../entity/country/rest-country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private httpClient: HttpClient) {
  }

  restCountriesUrl = 'https://restcountries.eu/rest/v2/';

  getAllCountries(): Observable<Array<RestCountry>> {
    const url = this.restCountriesUrl + 'all?fields=name;nativeName;alpha2Code;flag';
    return this.httpClient.get<Array<RestCountry>>(url);
  }

  filterCountriesListByNamePeace(countries: Array<RestCountry>, peace: string): Array<RestCountry> {
    const newCountries = Array<RestCountry>();
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].nativeName.toLocaleLowerCase().includes(peace.toLocaleLowerCase())) {
        newCountries.push(countries[i]);
      } else if (countries[i].name.toLocaleLowerCase().includes(peace.toLocaleLowerCase())) {
        newCountries.push(countries[i]);
      }
    }
    return newCountries;
  }

  findRestCountryByCountryName(countries: Array<RestCountry>, name: string): RestCountry {
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].nativeName === name) {
        return countries[i];
      }
    }
    return countries[1];
  }

}
