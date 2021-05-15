import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {GoodsAdvertisementRequest} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-request';
import {DeliveryService} from '../../../../service/country/delivery.service';
import {DeliveryTypeResponse} from '../../../../entity/country/delivery-type-response';
import {GoodsParametersCreationComponent} from '../goods-params-price-info/goods-parameters-creation/goods-parameters-creation.component';
import {DeliveryForCreationCheckComponent} from './delivery-for-creation-check/delivery-for-creation-check.component';
import {$e} from 'codelyzer/angular/styles/chars';
import {AndromedaCheckboxComponent} from '../../../common/components/andromeda-checkbox/andromeda-checkbox.component';

@Component({
  selector: 'app-goods-delivery-info',
  templateUrl: './goods-delivery-info.component.html',
  styleUrls: ['./goods-delivery-info.component.scss']
})
export class GoodsDeliveryInfoComponent implements OnInit {

  constructor(private deliveryService: DeliveryService) {
  }

  // @ts-ignore
  @ViewChildren(DeliveryForCreationCheckComponent) deliveriesComponent: QueryList<DeliveryForCreationCheckComponent>;

  // @ts-ignore
  @ViewChild('selectAllCheck') selectAllCheck: AndromedaCheckboxComponent;
  @Output() goNextStep: EventEmitter<GoodsAdvertisementRequest> = new EventEmitter();

  selectAllStatement: 'check' | 'uncheck' | 'indeterminate' = 'uncheck';

  @Input() advertisement = new GoodsAdvertisementRequest();
  deliveries = new Array<DeliveryTypeResponse>();

  ngOnInit(): void {
    this.deliveryService.getDeliveriesByAccountCountry().subscribe((r) => {
      this.deliveries = r;
    });
  }

  changeOnlySellerDeliveryCountry($event: boolean): void {
    this.advertisement.onlySellerCountry = $event;
  }

  changeSelectAll($event: boolean): void {
    this.deliveriesComponent.forEach((c) => {
      c.changeDeliveryStatement($event);
    });
  }

  getChosenDeliveriesArray(): Array<number> {
    const deliveries = new Array<number>();
    this.deliveriesComponent.forEach((c) => {
      if (c.statement) {
        deliveries.push(c.delivery.id);
      }
    });
    return deliveries;
  }

  clickNextStep(): void {
    this.advertisement.deliveryTypes = this.getChosenDeliveriesArray();
    this.goNextStep.emit(this.advertisement);
  }

  changeDeliveryState($event: boolean): void {
    let count = 0;
    this.deliveriesComponent.forEach((c) => {
      if (c.statement) {
        count++;
      }
    });
    if (count === 0) {
      this.selectAllCheck.statement = 'uncheck';
    } else if (count === this.deliveriesComponent.length) {
      this.selectAllCheck.statement = 'check';
    } else {
      this.selectAllCheck.statement = 'indeterminate';
    }
  }
}
