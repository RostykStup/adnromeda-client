import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../../service/order/order.service';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';
import {Router} from '@angular/router';
import {GoodsOrderResponse} from '../../../../entity/order/goods-order-response';
import {PaginationRequest} from '../../../../entity/pagination-request';
import {UserGoodsOrderDataResponse} from '../../../../entity/order/user-goods-order-data-response';
import {CartService} from '../../../../service/cart/cart.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {InfoDialogComponent} from '../../dialogs/info-dialog/info-dialog.component';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  constructor(public orderService: OrderService,
              private advertisementService: AdvertisementService,
              private router: Router,
              private dialog: MatDialog,
              private cartService: CartService) {
  }

  orders = new Array<GoodsOrderResponse>();
  pagination = new PaginationRequest();
  listMode = 0;
  totalPages = 0;
  userGoodsOrderData = new UserGoodsOrderDataResponse();

  ngOnInit(): void {
    this.pagination.page = 0;
    this.pagination.field = 'creationDate';
    this.pagination.direction = 'DESC';
    this.pagination.size = 10;
    this.loadAllOrders();

    this.orderService.getUserGoodsOrderData().subscribe((r) => {
      this.userGoodsOrderData = r;
    });
  }

  getImage(image: string | null, sellerId: number): string {
    return this.advertisementService.getAdvertisementImagePath(image, sellerId);
  }

  navigateToOrderData(id: number): void {
    window.open('/client/user/order-data?orderId=' + id);
    // this.router.navigateByUrl('/client/seller/order-data?orderId=' + id)
  }

  navigateToFeedBackMaking(id: number): void {
    // window.open('/client/user/feedback?orderId=' + id);
    this.router.navigateByUrl('/client/user/feedback?orderId=' + id);
  }

  loadAllOrders(): void {
    this.orderService.getUserAllOrdersPage(this.pagination).subscribe((r) => {
      this.orders = r.data;
      this.totalPages = r.totalPages;
    });
  }

  loadWaitingForDeliveryOrders(): void {
    this.orderService.getUserWaitingDeliveryOrdersPage(this.pagination).subscribe((r) => {
      this.orders = r.data;
      this.totalPages = r.totalPages;
    });
  }

  loadWaitingForShipmentOrders(): void {
    this.orderService.getUserWaitingShipmentOrdersPage(this.pagination).subscribe((r) => {
      this.orders = r.data;
      this.totalPages = r.totalPages;
    });
  }

  loadClosedOrders(): void {
    this.orderService.getUserClosedOrdersPage(this.pagination).subscribe((r) => {
      this.orders = r.data;
      this.totalPages = r.totalPages;
    });
  }

  changeListMode(mode: number): void {
    this.listMode = mode;
    this.pagination.page = 0;
    this.pagination.size = 10;
    this.loadCurrentPageAndList(this.listMode);
  }

  loadCurrentPageAndList(mode: number): void {
    switch (mode) {
      case 0 :
        this.loadAllOrders();
        break;
      case 1:
        this.loadWaitingForShipmentOrders();
        break;
      case 2:
        this.loadWaitingForDeliveryOrders();
        break;
      case 3:
        this.loadClosedOrders();
        break;
      default:
        this.loadAllOrders();
    }
  }

  loadNewPage($event: PaginationRequest): void {
    this.pagination = $event;
    this.loadCurrentPageAndList(this.listMode);
  }

  addOrderToCart(order: GoodsOrderResponse): void {
    const num = order.items.length;
    let c = 0;
    order.items.forEach((i) => {
      this.cartService.addItemToCart(i.advertisementId, i.delivery.id).subscribe(() => {
        c++;
        if (c === num) {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            data: {
              text: 'Товари успішно додано до корзини'
            }
          });
          dialogRef.afterClosed().subscribe();
        }
      });
    });
  }
}
