import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {ParameterRequest} from '../../../../../entity/advertisement/goodsAdvertisement/parameter/parameter-request';
import {GoodsParametersElementComponent} from '../goods-parameters-element/goods-parameters-element.component';

@Component({
  selector: 'app-goods-parameters-creation',
  templateUrl: './goods-parameters-creation.component.html',
  styleUrls: ['./goods-parameters-creation.component.scss']
})
export class GoodsParametersCreationComponent implements OnInit {

  @Input() parameters = new Array<ParameterRequest>();
  // @ts-ignore
  @ViewChildren(GoodsParametersElementComponent) parametersComponents: QueryList<GoodsParametersElementComponent>;
  @Output() recreatePrices: EventEmitter<Array<ParameterRequest>> = new EventEmitter();

  constructor() {
  }

  canAddParameter = true;

  ngOnInit(): void {
  }

  addParameter(): void {
    this.parameters.push(new ParameterRequest());
    this.canAddParameter = false;
  }

  changeParameter($event: ParameterRequest, i: number): void {
    this.validateAllParameters();
    $event.title = $event.title.trim();
    this.parameters[i] = $event;
    this.emitRecreatePrice();
  }

  deleteParameter(i: number): void {
    this.parameters.splice(i, 1);
    if (this.parameters.length === 0) {
      this.canAddParameter = true;
    }
    setTimeout(() => {
      this.validateAllParameters();
      this.emitRecreatePrice();
    }, 500);
  }

  validateAllParameters(): void {
    let validate = true;
    this.parametersComponents.forEach((c) => {
      if (!c.isValid()) {
        validate = false;
      }
    });
    this.canAddParameter = validate;
  }


  emitRecreatePrice(): void {
    if (this.canAddParameter) {
      this.recreatePrices.emit(this.parameters);
    }
  }
}
