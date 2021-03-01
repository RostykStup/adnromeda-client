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
    this.mode = this.getManageType();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.advertisementId = params.advertisementId;
    });
  }

  advertisementId = 0;
  mode = '';

  modes = ['updating', 'statistics', 'discounts'];

  ngOnInit(): void {

  }

  getManageType(): string {
    let mode = this.router.url.replace('/client/seller/advertisement-manage/', '');
    mode = mode.substr(0, mode.indexOf('?'));
    if (this.modes.indexOf(mode) === -1) {
      this.navigateToEditing();
      mode = 'updating';
    }
    return mode;
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

  navigateToDiscounts(): void {
    this.router.navigateByUrl('/client/seller/advertisement-manage/discounts?advertisementId='
      + this.advertisementId
      // + '&advertisementType='
      // + this.advertisementType
    );
  }


}
