import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {GoodsCartItemResponse} from '../../../../entity/cart/goods-cart-item-response';
import {CurrencyResponse} from '../../../../entity/country/currency-response';
import {AndromedaCheckboxComponent} from '../../components/andromeda-checkbox/andromeda-checkbox.component';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';
import {DeliveryService} from '../../../../service/country/delivery.service';
import {CartService} from '../../../../service/cart/cart.service';
import {GoodsOrderItemRequest} from '../../../../entity/order/goods-order-item-request';

@Component({
  selector: 'app-choose-order-item-view',
  templateUrl: './choose-order-item-view.component.html',
  styleUrls: ['./choose-order-item-view.component.scss']
})
export class ChooseOrderItemViewComponent implements OnInit {

  constructor(private advertisementService: AdvertisementService,
              private cartService: CartService) {
  }

  // @ts-ignore
  @Input() item: GoodsCartItemResponse;
  // @ts-ignore
  @Input() currency: CurrencyResponse;
  // @ts-ignore
  @Input() sellerId: number;
  // @ts-ignore
  @ViewChildren(AndromedaCheckboxComponent) checkbox: QueryList<AndromedaCheckboxComponent>;

  @Output() changeInfoForSum: EventEmitter<void> = new EventEmitter();

  checked = false;
  max = 0;
  isAvailable = true;

  ngOnInit(): void {
    this.max = this.item.priceCountResponse.count;
  }

  getImage(): string {
    return this.advertisementService.getAdvertisementImagePath(this.item.image, this.sellerId);
  }

  getSum(): number {
    return this.item.count * this.item.priceCountResponse.priceWithDiscount;
  }

  minusButtonClick(): void {
    if (this.item.count > 1) {
      this.updateCartItemCount(this.item.count - 1);
    }
  }

  plusButtonClick(): void {
    if (this.item.count < this.item.priceCountResponse.count) {
      this.updateCartItemCount(this.item.count + 1);
    }
  }


  updateCartItemCount(count: number): void {
    this.cartService.checkGoodsCartItemCount(this.item.id, count).subscribe((r) => {
      this.item.count = r.count;
      this.emitChangesForSum();
    });
  }

  countInputKeyUp($event: any): void {
    const count = $event.target.value;
    if (count === '') {
      $event.target.value = 1;
      this.updateCartItemCount(1);
    } else if (+count > this.item.priceCountResponse.count) {
      this.updateCartItemCount(this.item.priceCountResponse.count);
    } else {
      this.updateCartItemCount(+count);
    }
  }

  emitChangesForSum(): void {
    this.changeInfoForSum.emit();
  }

  getItemRequest(): GoodsOrderItemRequest {
    const request = new GoodsOrderItemRequest();
    request.paramsValuesId = this.item.priceCountResponse.id;
    request.advertisement = this.item.advertisementId;
    request.count = this.item.count;
    request.price = this.item.priceCountResponse.priceWithDiscount;
    request.cartItemId = this.item.id;
    return request;
  }

}
