import {Component, ElementRef, OnInit} from '@angular/core';
import {CartService} from '../../../service/cart/cart.service';
import {CartResponse} from '../../../entity/cart/cart-response';
import {AdvertisementService} from '../../../service/advertisement/advertisement.service';
import {GoodsCartItemResponse} from '../../../entity/cart/goods-cart-item-response';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
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
  allPrice = 0;
  allItems = 0;

  ngOnInit(): void {
    this.cartService.getUserCart().subscribe(r => {
      this.cart = r;
      // console.log(this.cart);
    });
  }


}
