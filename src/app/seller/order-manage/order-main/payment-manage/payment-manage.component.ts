import {Component, Input, OnInit} from '@angular/core';
import {GoodsOrderResponse} from '../../../../../entity/order/goods-order-response';
import {OrderService} from '../../../../../service/order/order.service';
import {NavigationService} from '../../../../../common/navigation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../../../common/dialog.service';

@Component({
  selector: 'app-payment-manage',
  templateUrl: './payment-manage.component.html',
  styleUrls: ['./payment-manage.component.scss']
})
export class PaymentManageComponent implements OnInit {

  constructor(private dialogService: DialogService,
              private orderService: OrderService) {
  }

  // @ts-ignore
  @Input() order: GoodsOrderResponse;

  ngOnInit(): void {
  }

  clickConfirmButton(): void {
    this.dialogService.openConfirmationButton('Підтвердити отримання оплати? Після підтвердження вам потрібно буде надіслати замовлення покупцеві').subscribe((r) => {
      if (r) {
        this.orderService.confirmGoodsOrderPaymentFromSeller(this.order.id).subscribe(() => {
          window.location.reload();
        })
      }
    });

  }
}
