import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GoodsShopMarkupLineResponse} from '../../../../../../../entity/account/seller/goods_seller/markup/goods-shop-markup-line-response';
import {GoodsSellerAdvertisementCategoryResponse} from '../../../../../../../entity/account/seller/goods_seller/category/elements/goods-seller-advertisement-category-response';
import {ConfirmDialogComponent} from '../../../../../dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {GoodsShopMarkupService} from '../../../../../../../service/account/seller/goods_seller/goods-shop-markup.service';

@Component({
  selector: 'app-goods-shop-markup-line',
  templateUrl: './goods-shop-markup-line.component.html',
  styleUrls: ['./goods-shop-markup-line.component.scss']
})
export class GoodsShopMarkupLineComponent implements OnInit {

  @Input() lineViewType: 'update' | 'view' = 'view';
  @Input() line = new GoodsShopMarkupLineResponse();
  // @ts-ignore
  @Input() max: number;
  @Output() event: EventEmitter<'up' | 'down'> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();


  constructor(public dialog: MatDialog,
              private goodsShopMarkupService: GoodsShopMarkupService) {
  }

  iconSize = 12;

  ngOnInit(): void {
    // console.log(this.line);
  }

  changeLineOrder(change: 'up' | 'down'): void {
    if (change === 'up') {
      this.goodsShopMarkupService.upLine(this.line.id).subscribe(() => {
        window.location.reload();
      });
    } else {
      this.goodsShopMarkupService.downLine(this.line.id).subscribe(() => {
        window.location.reload();
      });
    }
  }

  clickDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: 'Видалити дану панель?'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data.result) {
        this.goodsShopMarkupService.deleteLine(this.line.id).subscribe(() => {
          window.scroll(0, 0);
          window.location.reload();
        });
      }
    });
  }


}
