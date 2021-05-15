import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PropertyRequest} from '../../../../../entity/advertisement/goodsAdvertisement/property-request';
import {RestCountry} from '../../../../../entity/country/rest-country';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-goods-properties-element',
  templateUrl: './goods-properties-element.component.html',
  styleUrls: ['./goods-properties-element.component.scss']
})
export class GoodsPropertiesElementComponent implements OnInit {

  constructor() {
  }

  @Output() changeProperty: EventEmitter<PropertyRequest> = new EventEmitter();
  @Output() deleteProperty: EventEmitter<PropertyRequest> = new EventEmitter();
  @Input() property = new PropertyRequest();

  // @ts-ignore
  @Input() sendValidation: Observable<any>;
  isValid = false;

  ngOnInit(): void {
  }

  keyDownField(): void {
    this.changeProperty.emit(this.property);
  }

  getValidation(): boolean {
    return this.property.value.trim().length > 0 && this.property.name.trim().length > 0;
  }

  clickDeleteProperty(): void {
    this.deleteProperty.emit();
  }
}
