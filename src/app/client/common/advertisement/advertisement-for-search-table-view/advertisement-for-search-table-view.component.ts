import {Component, Input, OnInit} from '@angular/core';
import {GoodsAdvertisementForSearchResponse} from '../../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-for-search-response';
import {AdvertisementService} from '../../../../../service/advertisement/advertisement.service';

@Component({
  selector: 'app-advertisement-for-search-table-view',
  templateUrl: './advertisement-for-search-table-view.component.html',
  styleUrls: ['./advertisement-for-search-table-view.component.scss']
})
export class AdvertisementForSearchTableViewComponent implements OnInit {

  // @ts-ignore
  @Input() goodsAdvertisement: GoodsAdvertisementForSearchResponse;
  @Input() viewType: 'own' | 'seller-view' | 'searching' = 'searching';

  constructor(private advertisementService: AdvertisementService) {

  }

  ngOnInit(): void {
  }

  getAdvertisementImage(): string {
    // console.log(this.goodsAdvertisement.image);
    // console.log(this.advertisementService.getAdvertisementImagePath(this.goodsAdvertisement.image, this.goodsAdvertisement.sellerId));
    return this.advertisementService.getAdvertisementImagePath(this.goodsAdvertisement.image, this.goodsAdvertisement.sellerId);
  }

  navigateToManage(): void {
    window.open('/client/seller/advertisement-manage?advertisementId='
      + this.goodsAdvertisement.id,
      '_self'
      // + '&advertisementType='
      // + type
    );
  }

}
