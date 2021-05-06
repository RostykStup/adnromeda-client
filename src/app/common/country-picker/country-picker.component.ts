import {Component, Input, OnInit, Output} from '@angular/core';
import {CountryService} from '../../../service/country/country.service';
import {RestCountry} from '../../../entity/country/rest-country';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-country-picker',
  templateUrl: './country-picker.component.html',
  styleUrls: ['./country-picker.component.scss']
})
export class CountryPickerComponent implements OnInit {

  @Input() userCountry = new RestCountry();
  @Input() pickerHeight = '';

  @Output() event: EventEmitter<RestCountry> = new EventEmitter();

  constructor(private countryService: CountryService) {
    this.loadCountries();
  }

  isOpenedCountryPickMenu = false;
  countries = new Array<RestCountry>();

  ngOnInit(): void {
  }

  loadCountries(): void {
    this.countryService.getAllCountries().subscribe((r) => {
      this.countries = this.countryService.allCountries;
    });
  }

  filterCountriesForPicker($event: any): void {
    const piece = $event.target.value;
    this.countries = this.countryService.filterCountriesListByNamePeace(piece);
  }

  changeCountryPickMenuStatement(): void {
    // window.location.reload();
    this.isOpenedCountryPickMenu = !this.isOpenedCountryPickMenu;
  }

  outputCountry(country: RestCountry): void {
    this.countries = this.countryService.filterCountriesListByNamePeace('');
    this.isOpenedCountryPickMenu = false;
    this.event.emit(country);
  }

  closeCountryMenu(): void {
    this.isOpenedCountryPickMenu = false;
  }
}
