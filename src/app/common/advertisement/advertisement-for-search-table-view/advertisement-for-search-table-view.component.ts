import {Component, Input, OnInit} from '@angular/core';
import {GoodsAdvertisementForSearchResponse} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-for-search-response';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';
import {NavigationService} from '../../../../common/navigation.service';
import {AccountService} from '../../../../service/account/account.service';

@Component({
  selector: 'app-advertisement-for-search-table-view',
  templateUrl: './advertisement-for-search-table-view.component.html',
  styleUrls: ['./advertisement-for-search-table-view.component.scss']
})
export class AdvertisementForSearchTableViewComponent implements OnInit {

  // @ts-ignore
  @Input() goodsAdvertisement: GoodsAdvertisementForSearchResponse;
  @Input() viewType: 'own' | 'seller-view' | 'searching' = 'searching';
  @Input() width = '220px';
  @Input() height = '320px';

  constructor(private advertisementService: AdvertisementService,
              private accountService: AccountService,
              private navigationService: NavigationService) {

  }

  ngOnInit(): void {
  }

  getAdvertisementImage(): string {
    return this.advertisementService.getAdvertisementImagePath(this.goodsAdvertisement.image, this.goodsAdvertisement.sellerId);
  }

  getAdvertisementViewUrl(): string {
    return NavigationService.getUserUrl()
      + 'goods-view?id='
      + this.goodsAdvertisement.id
      + ('&' + this.navigationService.getAuthQueryFromRoute());
  }

}
