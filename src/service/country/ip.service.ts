import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CountryService} from './country.service';


@Injectable({
  providedIn: 'root'
})
export class IpService {
  constructor(private httpClient: HttpClient) {
  }

  getIPAddress(): Observable<any> {
    return this.httpClient.get('http://api.ipify.org/?format=json');
  }

  // @ts-ignore
  getCountryCodeByIp(): Observable<any> {
    let ip = '';
    this.getIPAddress().subscribe((r) => {
      ip = r.ip;
    });
    const url = 'https://ipapi.co/' + ip + '/json/';
    return this.httpClient.get(url);
  }

}
