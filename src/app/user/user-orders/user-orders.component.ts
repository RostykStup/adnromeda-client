import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {OrderService} from '../../../service/order/order.service';
import {AdvertisementService} from '../../../service/advertisement/advertisement.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationService} from '../../../common/navigation.service';
import {GoodsOrderResponse} from '../../../entity/order/goods-order-response';
import {PaginationRequest} from '../../../entity/pagination-request';
import {SellerGoodsOrderDataResponse} from '../../../entity/order/seller-goods-order-data-response';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  constructor(private titleService: Title,
              public orderService: OrderService,
              private advertisementService: AdvertisementService,
              private route: ActivatedRoute,
              private router: Router,
              private navigationService: NavigationService) {
  }

  orders = new Array<GoodsOrderResponse>();
  pagination = new PaginationRequest();
  totalPages = 0;
  totalElements = 0;
  sellerGoodsOrderData = new SellerGoodsOrderDataResponse();

  ordersStatus: string | null = null;

  ngOnInit(): void {
    this.titleService.setTitle('Замовлення - Andromeda Workshop');
    this.pagination = this.navigationService.getPaginationFromCurrentRoute();
    this.ordersStatus = this.route.snapshot.queryParamMap.get('status');
    if (this.route.snapshot.queryParamMap.get('page') == null) {
      this.pagination.page = 0;
      this.pagination.field = 'creationDate';
      this.pagination.size = 15;
      this.pagination.direction = 'DESC';
      this.navigateNew();
    } else {
      this.loadOrders();
    }

  }

  loadOrders(): void {
    this.ordersStatus = this.route.snapshot.queryParamMap.get('status');
    const statuses = new Array<string>();
    if (this.ordersStatus != null) {
      statuses.push(this.ordersStatus);
    }
    this.orderService.getUserOrdersPageByStatuses(this.pagination, statuses).subscribe((r) => {
      this.orders = r.data;
      this.totalPages = r.totalPages;
      this.totalElements = r.totalElements;
    });
  }


  changeOrdersType(type: string | null): void {
    this.ordersStatus = type;
    this.navigateNew();
  }

  navigateNew(): void {
    this.router.navigateByUrl(
      NavigationService.getUserOrdersUrl() + '?'
      + NavigationService.convertPaginationRequestToParamsQuery(this.pagination)
      + (this.ordersStatus == null ? '' : '&status=' + this.ordersStatus)
    ).then(() => {
      this.loadOrders();
    });
  }

  changeDirection(pagination: PaginationRequest): void {
    this.pagination = pagination;
    this.navigateNew();
  }

  changePagination(pagination: PaginationRequest): void {
    this.pagination = pagination;
    this.navigateNew();
  }

}
