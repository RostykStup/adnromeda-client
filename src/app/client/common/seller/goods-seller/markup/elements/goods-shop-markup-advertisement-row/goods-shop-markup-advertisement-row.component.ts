import {Component, Input, OnInit} from '@angular/core';
import {GoodsShopMarkupElementResponse} from '../../../../../../../../entity/account/seller/goods_seller/markup/goods-shop-markup-element-response';
import {GoodsShopMarkupService} from '../../../../../../../../service/account/seller/goods_seller/goods-shop-markup.service';
import {GoodsShopMarkupAdvertisementRowResponse} from '../../../../../../../../entity/account/seller/goods_seller/markup/elements/goods-shop-markup-advertisement-row-response';

@Component({
  selector: 'app-goods-shop-markup-advertisement-row',
  templateUrl: './goods-shop-markup-advertisement-row.component.html',
  styleUrls: ['./goods-shop-markup-advertisement-row.component.scss']
})
export class GoodsShopMarkupAdvertisementRowComponent implements OnInit {

  @Input() element = new GoodsShopMarkupElementResponse();

  row = new GoodsShopMarkupAdvertisementRowResponse();

  constructor(private goodsShopMarkupService: GoodsShopMarkupService) {

  }

  ngOnInit(): void {
    this.goodsShopMarkupService.getRowByElementId(this.element.id).subscribe((r) => {
      this.row = r;
    });
  }

}
