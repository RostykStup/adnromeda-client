import {Component, OnInit} from '@angular/core';
import {GoodsOrderResponse} from '../../../entity/order/goods-order-response';
import {OrderService} from '../../../service/order/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationService} from '../../../common/navigation.service';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.scss']
})
export class OrderManageComponent implements OnInit {

  constructor(private orderService: OrderService,
              private navigationService: NavigationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

// @ts-ignore
  goodsOrder: GoodsOrderResponse;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('order'));
    if (isNaN(id)) {
      this.router.navigateByUrl('s');
    }

    this.orderService.getGoodsOrderByIdAndSeller(id).subscribe((r) => {
      this.goodsOrder = r;
      console.log(this.goodsOrder);
      if (this.goodsOrder.orderStatus === 'WAITING_FOR_SELLER_CONFIRMATION') {
        this.router.navigate(['confirmation'],
          {relativeTo: this.route, queryParams: {order: r.id, auth: this.navigationService.getAuthNumFromCurrentRoute()}});
      }
    });
  }
}
