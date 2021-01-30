import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddressService} from '../../../../service/address/address.service';
import {UserDeliveryAddressRequest} from '../../../../entity/address/user-delivery-address-request';
import {RestCountry} from '../../../../entity/country/rest-country';
import {CountryService} from '../../../../service/country/country.service';
import {IpService} from '../../../../service/country/ip.service';
import {Validator} from '../../../../common/validator';

@Component({
  selector: 'app-create-address-dialog',
  templateUrl: './create-address-dialog.component.html',
  styleUrls: ['../../../../styles/button.scss', '../../../../styles/input.scss', './create-address-dialog.component.scss']
})
export class CreateAddressDialogComponent {

  userCountry = new RestCountry();

  validateRecipient = true;
  validateNumber = true;
  validateRegion = true;
  validateCity = true;
  validateStreet = true;
  validateHouse = true;
  isUpdate = false;
  addressId = 0;

  address = new UserDeliveryAddressRequest();


  constructor(
    public dialogRef: MatDialogRef<CreateAddressDialogComponent>,
    private addressService: AddressService,
    private countryService: CountryService,
    private ipService: IpService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data !== null && data.address !== undefined) {
      this.countryService.getRestCountryByCountryName(data.address.country.englishName).subscribe((resp) => {
        this.userCountry = resp;
        this.address.countryCode = resp.alpha2Code;
        this.address.countryCode = data.address.country.countryCode;
        this.address.street = data.address.street;
        this.address.house = data.address.house;
        this.address.region = data.address.region;
        this.address.city = data.address.city;
        this.address.recipient = data.address.recipient;
        this.address.phoneNumber = data.address.phoneNumber;
        this.addressId = data.address.id;
        this.isUpdate = true;
      });
    } else {
      this.loadUserCountry();
    }

  }

  loadUserCountry(): void {
    let countryName;
    if (localStorage.getItem('andro_user_country') !== null && localStorage.getItem('andro_user_country') !== '') {
      countryName = localStorage.getItem('andro_user_country');
      while (this.userCountry.name === '') {
        this.countryService.getRestCountryByCountryName(countryName).subscribe((resp) => {
          this.userCountry = resp;
          this.address.countryCode = resp.alpha2Code;
        });
      }
    } else {
      this.ipService.getCountryCodeByIp().subscribe((r) => {
        this.countryService.getRestCountryByCountryName(r.country_name).subscribe((resp) => {
          this.userCountry = resp;
          this.address.countryCode = resp.alpha2Code;
        });
      });
    }
  }

  changeCountry($event: RestCountry): void {
    this.userCountry = $event;
    this.address.countryCode = this.userCountry.alpha2Code;
  }

  creationButtonClick(): void {
    if (this.validateAll()) {
      if (this.isUpdate) {
        this.addressService.updateAddress(this.address, this.addressId).subscribe((response) => {
          this.dialogRef.close(response);
        });
      } else {
        this.addressService.saveAddress(this.address).subscribe((response) => {
          this.dialogRef.close(response);
        });
      }

    }
  }

  clickCancelButton(): void {
    this.dialogRef.close(undefined);
  }

  validateAll(): boolean {
    this.address.recipient = this.address.recipient.trim();
    this.address.city = this.address.city.trim();
    this.address.region = this.address.region.trim();
    this.address.street = this.address.street.trim();
    this.address.house = this.address.house.trim();
    this.address.phoneNumber = this.address.phoneNumber.trim();

    this.validateNumber = Validator.validateSizeMin(this.address.phoneNumber, 5);
    this.validateRecipient = Validator.validateSizeMin(this.address.recipient, 3);
    this.validateCity = Validator.validateSizeMin(this.address.city, 3);
    this.validateRegion = Validator.validateSizeMin(this.address.region, 3);
    this.validateHouse = Validator.validateSizeMin(this.address.house, 1);
    this.validateStreet = Validator.validateSizeMin(this.address.street, 1);

    return this.validateNumber &&
      this.validateRecipient &&
      this.validateCity &&
      this.validateRegion &&
      this.validateHouse &&
      this.validateStreet;
  }

}
