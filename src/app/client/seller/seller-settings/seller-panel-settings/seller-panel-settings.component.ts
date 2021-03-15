import {Component, OnInit} from '@angular/core';
import {GoodsShopMarkupService} from '../../../../../service/account/seller/goods_seller/goods-shop-markup.service';
import {GoodsShopMarkupResponse} from '../../../../../entity/account/seller/goods_seller/markup/goods-shop-markup-response';

@Component({
  selector: 'app-seller-panel-settings',
  templateUrl: './seller-panel-settings.component.html',
  styleUrls: ['./seller-panel-settings.component.scss']
})
export class SellerPanelSettingsComponent implements OnInit {

  constructor(private goodsShopMarkupService: GoodsShopMarkupService) {
  }

  markup: GoodsShopMarkupResponse | null = null;
  sellerId = 0;

  ngOnInit(): void {
    // @ts-ignore
    this.sellerId = +localStorage.getItem('andro_user_id');

    this.goodsShopMarkupService.getMarkupBySellerId(this.sellerId).subscribe((r) => {
      this.markup = r;
    });
  }


}
