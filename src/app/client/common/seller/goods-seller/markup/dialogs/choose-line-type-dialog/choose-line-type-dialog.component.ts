import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddressService} from '../../../../../../../../service/address/address.service';
import {GoodsShopMarkupLineRequest} from '../../../../../../../../entity/account/seller/goods_seller/markup/goods-shop-markup-line-request';
import {GoodsShopMarkupService} from '../../../../../../../../service/account/seller/goods_seller/goods-shop-markup.service';

@Component({
  selector: 'app-choose-line-type-dialog',
  templateUrl: './choose-line-type-dialog.component.html',
  styleUrls: ['./choose-line-type-dialog.component.scss']
})
export class ChooseLineTypeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ChooseLineTypeDialogComponent>,
    private goodsShopMarkupService: GoodsShopMarkupService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  createLine(numbers: number[]): void {
    const line = new GoodsShopMarkupLineRequest();
    line.widths = numbers;
    this.goodsShopMarkupService.createLine(line).subscribe(() => {
      window.location.reload();
    });
    console.log(line);
  }
}
