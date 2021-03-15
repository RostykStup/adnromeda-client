import {Component, Input, OnInit} from '@angular/core';
import {GoodsShopMarkupElementResponse} from '../../../../../../../../entity/account/seller/goods_seller/markup/goods-shop-markup-element-response';
import {GoodsShopMarkupService} from '../../../../../../../../service/account/seller/goods_seller/goods-shop-markup.service';
import {GoodsAdvertisementResponse} from '../../../../../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';
import {GoodsShopMarkupAdvertisementViewResponse} from '../../../../../../../../entity/account/seller/goods_seller/markup/elements/goods-shop-markup-advertisement-view-response';

@Component({
  selector: 'app-goods-shop-markup-advertisement-view',
  templateUrl: './goods-shop-markup-advertisement-view.component.html',
  styleUrls: ['./goods-shop-markup-advertisement-view.component.scss']
})
export class GoodsShopMarkupAdvertisementViewComponent implements OnInit {

  @Input() element = new GoodsShopMarkupElementResponse();
  view: GoodsShopMarkupAdvertisementViewResponse | null = null;

  constructor(private goodsShopMarkupService: GoodsShopMarkupService) {
  }

  ngOnInit(): void {
    this.goodsShopMarkupService.getViewByElementId(this.element.id).subscribe((r) => {
      this.view = r;
    });
  }

}
