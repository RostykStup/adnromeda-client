import {Component, Input, OnInit} from '@angular/core';
import {GoodsOrderResponse} from '../../../../../entity/order/goods-order-response';
import {DialogService} from '../../../../../common/dialog.service';
import {OrderService} from '../../../../../service/order/order.service';

@Component({
  selector: 'app-user-payment-manage',
  templateUrl: './user-payment-manage.component.html',
  styleUrls: ['./user-payment-manage.component.scss']
})
export class UserPaymentManageComponent implements OnInit {

  constructor(private dialogService: DialogService,
              private orderService: OrderService) {
  }

  // @ts-ignore
  @Input() order: GoodsOrderResponse;

  ngOnInit(): void {
  }

  clickConfirmPayment(): void {
    this.dialogService.openConfirmationButton('Підтвердити оплату замовлення?').subscribe((r) => {
      if (r) {
        this.orderService.confirmGoodsOrderPayment(this.order.id).subscribe(() => {
          window.location.reload();
        })
      }
    });
  }
}
