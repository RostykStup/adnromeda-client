import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {GoodsAdvertisementRequest} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-request';
import {GoodsPropertiesCreationComponent} from './goods-properties-creаtion/goods-properties-creation.component';
import {PropertyRequest} from '../../../../entity/advertisement/goodsAdvertisement/property-request';

@Component({
  selector: 'app-goods-main-info',
  templateUrl: './goods-main-info.component.html',
  styleUrls: ['./goods-main-info.component.scss']
})
export class GoodsMainInfoComponent implements OnInit {

  @Input() advertisement = new GoodsAdvertisementRequest();
  @Output() goNextStep: EventEmitter<GoodsAdvertisementRequest> = new EventEmitter();

  // @ts-ignore
  @ViewChildren(GoodsPropertiesCreationComponent) propertiesComponent: QueryList<GoodsPropertiesCreationComponent>;

  validateString = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  clickNextStep(): void {
    this.trimAll();
    this.changeValidateString();
    if (this.validateAll()) {
      this.getPropertiesFromChild();
      this.goNextStep.emit(this.advertisement);
    }
  }


  getPropertiesFromChild(): void {
    this.advertisement.properties = this.propertiesComponent.first.getProperties();
  }

  trimAll(): void {
    this.advertisement.title = this.advertisement.title.trim();
    this.advertisement.description = this.advertisement.description.trim();
  }

  validateAll(): boolean {
    return this.advertisement.title.length !== 0 && this.propertiesComponent.first.canAddProperty;
  }

  changeValidateString(): void {
    if (this.advertisement.title.length === 0) {
      this.validateString = 'Назва товару не може бути пустою';
    } else if (!this.propertiesComponent.first.canAddProperty) {
      this.validateString = 'Характеристики товару містять пусті поля';
    } else {
      this.validateString = '';
    }
  }
}
