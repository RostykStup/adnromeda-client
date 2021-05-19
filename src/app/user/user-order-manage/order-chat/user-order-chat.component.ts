import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../../service/order/order.service';
import {NavigationService} from '../../../../common/navigation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GoodsOrderResponse} from '../../../../entity/order/goods-order-response';
import {ChatService} from '../../../../service/message/chat.service';

@Component({
  selector: 'app-user-order-chat',
  templateUrl: './user-order-chat.component.html',
  styleUrls: ['./user-order-chat.component.scss']
})
export class UserOrderChatComponent implements OnInit {

  constructor(private orderService: OrderService,
              private navigationService: NavigationService,
              private router: Router,
              private route: ActivatedRoute,
              private chatService: ChatService) {
  }

  // @ts-ignore
  chatId: number;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('order'));
    if (isNaN(id)) {
      this.router.navigateByUrl('u');
    }
    this.orderService.getGoodsOrderByIdAndUser(id).subscribe((r) => {
      this.chatId = r.chatId;
    });
  }


}
