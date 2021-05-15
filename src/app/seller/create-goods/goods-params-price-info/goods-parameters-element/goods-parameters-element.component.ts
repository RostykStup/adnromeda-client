import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterRequest} from '../../../../../entity/advertisement/goodsAdvertisement/parameter/parameter-request';
import {ParameterValueRequest} from '../../../../../entity/advertisement/goodsAdvertisement/parameter/parameter-value-request';
import {PropertyRequest} from '../../../../../entity/advertisement/goodsAdvertisement/property-request';

@Component({
  selector: 'app-goods-parameters-element',
  templateUrl: './goods-parameters-element.component.html',
  styleUrls: ['./goods-parameters-element.component.scss']
})
export class GoodsParametersElementComponent implements OnInit {

  @Input() parameter = new ParameterRequest();
  @Output() changeParameter: EventEmitter<ParameterRequest> = new EventEmitter();
  @Output() deleteParameter: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  paramValueInputChange($event: any): void {
    if ($event.target.value.length > 0) {
      const valueName =  $event.target.value.trim();
      if (!this.isExistValueByName(valueName)) {
        const value = new ParameterValueRequest();
        value.title = valueName;
        this.parameter.values.push(value);
        $event.target.value = '';
        this.emitParameterChange();
      }
    }
  }

  isExistValueByName(name: string): boolean {
    let isExist = false;
    this.parameter.values.forEach((v) => {
      if (v.title === name) {
        isExist = true;
      }
    });
    return isExist;
  }

  clickDeleteValue(i: number): void {
    this.parameter.values.splice(i, 1);
    this.emitParameterChange();
  }

  isValid(): boolean {
    return this.parameter.values.length >= 2 && this.parameter.title.length > 0;
  }

  emitParameterChange(): void {
    this.changeParameter.emit(this.parameter);
  }

  clickDeleteParameter(): void  {
    this.deleteParameter.emit();
  }
}
