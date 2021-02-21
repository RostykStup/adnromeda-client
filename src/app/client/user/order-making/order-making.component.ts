import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CartService} from '../../../../service/cart/cart.service';
import {AddressService} from '../../../../service/address/address.service';
import {UserDeliveryAddressRequest} from '../../../../entity/address/user-delivery-address-request';
import {UserDeliveryAddressResponse} from '../../../../entity/address/user-delivery-address-response';
import {CartSellerPositionResponse} from '../../../../entity/cart/cart-seller-position-response';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';
import {GoodsCartItemResponse} from '../../../../entity/cart/goods-cart-item-response';
import {GoodsCartItemForCountingPriceRequest} from '../../../../entity/cart/goods-cart-item-for-counting-price-request';
import {MatDialog} from '@angular/material/dialog';
import {ChooseAddressDialogComponent} from '../../dialogs/choose-address-dialog/choose-address-dialog.component';
import {ChooseDeliveryDialogComponent} from '../../dialogs/choose-delivery-dialog/choose-delivery-dialog.component';
import {DeliveryTypeResponse} from '../../../../entity/country/delivery-type-response';
import {GoodsOrderRequest} from '../../../../entity/order/goods-order-request';
import {GoodsOrderItemRequest} from '../../../../entity/order/goods-order-item-request';
import {OrderService} from '../../../../service/order/order.service';
import {InfoDialogComponent} from '../../dialogs/info-dialog/info-dialog.component';

@Component({
  selector: 'app-order-making',
  templateUrl: './order-making.component.html',
  styleUrls: ['../../../../styles/button.scss', '../../../../styles/input.scss', './order-making.component.scss']
})
export class OrderMakingComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private cartService: CartService,
              private addressService: AddressService,
              private advertisementService: AdvertisementService,
              private orderService: OrderService,
              public dialog: MatDialog) {
  }

  address = new UserDeliveryAddressRequest();
  defaultAddressId = 0;
  userAddress: UserDeliveryAddressResponse | undefined = undefined;

  positions = new Array<CartSellerPositionResponse>();
  allPrice = 0;

  ngOnInit(): void {
    this.addressService.getDefaultUserAddress().subscribe((r) => {
      this.userAddress = r;
      this.defaultAddressId = r.id;
    });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.cartItemsId !== undefined) {
        const ids = params.cartItemsId.split(',');
        this.cartService.getItemsForOrder(ids).subscribe((r) => {
          this.positions = r;
          this.getOrderPrice();
        });
      } else if (params.advertisementId !== undefined && params.deliveryId !== undefined) {
        const advertisementId = params.advertisementId;
        const deliveryId = params.deliveryId;
        const count = params.count;
        this.cartService.getNewItemForOrder(advertisementId, deliveryId, count);
      }
    });
  }

  getImage(image: string | null, sellerId: number): string {
    return this.advertisementService.getAdvertisementImagePath(image, sellerId);
  }

  clickMinusCountButton(item: GoodsCartItemResponse): void {
    this.getAdvertisementCount(item);
    this.positions.forEach(p => {
      const index = p.items.indexOf(item, 0);
      if (index > -1) {
        const count = +item.count - 1;
        this.cartService.checkGoodsCartItemCount(item.id, count).subscribe(r => {
          p.items[index].count = r.count;
          this.getOrderPrice();
        });
      }
    });
  }

  getOrderPrice(): void {
    // let num = 0;
    this.allPrice = 0;
    this.positions.forEach(p => {
      p.items.forEach(i => {
        // num++;
        this.allPrice += (i.priceCountResponse.price * i.count);
      });
    });
  }

  getAdvertisementCount(item: GoodsCartItemResponse): void {
    this.positions.forEach(p => {
      const index = p.items.indexOf(item, 0);
      if (index > -1) {
        this.advertisementService
          .getAdvertisementParameterCount(item.priceCountResponse.id).subscribe((r) => {
          p.items[index].priceCountResponse.count = r;
        });
      }
    });
  }

  clickPlusCountButton(item: GoodsCartItemResponse): void {
    this.getAdvertisementCount(item);
    this.positions.forEach(p => {
      const index = p.items.indexOf(item, 0);
      if (index > -1) {
        const count = +item.count + 1;
        this.cartService.checkGoodsCartItemCount(item.id, count).subscribe(r => {
          p.items[index].count = r.count;
          this.getOrderPrice();
        });
      }
    });
  }

  inputCartItemCount($event: any, item: GoodsCartItemResponse): void {
    this.getAdvertisementCount(item);
    let newCount = $event.target.value;
    if (newCount === '') {
      newCount = 1;
    }
    this.positions.forEach(p => {
      const index = p.items.indexOf(item, 0);
      if (index > -1) {
        this.cartService.checkGoodsCartItemCount(item.id, newCount).subscribe(r => {
          p.items[index].count = r.count;
          $event.target.value = r.count;
          this.getOrderPrice();
        });
      }
    });
  }

  clickAddDescription($event: any): any {
    $event.target.classList.add('add-description');
  }

  clickChooseAddress(): void {
    const dialogRef = this.dialog.open(ChooseAddressDialogComponent, {
      data: {addressId: this.defaultAddressId},
      width: '55%',
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.userAddress = data.address;
      }

      this.addressService.getDefaultUserAddress().subscribe(r => {
        this.defaultAddressId = r.id;
      });
    });
  }


  openDeliveriesDialog(itemId: number, advertId: number, delivery: DeliveryTypeResponse): void {
    const dialogRef = this.dialog.open(ChooseDeliveryDialogComponent, {
      data: {delivery, advertisementId: advertId},
      // width: '40%',
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.changeItemAddress(itemId, data.delivery);
      }
    });
  }

  changeItemAddress(itemId: number, delivery: DeliveryTypeResponse): void {
    this.positions.forEach((p) => {
      p.items.forEach((i) => {
        if (i.id === itemId) {
          i.deliveryType = delivery;
        }
      });
    });
  }

  makeOrder(): void {
    const count = this.getItemsCount();
    let items = 0;
    this.positions.forEach((p) => {
      const request = new GoodsOrderRequest();

      // @ts-ignore
      request.addressId = this.userAddress.id;

      p.items.forEach((i) => {
        request.items.push(
          new GoodsOrderItemRequest(
            i.count,
            i.advertisementId,
            i.deliveryType.id,
            i.description,
            i.priceCountResponse.id)
        );
      });
      this.orderService.createOrder(request).subscribe(() => {
        p.items.forEach((i) => {
          this.cartService.deleteItemFromCart(i.id).subscribe(() => {
            items++;
            console.log('items - ' + items + '\t' + 'count - ' + count);
            if (items === count) {
              const dialogRef = this.dialog.open(InfoDialogComponent, {
                data: {text: 'Ваше замовлення успішно оформлено, дякуємо що користуєтесь Andromeda'},
                // width: '40%',
              });
              dialogRef.afterClosed().subscribe((data) => {
                this.router.navigateByUrl('/client/user/orders');
              });
            }
          });
        });
      });
    });
  }

  getItemsCount(): number {
    let c = 0;
    this.positions.forEach((p) => {
      p.items.forEach((i) => {
        c++;
      });
    });
    return c;
  }
}
