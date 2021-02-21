import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GoodsAdvertisementResponse} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';

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
    });
  }

  advertisementId = 0;
  isStatistics = false;
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
