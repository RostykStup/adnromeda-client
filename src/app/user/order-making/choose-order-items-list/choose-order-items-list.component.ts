import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CartSellerPositionResponse} from '../../../../entity/cart/cart-seller-position-response';
import {CartItemComponent} from '../../../common/cart-order/seller-position/cart-item/cart-item.component';
import {AndromedaCheckboxComponent} from '../../../common/components/andromeda-checkbox/andromeda-checkbox.component';
import {NavigationService} from '../../../../common/navigation.service';
import {CartService} from '../../../../service/cart/cart.service';
import {Router} from '@angular/router';
import {ChooseOrderItemViewComponent} from '../choose-order-item-view/choose-order-item-view.component';
import {GoodsOrderItemRequest} from '../../../../entity/order/goods-order-item-request';

@Component({
  selector: 'app-choose-order-items-list',
  templateUrl: './choose-order-items-list.component.html',
  styleUrls: ['./choose-order-items-list.component.scss']
})
export class ChooseOrderItemsListComponent implements OnInit {

  constructor(private cartService: CartService, private router: Router) {
  }

  // @ts-ignore
  @Input() position: CartSellerPositionResponse;

  // @ts-ignore
  @ViewChildren(ChooseOrderItemViewComponent) itemsComponents: QueryList<ChooseOrderItemViewComponent>;

  // @ts-ignore
  sum: number;

  ngOnInit(): void {
    this.recountSum();
  }

  recountSum(): void {
    setTimeout(() => {
      this.sum = 0;
      this.itemsComponents.forEach((i) => {
        this.sum = this.sum + i.getSum();
      });
    }, 100);
  }

  exchangeItems(currency: string): void {
    const ids = new Array<number>();
    this.position.items.forEach((i) => {
      ids.push(i.id);
    });
    this.cartService.exchangeSellerPositionCurrency(currency, ids).subscribe((r) => {
      this.position = r;
      this.recountSum();
    });
  }

  changeCurrencySelect($event: any): void {
    const currency = $event.target.value;
    this.exchangeItems(currency);
  }

  getItemsList(): Array<GoodsOrderItemRequest> {
    const items = new Array<GoodsOrderItemRequest>();
    this.itemsComponents.forEach((i) => {
      items.push(i.getItemRequest());
    });
    return items;
  };

}
