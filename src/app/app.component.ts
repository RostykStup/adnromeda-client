import {Component} from '@angular/core';
import {AccountDataRequest} from '../entity/account/account-data-request';
import {AccountLoginRequest} from '../entity/account/account-login-request';
import {CountryService} from '../service/country/country.service';
import {CurrencyService} from '../service/country/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles/input.scss']
})
export class AppComponent {


  // @ts-ignore
  test: string;
}
