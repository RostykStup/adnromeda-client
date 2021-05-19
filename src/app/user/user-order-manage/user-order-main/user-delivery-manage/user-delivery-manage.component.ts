import {Component, Input, OnInit} from '@angular/core';
import {GoodsOrderResponse} from '../../../../../entity/order/goods-order-response';
import {DialogService} from '../../../../../common/dialog.service';
import {OrderService} from '../../../../../service/order/order.service';

@Component({
  selector: 'app-user-delivery-manage',
  templateUrl: './user-delivery-manage.component.html',
  styleUrls: ['./user-delivery-manage.component.scss']
})
export class UserDeliveryManageComponent implements OnInit {

  constructor(private dialogService: DialogService, private orderService: OrderService) {
  }

  // @ts-ignore
  @Input() order: GoodsOrderResponse;

  ngOnInit(): void {
  }

  confirmDelivery(): void {
    this.dialogService.openConfirmationButton('Ви тримали замовлення?').subscribe((r) => {
      this.orderService.confirmGoodsOrderDelivery(this.order.id).subscribe(() => {
        window.location.reload();
      });
    });
  }
}
