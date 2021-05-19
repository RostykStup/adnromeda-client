import {Component, OnInit} from '@angular/core';
import {AdvertisementService} from '../../../service/advertisement/advertisement.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CurrencyService} from '../../../service/country/currency.service';
import {GoodsAdvertisementStatisticsResponse} from '../../../entity/statistics/advertisement/GoodsAdvertisementStatisticsResponse';
import {CountryService} from '../../../service/country/country.service';
import {DeliveryService} from '../../../service/country/delivery.service';
import {DeliveryTypeResponse} from '../../../entity/country/delivery-type-response';
import {ChooseDeliveryDialogComponent} from '../../dialogs/choose-delivery-dialog/choose-delivery-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {RestCountry} from '../../../entity/country/rest-country';
import {PaginationRequest} from '../../../entity/pagination-request';
import {FeedbackService} from '../../../service/feedback/feedback.service';
import {PaginationResponse} from '../../../entity/pagination-response';
import {GoodsAdvertisementFeedbackResponse} from '../../../entity/feedback/goods-advertisement-feedback-response';
import {CartService} from '../../../service/cart/cart.service';
import {ItemAddedToCartDialogComponent} from '../../dialogs/item-added-to-cart-dialog/item-added-to-cart-dialog.component';
import {AccountService} from '../../../service/account/account.service';
import {LoginDialogComponent} from '../../dialogs/login-dialog/login-dialog.component';
import {ImageDialogComponent} from '../../dialogs/image-dialog/image-dialog.component';
import {GoodsAdvertisementResponse} from '../../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';
import {ParameterValueResponse} from '../../../entity/advertisement/goodsAdvertisement/parameter/parameter-value-response';
import {ParameterResponse} from '../../../entity/advertisement/goodsAdvertisement/parameter/parameter-response';
import {ParametersValuesPriceCountResponse} from '../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-price-count-response';
import {migrateLegacyGlobalConfig} from '@angular/cli/utilities/config';
import {templateJitUrl} from '@angular/compiler';

@Component({
  selector: 'app-advertisement-view',
  templateUrl: './advertisement-view.component.html',
  styleUrls: ['./advertisement-view.component.scss']
})
export class AdvertisementViewComponent implements OnInit {

  constructor(private advertisementService: AdvertisementService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private cartService: CartService,
              private accountService: AccountService) {

  }

  // @ts-ignore
  advertisement: GoodsAdvertisementResponse;


  ngOnInit(): void {
    // @ts-ignore
    this.advertisementService.getGoodsAdvertisementById(this.route.snapshot.queryParamMap.get('id')).subscribe((r) => {
      this.advertisement = r;
    });
  }

  getAdvertisementImage(imageName: string | null): string {
    return this.advertisementService.getAdvertisementImagePath(imageName, this.advertisement.sellerId);
  }

}
