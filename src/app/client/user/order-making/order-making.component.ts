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
              public dialog: MatDialog) {
  }

  address = new UserDeliveryAddressRequest();
  defaultAddressId = 0;
  userAddress: UserDeliveryAddressResponse | undefined = undefined;

  positions = new Array<CartSellerPositionResponse>();
  allPrice = 0;

  ngOnInit(): void {
    this.address.city = 'Lviv';
    this.address.countryCode = 'UA';
    this.address.phoneNumber = '098 0405703';
    this.address.recipient = 'Rostyslav Stupnytskiy';
    this.address.region = 'Lvivska';
    this.address.street = 'Syhnivka 9';
    // this.addressService.saveAddress(this.address).subscribe();

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
          p.items[index].price = r.price;
          this.getOrderPrice();
        });
      }
    });
  }

  getOrderPrice(): void {
    const items = new Array<GoodsCartItemForCountingPriceRequest>();
    let num = 0;
    this.positions.forEach(p => {
      p.items.forEach(i => {
        items.push(new GoodsCartItemForCountingPriceRequest(i));
        num++;
      });
    });

    this.cartService.getItemsPrice(items).subscribe(r => {
      this.allPrice = r;
    });
  }

  getAdvertisementCount(item: GoodsCartItemResponse): void {
    this.positions.forEach(p => {
      const index = p.items.indexOf(item, 0);
      if (index > -1) {
        this.advertisementService.getAdvertisementCount(p.items[index].advertisementId).subscribe((r) => {
          p.items[index].max = r;
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
          p.items[index].price = r.price;
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
          p.items[index].price = r.price;
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
      data: {addressId : this.defaultAddressId},
      width: '55%',
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.userAddress = data.address;
        this.defaultAddressId = data.defaultId;
      } else {
        this.addressService.getDefaultUserAddress().subscribe(r => {
          this.defaultAddressId = r.id;
        });
      }
    });
  }
}
