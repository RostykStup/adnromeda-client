import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {GoodsAdvertisementRequest} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-request';
import {ParameterRequest} from '../../../../entity/advertisement/goodsAdvertisement/parameter/parameter-request';
import {GoodsPropertiesCreationComponent} from '../goods-main-info/goods-properties-creаtion/goods-properties-creation.component';
import {GoodsParametersCreationComponent} from './goods-parameters-creation/goods-parameters-creation.component';
import {GoodsParamValuesPriceCountListComponent} from './goods-param-values-price-count-list/goods-param-values-price-count-list.component';
import {ParametersValuesPriceCountRequest} from '../../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-price-count-request';
import {ParametersValuesCurrencyPriceRequest} from '../../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-currency-price-request';

@Component({
  selector: 'app-goods-params-price-info',
  templateUrl: './goods-params-price-info.component.html',
  styleUrls: ['./goods-params-price-info.component.scss']
})
export class GoodsParamsPriceInfoComponent implements OnInit {

  @Input() advertisement = new GoodsAdvertisementRequest();
  // @ts-ignore
  @ViewChildren(GoodsParametersCreationComponent) parametersComponent: QueryList<GoodsParametersCreationComponent>;
  @Output() goNextStep: EventEmitter<GoodsAdvertisementRequest> = new EventEmitter();
  // @ts-ignore
  @ViewChildren(GoodsParamValuesPriceCountListComponent) goodsParameterValuesPriceCountComponent: QueryList<GoodsParamValuesPriceCountListComponent>;

  constructor() {
  }

  validateString = '';
  currencies = ['USD'];

  ngOnInit(): void {
  }

  parametersChanged($event: Array<ParameterRequest>): void {
    this.advertisement.parameters = $event;
    this.advertisement.hasParameters = $event.length !== 0;
  }

  clickNextStep(): void {
    this.changeValidateString();
    this.getParametersValuesPriceCount();
    if (this.validateAll()) {
      this.rewriteParamValuesCountToJson();
      // console.log(this.advertisement);
      this.goNextStep.emit(this.advertisement);
    }
  }

  changeValidateString(): void {
    if (!this.validateParameters()) {
      this.validateString = 'Параметри містять пусті поля або незавершені поля';
    } else if (!this.validateParametersValuesPriceCount()) {
      this.validateString = 'Поля з ціною та кількістю заповнені неправильно';
    } else {
      this.validateString = '';
    }
  }

  validateAll(): boolean {
    return this.validateParametersValuesPriceCount() && this.validateParameters();
  }

  validateParameters(): boolean {
    return this.parametersComponent.first.canAddParameter;
  }

  validateParametersValuesPriceCount(): boolean {
    return this.goodsParameterValuesPriceCountComponent.first.validateAll();
  }

  getParametersValuesPriceCount(): Array<ParametersValuesPriceCountRequest> {
    return this.goodsParameterValuesPriceCountComponent.first.getParametersValuesPriceCount();
  }

  rewriteParamValuesCountToJson(): void {
    this.advertisement.valuesPriceCounts = new Array<{
      valueParam: any,
      prices: Array<ParametersValuesCurrencyPriceRequest>,
      count: any
    }>();
    const params = this.getParametersValuesPriceCount();
    params.forEach((p) => {
      const jsonObject = {
        prices: p.prices,
        count: p.count,
        valueParam: {}
      };
      p.valueParam.forEach((value, key) => {
        // @ts-ignore
        jsonObject.valueParam[key] = value;
      });
      this.advertisement.valuesPriceCounts.push(jsonObject);
    });
  }

  addCurrency(currency: string): void {
    this.currencies.push(currency);
    // this.goodsParameterValuesPriceCountComponent.first.insertCurrencyValue($event);
  }

  removeCurrency(currency: string): void {
    this.currencies.splice(this.currencies.indexOf(currency), 1);
    this.goodsParameterValuesPriceCountComponent.first.removeCurrencyValue(currency);
  }
}
