import {Component, Input, OnInit} from '@angular/core';
import {GoodsAdvertisementForSearchResponse} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-for-search-response';
import {ImagesService} from '../../../../common/images.service';

@Component({
  selector: 'app-seller-goods-list-view',
  templateUrl: './seller-goods-list-view.component.html',
  styleUrls: ['./seller-goods-list-view.component.scss']
})
export class SellerGoodsListViewComponent implements OnInit {

  constructor() {
  }

  // @ts-ignore
  @Input() advertisement: GoodsAdvertisementForSearchResponse;

  ngOnInit(): void {
  }

  getImage(): string {
    return ImagesService.getAdvertisementImage(this.advertisement.sellerId, this.advertisement.image);
  }

}
