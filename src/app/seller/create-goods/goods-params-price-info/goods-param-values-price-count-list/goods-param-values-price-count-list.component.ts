import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ParameterRequest} from '../../../../../entity/advertisement/goodsAdvertisement/parameter/parameter-request';
import {ParameterValueRequest} from '../../../../../entity/advertisement/goodsAdvertisement/parameter/parameter-value-request';
import {ParametersValuesPriceCountRequest} from '../../../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-price-count-request';
import {GoodsParametersCreationComponent} from '../goods-parameters-creation/goods-parameters-creation.component';
import {GoodsParamValuesPriceCountElementComponent} from '../goods-param-values-price-count-element/goods-param-values-price-count-element.component';

@Component({
  selector: 'app-goods-param-values-price-count-list',
  templateUrl: './goods-param-values-price-count-list.component.html',
  styleUrls: ['./goods-param-values-price-count-list.component.scss']
})
export class GoodsParamValuesPriceCountListComponent implements OnInit {

  constructor() {
  }

  // @ts-ignore
  @ViewChildren(GoodsParamValuesPriceCountElementComponent) paramsValuesPriceCountsComponents: QueryList<GoodsParamValuesPriceCountElementComponent>;

  // @ts-ignore
  @Input() parameters: Array<ParameterRequest>;
  @Input() hasParams = false;
  @Input() currencies = new Array<string>();
  paramValuesPriceCount = new Array<ParametersValuesPriceCountRequest>();

  ngOnInit(): void {
    this.reloadElements();
  }

  reloadElements(): void {
    setTimeout(() => {
      if (this.hasParams) {
        this.recombinateElements();
      } else {
        this.createNoParamsPriceValueCount();
      }
    }, 500);
  }

  getParametersValuesPriceCount(): Array<ParametersValuesPriceCountRequest> {
    return this.paramValuesPriceCount;
  }

  createNoParamsPriceValueCount(): void {
    this.paramValuesPriceCount = new Array<ParametersValuesPriceCountRequest>();
    this.paramValuesPriceCount.push(new ParametersValuesPriceCountRequest());
  }

  recombinateElements(): void {
    let size = 1;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.parameters.length; i++) {
      size = size * this.parameters[i].values.length; // get number of combinations
    }

    this.paramValuesPriceCount = new Array<ParametersValuesPriceCountRequest>();
    const parameterLength = new Array<number>();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.parameters.length; i++) {
      parameterLength[i] = this.getParameterLength(i, size, (i === 0 ? 0 : parameterLength[i - 1]));
    }

    for (let i = 0; i < size; i++) {
      const param = new ParametersValuesPriceCountRequest();
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.parameters.length; j++) {
        const paramValuesIndex = Math.floor(i / parameterLength[j]) % this.parameters[j].values.length;
        param.valueParam.set(this.parameters[j].title, this.parameters[j].values[paramValuesIndex].title);
      }
      this.paramValuesPriceCount.push(param);
    }
  }

  getParameterLength(index: number, size: number, previousLength: number): number {
    if (index === 0) {
      return size / this.parameters[index].values.length;
    } else {
      return previousLength / this.parameters[index].values.length;
    }
  }

  changeParamPriceCount($event: ParametersValuesPriceCountRequest, i: number): void {
    this.paramValuesPriceCount[i] = $event;
  }

  insertCurrencyValue(currency: string): void {
    this.paramsValuesPriceCountsComponents.forEach((c) => {
      c.insertCurrency(currency);
    });
  }

  validateAll(): boolean {
    let validate = true;
    this.paramsValuesPriceCountsComponents.forEach((c) => {
      if (!c.isValid()) {
        validate = false;
      }
    });
    return validate;
  }

  removeCurrencyValue(currency: string): void {
    this.paramsValuesPriceCountsComponents.forEach((c) => {
      c.removeCurrency(currency);
    });
  }
}
