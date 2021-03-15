import {Component, Input, OnInit} from '@angular/core';
import {GoodsShopMarkupElementResponse} from '../../../../../../../../entity/account/seller/goods_seller/markup/goods-shop-markup-element-response';
import {GoodsShopMarkupService} from '../../../../../../../../service/account/seller/goods_seller/goods-shop-markup.service';
import {GoodsShopMarkupAdvertisingBannerResponse} from '../../../../../../../../entity/account/seller/goods_seller/markup/elements/goods-shop-markup-advertising-banner-response';

@Component({
  selector: 'app-goods-shop-markup-advertising-banner',
  templateUrl: './goods-shop-markup-advertising-banner.component.html',
  styleUrls: ['./goods-shop-markup-advertising-banner.component.scss']
})
export class GoodsShopMarkupAdvertisingBannerComponent implements OnInit {

  @Input() element = new GoodsShopMarkupElementResponse();


  constructor(private goodsShopMarkupService: GoodsShopMarkupService) {

  }

  banner = new GoodsShopMarkupAdvertisingBannerResponse();

  ngOnInit(): void {
    this.goodsShopMarkupService.getBannerByElementId(this.element.id).subscribe((r) => {
      this.banner = r;
    });
  }

  getImagePath(image: string): string {
    return this.goodsShopMarkupService.getBannerImagePath(image, this.element.sellerId);
  }

}



