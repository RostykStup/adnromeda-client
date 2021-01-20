import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../../service/order/order.service';
import {PaginationRequest} from '../../../../entity/pagination-request';
import {GoodsOrderResponse} from '../../../../entity/order/goods-order-response';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';
import {Router} from '@angular/router';
import {UserGoodsOrderDataResponse} from '../../../../entity/order/user-goods-order-data-response';
import {SellerGoodsOrderDataResponse} from '../../../../entity/order/seller-goods-order-data-response';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.scss']
})
export class SellerOrdersComponent implements OnInit {

  constructor(public orderService: OrderService,
              private advertisementService: AdvertisementService,
              private router: Router) {
  }

  // orders

  orders = new Array<GoodsOrderResponse>();
  pagination = new PaginationRequest();
  listMode = 0;
  totalPages = 0;
  sellerGoodsOrderData = new SellerGoodsOrderDataResponse();

  ngOnInit(): void {
    // const pagination = new PaginationRequest();
    this.pagination.page = 0;
    this.pagination.field = 'creationDate';
    this.pagination.direction = 'DESC';
    this.pagination.size = 10;
    this.loadAllOrders();
    this.orderService.getSellerGoodsOrderData().subscribe((r) => {
      this.sellerGoodsOrderData = r;
    });
  }


  getImage(image: string | null, sellerId: number): string {
    return this.advertisementService.getAdvertisementImagePath(image, sellerId);
  }

  navigateToOrderData(id: number): void {
    window.open('/client/seller/order-data?orderId=' + id);
    // this.router.navigateByUrl('/client/seller/order-data?orderId=' + id)
  }

  loadAllOrders(): void {
    this.orderService.getSellerAllOrdersPage(this.pagination).subscribe((r) => {
      this.orders = r.data;
      this.totalPages = r.totalPages;
    });
  }

  loadWaitingForDeliveryOrders(): void {
    this.orderService.getSellerWaitingDeliveryOrdersPage(this.pagination).subscribe((r) => {
      this.orders = r.data;
      this.totalPages = r.totalPages;
    });
  }

  loadWaitingForShipmentOrders(): void {
    this.orderService.getSellerWaitingShipmentOrdersPage(this.pagination).subscribe((r) => {
      this.orders = r.data;
      this.totalPages = r.totalPages;
    });
  }

  loadClosedOrders(): void {
    this.orderService.getSellerClosedOrdersPage(this.pagination).subscribe((r) => {
      this.orders = r.data;
      this.totalPages = r.totalPages;
    });
  }

  loadNewOrders(): void {
    this.orderService.getSellerNewOrdersPage(this.pagination).subscribe((r) => {
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
      case 4:
        this.loadNewOrders();
        break;
      default:
        this.loadAllOrders();
    }
  }

  loadNewPage($event: PaginationRequest): void {
    this.pagination = $event;
    this.loadCurrentPageAndList(this.listMode);
  }
}

