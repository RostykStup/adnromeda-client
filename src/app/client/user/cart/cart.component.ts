import {Component, ElementRef, OnInit} from '@angular/core';
import {CartService} from '../../../../service/cart/cart.service';
import {CartResponse} from '../../../../entity/cart/cart-response';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';
import {GoodsCartItemForCountingPriceRequest} from '../../../../entity/cart/goods-cart-item-for-counting-price-request';
import {GoodsCartItemResponse} from '../../../../entity/cart/goods-cart-item-response';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../dialogs/info-dialog/info-dialog.component';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../../../../styles/button.scss', '../../../../styles/input.scss', './cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService,
              private advertisementService: AdvertisementService,
              private elem: ElementRef,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  cart = new CartResponse();
  allChecked = false;
  allPrice = 0;
  allItems = 0;

  ngOnInit(): void {
    this.cartService.getUserCart().subscribe(r => {
      this.cart = r;
    });
  }

  getImage(image: string | null, sellerId: number): string {
    return this.advertisementService.getAdvertisementImagePath(image, sellerId);
  }


  selectAllSellerItems($event: any, sellerId: number): void {
    const isChecked = $event.target.checked;
    this.allChecked = false;
    this.cart.positions.forEach(p => {
      if (p.sellerId === sellerId) {
        p.items.forEach(i => {
          i.checked = isChecked;
        });
      }
    });
    this.getCartPrice();
  }

  changeItemCheck($event: any, sellerId: number): void {
    const isChecked = $event.target.checked;
    if (isChecked === false) {
      this.cart.positions.forEach(p => {
        if (p.sellerId === sellerId) {
          p.sellerCheck = false;
          this.allChecked = false;
          console.log('all checked = ' + this.allChecked);
        }
      });
    } else if (isChecked === true) {
      this.cart.positions.forEach(p => {
        if (p.sellerId === sellerId) {
          let audit = true;
          p.items.forEach((i) => {
            if (!i.checked) {
              audit = false;
            }
          });
          p.sellerCheck = audit;
        }
      });
    }
    this.getCartPrice();
  }

  getAdvertisementCount(item: GoodsCartItemResponse): void {
    this.cart.positions.forEach(p => {
      const index = p.items.indexOf(item, 0);
      if (index > -1) {
        this.advertisementService
          .getAdvertisementParameterCount(item.priceCountResponse.id).subscribe((r) => {
          p.items[index].priceCountResponse.count = r;
        });
      }
    });
  }

  getCartPrice(): void {
    let num = 0;
    this.allPrice = 0;
    this.cart.positions.forEach(p => {
      p.items.forEach(i => {
        if (i.checked) {
          num++;
          this.allPrice += (i.priceCountResponse.price * i.count);
        }
      });
    });
    this.allItems = num;
    // this.cartService.getItemsPrice(items).subscribe(r => {
    //   this.allPrice = r;
    //   this.allItems = num;
    // });
  }

  changeAllChecked($event: any): void {
    const isChecked = $event.target.checked;
    this.cart.positions.forEach(p => {
      p.sellerCheck = isChecked;
      p.items.forEach(i => {
        i.checked = isChecked;
      });
    });
    this.getCartPrice();
  }

  clickPlusCountButton(item: GoodsCartItemResponse): void {
    this.getAdvertisementCount(item);
    this.cart.positions.forEach(p => {
      const index = p.items.indexOf(item, 0);
      if (index > -1) {
        const count = +item.count + 1;
        this.cartService.updateGoodsCartItemCount(item.id, count).subscribe((r) => {
          p.items[index].count = r.count;
          this.getCartPrice();
        });
      }
    });
  }

  clickMinusCountButton(item: GoodsCartItemResponse): void {
    this.getAdvertisementCount(item);
    this.cart.positions.forEach(p => {
      const index = p.items.indexOf(item, 0);
      if (index > -1) {
        const count = +item.count - 1;
        this.cartService.updateGoodsCartItemCount(item.id, count).subscribe(r => {
          p.items[index].count = r.count;
          this.getCartPrice();
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
    this.cart.positions.forEach(p => {
      const index = p.items.indexOf(item, 0);
      if (index > -1) {
        this.cartService.updateGoodsCartItemCount(item.id, newCount).subscribe(r => {
          p.items[index].count = r.count;
          $event.target.value = r.count;
          this.getCartPrice();
        });
      }
    });
  }

  deleteCartItem(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: 'Видалити цей товар з корзини?'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data.result) {
        this.cartService.deleteItemFromCart(id).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

  orderButtonClick(): void {
    if (this.allItems !== 0) {
      const cartItemsIds = new Array<number>();
      this.cart.positions.forEach(p => {
        p.items.forEach(i => {
          if (i.checked) {
            cartItemsIds.push(i.id);
          }
        });
      });
      this.router.navigateByUrl('client/user/order?cartItemsId=' + cartItemsIds);
    }
  }
}
