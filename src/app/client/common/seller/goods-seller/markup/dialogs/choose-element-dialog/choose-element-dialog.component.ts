import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GoodsShopMarkupService} from '../../../../../../../../service/account/seller/goods_seller/goods-shop-markup.service';

@Component({
  selector: 'app-choose-element-dialog',
  templateUrl: './choose-element-dialog.component.html',
  styleUrls: ['./choose-element-dialog.component.scss']
})
export class ChooseElementDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ChooseElementDialogComponent>,
    private goodsShopMarkupService: GoodsShopMarkupService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.width = data.width;
    this.onOpenActions();
  }

  width = 1;

  onOpenActions(): void {
    if (this.width === 1) {
      this.dialogRef.close('MARKUP_ADVERTISEMENT_VIEW');
    } else if (this.width === 2) {
      this.dialogRef.close('MARKUP_ADVERTISING_BANNER');
    } else if (this.width === 4) {
      this.dialogRef.close('MARKUP_ADVERTISEMENTS_ROW');
    }
  }

}
