import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GoodsAdvertisementResponse} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';
import {WholesaleGoodsAdvertisementRequest} from '../../../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-goods-advertisement-request';
import {WholesaleGoodsAdvertisementResponse} from '../../../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-goods-advertisement-response';
import {RetailGoodsAdvertisementResponse} from '../../../../entity/advertisement/goodsAdvertisement/retailGoodsAdvertisement/retail-goods-advertisement-response';

@Component({
  selector: 'app-advertisement-manage',
  templateUrl: './advertisement-manage.component.html',
  styleUrls: ['./advertisement-manage.component.scss']
})
export class AdvertisementManageComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.isStatistics = window.location.href.includes('statistics');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.advertisementId = params.advertisementId;
      this.advertisementType = params.advertisementType;
    });
  }

  advertisementId = 0;
  isStatistics = false;
  // @ts-ignore
  advertisementType: 'goods_retail' | 'goods_wholesale';

  ngOnInit(): void {

  }

  navigateToEditing(): void {
    this.router.navigateByUrl('/client/seller/advertisement-manage/updating?advertisementId='
      + this.advertisementId
      // + '&advertisementType='
      // + this.advertisementType
    );
  }

  navigateToStatistics(): void {
    this.router.navigateByUrl('/client/seller/advertisement-manage/statistics?advertisementId='
      + this.advertisementId
      // + '&advertisementType='
      // + this.advertisementType
    );
  }
}
