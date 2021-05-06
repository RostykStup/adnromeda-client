import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {GoodsOrderResponse} from '../../../entity/order/goods-order-response';
import {OrderService} from '../../../service/order/order.service';
import {AdvertisementService} from '../../../service/advertisement/advertisement.service';
import {DeliveryTypeResponse} from '../../../entity/country/delivery-type-response';
import {DeliveryService} from '../../../service/country/delivery.service';
import {GoodsOrderDeliveryDetailsForShipmentRequest} from '../../../entity/order/goods-order-delivery-details-for-shipment-request';
import {Validator} from '../../../common/validator';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss']
})
export class OrderDataComponent implements OnInit {

  order = new GoodsOrderResponse();
  deliveries = new Array<DeliveryTypeResponse>();

  shipmentRequest = new GoodsOrderDeliveryDetailsForShipmentRequest();

  validationTrackingNumber = true;

  constructor(private activatedRoute: ActivatedRoute,
              public orderService: OrderService,
              private advertisementService: AdvertisementService,
              private deliveryService: DeliveryService) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.orderService.getGoodsOrderByIdAndSeller(params.orderId).subscribe((r) => {
        this.order = r;
        this.shipmentRequest.orderId = this.order.id;
        this.shipmentRequest.delivery = this.order.items[0].delivery.id;
        if (!this.order.isViewed) {
          this.orderService.confirmGoodsOrderView(this.order.id).subscribe();
        }
      });
    });
    this.deliveryService.getDeliveriesByAccountCountry().subscribe((r) => {
      this.deliveries = r;

    });
  }

  ngOnInit(): void {
  }

  getImage(image: string | null, sellerId: number): string {
    return this.advertisementService.getAdvertisementImagePath(image, sellerId);
  }

  clickConfirmSendingButton(): void {
    this.shipmentRequest.trackingNumber = this.shipmentRequest.trackingNumber.trim();
    this.shipmentRequest.sellerMessage = this.shipmentRequest.sellerMessage.trim();
    this.validationTrackingNumber = Validator.validateSizeMin(this.shipmentRequest.trackingNumber, 10);
    if (this.validationTrackingNumber) {
      this.orderService.confirmGoodsOrderSending(this.shipmentRequest).subscribe(() => {
          window.location.reload();
        });
    }
  }

}
