import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../../service/order/order.service';
import {NavigationService} from '../../../../common/navigation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatService} from '../../../../service/message/chat.service';

@Component({
  selector: 'app-order-char',
  templateUrl: './order-char.component.html',
  styleUrls: ['./order-char.component.scss']
})
export class OrderCharComponent implements OnInit {

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
    this.orderService.getGoodsOrderByIdAndSeller(id).subscribe((r) => {
      this.chatId = r.chatId;
    });
  }

}
