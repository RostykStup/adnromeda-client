import {Component, OnInit} from '@angular/core';
import {IpService} from '../../service/country/ip.service';
import {CountryService} from '../../service/country/country.service';
import {RestCountry} from '../../entity/country/rest-country';
import {CurrencyService} from '../../service/country/currency.service';
import {CurrencyResponse} from '../../entity/country/currency-response';
import {UserService} from '../../service/account/user/user.service';
import {UserSettingsRequest} from '../../entity/account/user/user-settings-request';
import {AccountService} from '../../service/account/account.service';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from '../dialogs/login-dialog/login-dialog.component';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['../../styles/button.scss', './side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements OnInit {

  constructor(private ipService: IpService,
              private countryService: CountryService,
              private currencyService: CurrencyService,
              private userService: UserService,
              private accountService: AccountService,
              public dialog: MatDialog) {
  }


  userRole: string | null = '';

  isOpened = false;
  isOpenedCountryPickMenu = false;
  isOpenedCurrencyPickMenu = false;
  isOpenedSettingsMenu = false;

  userCountry = new RestCountry();
  userCurrency = new CurrencyResponse();

  currencies = new Array<CurrencyResponse>();

  countries = Array<RestCountry>();

  ngOnInit(): void {
    this.userRole = localStorage.getItem('andro_user_role');

    setTimeout(() => {
      this.loadUserCountry();
    }, 500);

    this.currencyService.getAll().subscribe((r) => {
      let currencyCode = localStorage.getItem('andro_user_currency');
      if (currencyCode === null || currencyCode === '') {
        currencyCode = 'USD';
      }
      this.currencies = r;
      this.userCurrency = this.findCurrencyByCode(currencyCode);
    });
    // setTimeout({}, 100);
  }

  open(): void {
    this.userRole = localStorage.getItem('andro_user_role');
    this.isOpened = !this.isOpened;
    this.isOpenedCountryPickMenu = false;
    this.isOpenedCurrencyPickMenu = false;
    this.isOpenedSettingsMenu = false;
  }

  close(navigateElem: string | null): void {
    this.isOpened = false;
    this.isOpenedCountryPickMenu = false;
    this.isOpenedCurrencyPickMenu = false;
    this.isOpenedSettingsMenu = false;

    if (navigateElem != null) {
      if (this.accountService.isLogged()) {
        window.open(navigateElem, '_self');
      } else {
        this.openLoginDialog();
      }
    }
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => { //дії пілся закриття вікна
      // this.reloadTable();
      this.userRole = localStorage.getItem('andro_user_role');
    });
  }

  changeCountryPickMenuStatement(): void {
    // window.location.reload();
    this.isOpenedCountryPickMenu = !this.isOpenedCountryPickMenu;
  }

  filterCountriesForPicker($event: any): void {
    const piece = $event.target.value;
    this.countries = this.countryService.filterCountriesListByNamePeace(piece);
  }

  findCurrencyByCode(code: string): CurrencyResponse {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.currencies.length; i++) {
      if (this.currencies[i].code === code) {
        return this.currencies[i];
      }
    }
    return new CurrencyResponse();
  }

  changeCountry(country: RestCountry): void {
    this.userCountry = country;
    this.isOpenedCountryPickMenu = false;
  }

  changeCurrency(currency: CurrencyResponse): void {
    this.isOpenedCurrencyPickMenu = false;
    this.userCurrency = currency;
  }

  changeUserSetting(): void {
    const request = new UserSettingsRequest();
    request.country = this.userCountry.alpha2Code;
    request.currency = this.userCurrency.code;
    localStorage.setItem('andro_user_country', this.userCountry.name);
    localStorage.setItem('andro_user_country_code', this.userCountry.alpha2Code);
    localStorage.setItem('andro_user_currency', this.userCurrency.code);
    if (localStorage.getItem('andro_user_role') === 'ROLE_USER') {
      this.userService.changeUserSettings(request).subscribe(() => {
        window.location.reload();
      });
    } else {
      window.location.reload();
    }
  }

  loadUserCountry(): void {
    let countryName;
    if (localStorage.getItem('andro_user_country') !== null && localStorage.getItem('andro_user_country') !== '') {
      countryName = localStorage.getItem('andro_user_country');
      while (this.userCountry.name === '') {
        this.countryService.getRestCountryByCountryName(countryName).subscribe((resp) => {
          this.userCountry = resp;
          this.countries = this.countryService.allCountries;
        });
      }
    } else {
      this.ipService.getCountryCodeByIp().subscribe((r) => {
        this.countryService.getRestCountryByCountryName(r.country_name).subscribe((resp) => {
          this.userCountry = resp;
          this.countries = this.countryService.allCountries;
        });
      });
    }
  }

  changeCurrencyPickMenuStatement(): void {
    this.isOpenedCurrencyPickMenu = !this.isOpenedCurrencyPickMenu;
  }

  closeCurrencyMenu(): void {
    this.isOpenedCurrencyPickMenu = false;
  }

  closeCountryMenu(): void {
    this.isOpenedCountryPickMenu = false;
  }

  filterCurrenciesForPicker($event: any): void {

  }

  openSettingMenu(): void {
    this.isOpenedSettingsMenu = !this.isOpenedSettingsMenu;
  }
}
