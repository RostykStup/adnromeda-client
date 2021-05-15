import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {PropertyRequest} from '../../../../../entity/advertisement/goodsAdvertisement/property-request';
import {GoodsPropertiesElementComponent} from '../goods-properties-element/goods-properties-element.component';

@Component({
  selector: 'app-goods-properties-cretion',
  templateUrl: './goods-properties-creation.component.html',
  styleUrls: ['./goods-properties-creation.component.scss']
})
export class GoodsPropertiesCreationComponent implements OnInit {

  constructor() {

  }

  // @ts-ignore
  @ViewChildren(GoodsPropertiesElementComponent) propertiesComponents: QueryList<GoodsPropertiesElementComponent>;

  @Input() properties = new Array<PropertyRequest>();
  canAddProperty = true;

  ngOnInit(): void {
      this.properties = new Array<PropertyRequest>();
  }

  addProperty(): void {
    // @ts-ignore
    this.properties.push(new PropertyRequest());
    this.canAddProperty = false;
  }

  propertyValidation(event: PropertyRequest, i: number): void {
    this.validateAllProperties();
    // @ts-ignore
    this.properties[i] = event;
  }

  getProperties(): Array<PropertyRequest> | null {
    // @ts-ignore
    if (this.properties.length === 0) {
      return null;
    }
    // @ts-ignore
    this.properties.forEach((p) => {
      p.name = p.name.trim();
      p.value = p.value.trim();
    });
    return this.properties;
  }

  validateAllProperties(): void {
    let valid = true;
    this.propertiesComponents.forEach((p) => {
      if (!p.getValidation()) {
        valid = p.getValidation();
      }
    });
    this.canAddProperty = valid;
  }

  deleteProperty(i: number): void {
    // @ts-ignore
    this.properties.splice(i, 1);
    this.validateAllProperties();
    // @ts-ignore
    if (this.properties.length === 0) {
      this.canAddProperty = true;
    }
  }
}
