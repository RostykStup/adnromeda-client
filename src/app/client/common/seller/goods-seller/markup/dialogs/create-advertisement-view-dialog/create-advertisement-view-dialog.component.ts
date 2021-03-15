import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {GoodsShopMarkupService} from '../../../../../../../../service/account/seller/goods_seller/goods-shop-markup.service';
import {GoodsShopMarkupAdvertisementViewRequest} from '../../../../../../../../entity/account/seller/goods_seller/markup/elements/goods-shop-markup-advertisement-view-request';
import {ChooseAdvertisementDialogComponent} from '../../../../../../dialogs/choose-advertisement-dialog/choose-advertisement-dialog.component';
import {GoodsAdvertisementForSearchResponse} from '../../../../../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-for-search-response';

@Component({
  selector: 'app-create-advertisement-view-dialog',
  templateUrl: './create-advertisement-view-dialog.component.html',
  styleUrls: ['../../../../../../../../styles/input.scss', './create-advertisement-view-dialog.component.scss']
})
export class CreateAdvertisementViewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateAdvertisementViewDialogComponent>,
    private goodsShopMarkupService: GoodsShopMarkupService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.view.elementId = data.elementId;
  }

  viewTypes = ['VIEW_CHOSEN_ADVERTISEMENT', 'VIEW_POPULAR_ADVERTISEMENT', 'VIEW_MOST_ORDERED_ADVERTISEMENT'];

  view = new GoodsShopMarkupAdvertisementViewRequest();
  chosenAdv = new GoodsAdvertisementForSearchResponse();

  changeCheck(target: any): void {
    this.view.viewType = target.value;
    if (this.view.viewType === 'VIEW_CHOSEN_ADVERTISEMENT') {
      const dialogRef = this.dialog.open(ChooseAdvertisementDialogComponent, {
        data: {},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((r) => {
        this.chosenAdv = r;
        this.view.goodsAdvertisementId = this.chosenAdv.id;
      });
    }
  }

  getTypeName(value: string): string {
    switch (value) {
      case 'VIEW_CHOSEN_ADVERTISEMENT' :
        return 'Товар на вибір';
      case 'VIEW_POPULAR_ADVERTISEMENT' :
        return 'Товар з найбільшою кількістю переглядів';
      case 'VIEW_MOST_ORDERED_ADVERTISEMENT' :
        return 'Товар з найбільшою кількістю замовлень';
    }
    return '';
  }

  changeAdv(): void {
    const dialogRef = this.dialog.open(ChooseAdvertisementDialogComponent, {
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((r) => {
      this.chosenAdv = r;
      this.view.goodsAdvertisementId = this.chosenAdv.id;
    });
  }

  createView(): void {
    this.goodsShopMarkupService.createView(this.view).subscribe(() => {
      window.location.reload();
    });
  }
}
