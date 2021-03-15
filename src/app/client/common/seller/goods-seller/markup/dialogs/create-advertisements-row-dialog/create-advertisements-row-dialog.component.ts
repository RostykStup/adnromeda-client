import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {GoodsShopMarkupService} from '../../../../../../../../service/account/seller/goods_seller/goods-shop-markup.service';
import {GoodsShopMarkupAdvertisementRowRequest} from '../../../../../../../../entity/account/seller/goods_seller/markup/elements/goods-shop-markup-advertisement-row-request';
import {ChooseAdvertisementDialogComponent} from '../../../../../../dialogs/choose-advertisement-dialog/choose-advertisement-dialog.component';

@Component({
  selector: 'app-create-advertisements-row-dialog',
  templateUrl: './create-advertisements-row-dialog.component.html',
  styleUrls: ['../../../../../../../../styles/input.scss', './create-advertisements-row-dialog.component.scss']
})
export class CreateAdvertisementsRowDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateAdvertisementsRowDialogComponent>,
    private goodsShopMarkupService: GoodsShopMarkupService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.row.elementId = data.elementId;
  }

  viewTypes = ['ROW_POPULAR_ADVERTISEMENTS', 'ROW_MOST_ORDERED_ADVERTISEMENTS', 'ROW_NEW_ADVERTISEMENTS'];

  row = new GoodsShopMarkupAdvertisementRowRequest();

  getTypeName(value: string): string {
    switch (value) {
      case 'ROW_POPULAR_ADVERTISEMENTS' :
        return 'Популярні товари';
      case 'ROW_MOST_ORDERED_ADVERTISEMENTS' :
        return 'Товари з найбільшою кількістю замовлень';
      case 'ROW_NEW_ADVERTISEMENTS' :
        return 'Нові товари';
    }
    return '';
  }

  ngOnInit(): void {
  }

  changeCheck(target: any): void {
    this.row.rowType = target.value;
  }

  createRow(): void {
    this.goodsShopMarkupService.createRow(this.row).subscribe(() => {
      window.location.reload();
    });
  }

}
