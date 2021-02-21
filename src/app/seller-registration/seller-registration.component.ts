import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../service/account/account.service';
import {SellerService} from '../../service/account/seller/seller.service';
import {GoodsSellerService} from '../../service/account/seller/goods_seller/goods-seller.service';
import {AccountLoginRequest} from '../../entity/account/account-login-request';
import {Validator} from '../../common/validator';
import {SellerDataRequest} from '../../entity/account/seller/seller-data-request';
import {GoodsSellerDataRequest} from '../../entity/account/seller/goods_seller/goods-seller-data-request';
import {AccountDataRequest} from '../../entity/account/account-data-request';
import {CountryService} from '../../service/country/country.service';
import {RestCountry} from '../../entity/country/rest-country';
import {DeliveryService} from '../../service/country/delivery.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-seller-registration',
  templateUrl: './seller-registration.component.html',
  styleUrls: ['../../styles/input.scss', '../../styles/button.scss', './seller-registration.component.scss']
})
export class SellerRegistrationComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private sellerService: SellerService,
    private goodsSellerService: GoodsSellerService,
    private countryService: CountryService,
    private deliveryService: DeliveryService,
    private router: Router
  ) {
    this.loadCountries();
  }

  countries = Array<RestCountry>();
  showCountries = Array<RestCountry>();

  sellerCountries = Array<RestCountry>();

  mode = 2;

  countryName = '';
  countryImage = '';

  accountLoginRequest = new AccountLoginRequest();
  sellerDataRequest = new SellerDataRequest();
  goodsSellerDataRequest = new GoodsSellerDataRequest();
  accountDataRequest = new AccountDataRequest();

  confirmationPassword = '';

  validationEmail = true;
  validationPassword = true;
  validationConfirmPassword = true;
  existAccount = false;
  validateCountryCode = true;

  validationShopname = true;
  validationTexpayerNumber = true;


  ngOnInit(): void {
  }


  accountCreateButtonClick(): void {
    if (this.validateAll()) {
      this.accountService.registerGoodsSeller(this.accountLoginRequest).subscribe((r) => {
        this.accountService.writeAuthenticationToLocalStorage(r);
        this.mode = 2;
      }, (error) => {
        if (error.status === 403) {
          this.existAccount = true;
        }
      });
    }
  }

  isPasswordEquals(): void {
    this.validationConfirmPassword = Validator.validateEquals(this.accountLoginRequest.password, this.confirmationPassword);
  }

  validateAll(): boolean {
    this.validationEmail = Validator.validateEmail(this.accountLoginRequest.login);
    this.validationPassword = Validator.validateSizeMinMax(this.accountLoginRequest.password, 6, 20);
    this.validationConfirmPassword = Validator.validateEquals(this.accountLoginRequest.password, this.confirmationPassword);
    return this.validationEmail && this.validationPassword && this.validationConfirmPassword;
  }

  loadCountries(): void {
    const resCountries = Array<RestCountry>();
    this.countryService.getAllCountries().subscribe((response) => {
      response.forEach((c) => {
        const country = new RestCountry();
        country.name = c.name;
        country.alpha2Code = c.alpha2Code;
        country.flag = c.flag;
        country.nativeName = c.nativeName;
        resCountries.push(country);
      });
      this.countries = resCountries;
    });
  }

  filterCountry(): void {
    if (this.countryName.trim() === '') {
      this.showCountries = this.countries;
    } else {
      this.showCountries = this.countryService.filterCountriesListByNamePeace(this.countryName);
    }
  }


  loadToRequestCountry(country: RestCountry): void {
    this.validateCountryCode = true;
    this.countryName = country.nativeName;
    this.accountDataRequest.countryCode = country.alpha2Code;
    this.countryImage = country.flag;
  }

  loadToSellerContainer(country: RestCountry): void {
    this.countryName = country.nativeName;
  }

  sellerDataButtonClick(): void {
    if (this.validateSellerData()) {
      this.accountService.updateAccountCountry(this.accountDataRequest).subscribe(() => {
        this.sellerService.updateSellerData(this.sellerDataRequest).subscribe(() => {
          // this.mode = 3;
          window.open('client/seller/profile', '_self');
        });
      });
    }
  }

  validateSellerData(): boolean {
    this.sellerDataRequest.shopName = this.sellerDataRequest.shopName.trim();
    this.sellerDataRequest.taxpayerNumber = this.sellerDataRequest.taxpayerNumber.trim();
    this.validationTexpayerNumber = Validator.validateSizeMinMax(this.sellerDataRequest.taxpayerNumber, 10, 10);
    this.validationShopname = Validator.validateSizeMin(this.sellerDataRequest.shopName, 1);
    if (this.accountDataRequest.countryCode === '') {
      this.validateCountryCode = false;
    }
    return this.validationTexpayerNumber && this.validationShopname && this.validateCountryCode;
  }

  addCountryToList(countryName: string): void {
    this.countryService.getRestCountryByCountryName(countryName).subscribe(country => {
      const index = this.sellerCountries.indexOf(country, 0);
      if (index === -1) {
        this.sellerCountries.push(country);
      }
      this.countryName = '';
    });
  }

  remove(country: RestCountry): void {
    const index = this.sellerCountries.indexOf(country, 0);
    if (index > -1) {
      this.sellerCountries.splice(index, 1);
    }
  }

  checkBoxClick(): void {
    const element = <HTMLInputElement> document.getElementById('only-seller-country-check');
    this.goodsSellerDataRequest.onlySellerCountryDelivery = element.checked;
  }


  goodsSellerButtonClick(): void {
    if (!this.goodsSellerDataRequest.onlySellerCountryDelivery) {
      this.sellerCountries.forEach((c) => {
        this.goodsSellerDataRequest.countryCodes.push(c.alpha2Code);
      });
    }
    this.goodsSellerService.updateGoodsSellerData(this.goodsSellerDataRequest).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
