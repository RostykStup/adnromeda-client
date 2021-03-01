import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterResponse} from '../../../../../../entity/advertisement/goodsAdvertisement/parameter/parameter-response';
import {ParametersValuesPriceCountResponse} from '../../../../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-price-count-response';
import {RestCountry} from '../../../../../../entity/country/rest-country';

@Component({
  selector: 'app-parameter-values-price-count-picker',
  templateUrl: './parameter-values-price-count-picker.component.html',
  styleUrls: ['./parameter-values-price-count-picker.component.scss']
})
export class ParameterValuesPriceCountPickerComponent implements OnInit {

  @Input() parameters = new Array<ParameterResponse>();
  @Input() paramValues = new Array<ParametersValuesPriceCountResponse>();

  @Output() event: EventEmitter<ParametersValuesPriceCountResponse> = new EventEmitter();

  chosenValues = new Map<string, string>();
  chosenParam = new ParametersValuesPriceCountResponse();

  constructor() {
  }

  ngOnInit(): void {
    this.parameters.forEach((p) => {
      p.chosenValue = p.values[0].title;
    });
    this.fillMap();
    this.findChosen();
  }

  fillMap(): void {
    this.parameters.forEach((p) => {
      this.chosenValues.set(p.title, p.chosenValue);
    });
  }

  changeChosenParameter(parameter: ParameterResponse, value: string): void {
    this.chosenValues.set(parameter.title, value);
    this.parameters[this.parameters.indexOf(parameter)].chosenValue = value;
  }

  isMapsEqual(map1: Map<string, string>, map2: Map<string, string>): boolean {
    let result = true;
    const map3 = this.convertJsonMapToMap(map2);
    map1.forEach((value, key) => {
      if (map3.get(key) !== value) {
        result = false;
      }
    });
    return result;
  }

  changeValue($event: any, parameter: ParameterResponse): void {
    const value = $event.target.value;
    this.changeChosenParameter(parameter, value);
    this.findChosen();
  }

  findChosen(): void {
    let parVal = new ParametersValuesPriceCountResponse();
    this.paramValues.forEach((p) => {
      if (this.isMapsEqual(this.chosenValues, p.values)) {
        parVal = p;
      }
    });
    this.chosenParam = parVal;
    this.event.emit(this.chosenParam);
  }

  convertJsonMapToMap(map1: any): Map<string, string> {
    const map = new Map<string, string>();
    // tslint:disable-next-line:forin
    for (const value in map1) {
      // @ts-ignore
      map.set(value, map1[value]);
    }
    return map;
  }
}
