import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {GoodsCartItemResponse} from '../../../../../entity/cart/goods-cart-item-response';
import {AdvertisementService} from '../../../../../service/advertisement/advertisement.service';
import {CurrencyResponse} from '../../../../../entity/country/currency-response';
import {DeliveryService} from '../../../../../service/country/delivery.service';
import {GoodsParametersCreationComponent} from '../../../../seller/create-goods/goods-params-price-info/goods-parameters-creation/goods-parameters-creation.component';
import {AndromedaCheckboxComponent} from '../../../components/andromeda-checkbox/andromeda-checkbox.component';
import {CartService} from '../../../../../service/cart/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  constructor(private advertisementService: AdvertisementService,
              private deliveryService: DeliveryService,
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

  @Output() changeCheckState: EventEmitter<boolean> = new EventEmitter();
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

  getDeliveryName(): string {
    if (this.item.deliveryName === 'default') {
      return 'За домовленістю з продавцем';
    } else {
      return this.item.deliveryName;
    }
  }

  changeCheck($event: boolean): void {
    this.checked = $event;
    this.emitCheckChange();
    this.emitChangesForSum();
  }

  isChecked(): boolean {
    return this.checked && this.isAvailable;
  }

  setCheck(statement: boolean): void {
    this.checked = statement;
    if (statement && this.isAvailable) {
      this.checkbox.first.statement = 'check';
    } else {
      this.checkbox.first.statement = 'uncheck';
    }
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
    this.cartService.updateGoodsCartItemCount(this.item.id, count).subscribe((r) => {
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

  emitCheckChange(): void {
    this.changeCheckState.emit(this.checked);
  }

  emitChangesForSum(): void {
    this.changeInfoForSum.emit();
  }
}
