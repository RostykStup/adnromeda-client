import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AdvertisementService} from '../../../../../service/advertisement/advertisement.service';
import {DeliveryService} from '../../../../../service/country/delivery.service';
import {DiscountService} from '../../../../../service/advertisement/discount/discount.service';
import {ParametersValuesPriceCountResponse} from '../../../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-price-count-response';
import {DiscountsForParametersValuesPriceCountResponse} from '../../../../../service/advertisement/discount/discounts-for-parameters-values-price-count-response';
import {DiscountResponse} from '../../../../../entity/advertisement/goodsAdvertisement/discount/discount-response';
import {GoodsAdvertisementResponse} from '../../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';
import {InfoDialogComponent} from '../../../dialogs/info-dialog/info-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CreateDiscountDialogComponent} from '../../../dialogs/create-discount-dialog/create-discount-dialog.component';
import {ConfirmDialogComponent} from '../../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-advertisement-discounts',
  templateUrl: './advertisement-discounts.component.html',
  styleUrls: ['./advertisement-discounts.component.scss']
})
export class AdvertisementDiscountsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private advertisementService: AdvertisementService,
              private discountService: DiscountService,
              public dialog: MatDialog) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.advertisementId = params.advertisementId;
      this.discountService.getParametersValuesPriceCountsWithDiscount(this.advertisementId).subscribe((r) => {
        this.paramValuesWithDiscount = r;
        console.log(r);
        this.advertisementService.getGoodsAdvertisementById(this.advertisementId).subscribe((resp) => {
          this.advertisement = resp;
        });
      });
    });
  }
  advertisementId = 0;

  // @ts-ignore
  advertisement: GoodsAdvertisementResponse;

  paramValuesWithDiscount = new Array<DiscountsForParametersValuesPriceCountResponse>();

  ngOnInit(): void {
  }

  addDiscountOpen(): void {
    const data = {
      paramArray: this.advertisement.parameters,
      paramValues: this.advertisement.valuesPriceCounts
    };
    const dialogRef = this.dialog.open(CreateDiscountDialogComponent, {
      data,
      maxWidth: '50%'
    });
    dialogRef.afterClosed().subscribe();
  }


}
