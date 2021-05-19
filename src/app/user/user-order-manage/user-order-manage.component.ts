import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../service/order/order.service';
import {NavigationService} from '../../../common/navigation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GoodsOrderResponse} from '../../../entity/order/goods-order-response';
import {ChatService} from '../../../service/message/chat.service';

@Component({
  selector: 'app-user-order-manage',
  templateUrl: './user-order-manage.component.html',
  styleUrls: ['./user-order-manage.component.scss']
})
export class UserOrderManageComponent implements OnInit {

  constructor(private orderService: OrderService,
              private navigationService: NavigationService,
              private router: Router,
              private route: ActivatedRoute,
              private chatService: ChatService) {
  }


  // @ts-ignore
  goodsOrder: GoodsOrderResponse;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('order'));
    if (isNaN(id)) {
      this.router.navigateByUrl('u');
    }

    this.orderService.getGoodsOrderByIdAndUser(id).subscribe((r) => {
      this.goodsOrder = r;
    });
  }

}
