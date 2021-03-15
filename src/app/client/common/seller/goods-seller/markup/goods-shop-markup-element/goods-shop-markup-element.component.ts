import {Component, Input, OnInit} from '@angular/core';
import {GoodsShopMarkupElementResponse} from '../../../../../../../entity/account/seller/goods_seller/markup/goods-shop-markup-element-response';
import {ChooseLineTypeDialogComponent} from '../dialogs/choose-line-type-dialog/choose-line-type-dialog.component';
import {MatDateFormats} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import {ChooseElementDialogComponent} from '../dialogs/choose-element-dialog/choose-element-dialog.component';
import {CreateBannerDialogComponent} from '../dialogs/create-banner-dialog/create-banner-dialog.component';
import {CreateAdvertisementViewDialogComponent} from '../dialogs/create-advertisement-view-dialog/create-advertisement-view-dialog.component';
import {CreateAdvertisementsRowDialogComponent} from '../dialogs/create-advertisements-row-dialog/create-advertisements-row-dialog.component';
import {ConfirmDialogComponent} from '../../../../../dialogs/confirm-dialog/confirm-dialog.component';
import {GoodsShopMarkupService} from '../../../../../../../service/account/seller/goods_seller/goods-shop-markup.service';

@Component({
  selector: 'app-goods-shop-markup-element',
  templateUrl: './goods-shop-markup-element.component.html',
  styleUrls: ['./goods-shop-markup-element.component.scss']
})
export class GoodsShopMarkupElementComponent implements OnInit {

  @Input() elementViewType: 'update' | 'view' = 'view';
  @Input() element: GoodsShopMarkupElementResponse | null = null;

  constructor(public dialog: MatDialog,
              private goodsShopMarkupService: GoodsShopMarkupService) {
  }

  ngOnInit(): void {

  }

  addElement(): void {
    const dialogRef = this.dialog.open(ChooseElementDialogComponent, {
      data: {
        width: this.element?.width
      }
    });
    dialogRef.afterClosed().subscribe((data) => {
      switch (data) {
        case 'MARKUP_ADVERTISING_BANNER':
          this.openCreateBannerDialog();
          break;
        case 'MARKUP_ADVERTISEMENT_VIEW':
          this.openAdvertisementViewDialog();
          break;
        case 'MARKUP_ADVERTISEMENTS_ROW':
          this.openAdvertisementRowDialog();
          break;
      }
    });
  }

  // CreateAdvertisementViewDialogComponent

  openCreateBannerDialog(): void {
    const dialogRef = this.dialog.open(CreateBannerDialogComponent, {
      data: {
        elementId: this.element?.id
      }
    });
    dialogRef.afterClosed().subscribe(data => {
    });
  }

  openAdvertisementViewDialog(): void {
    const dialogRef = this.dialog.open(CreateAdvertisementViewDialogComponent, {
      data: {
        elementId: this.element?.id
      }
    });
    dialogRef.afterClosed().subscribe();
  }

  openAdvertisementRowDialog(): void {
    const dialogRef = this.dialog.open(CreateAdvertisementsRowDialogComponent, {
      data: {
        elementId: this.element?.id
      }
    });
    dialogRef.afterClosed().subscribe();
  }

  deleteElement(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: 'Видалити цей елемент?'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data.result) {
        // @ts-ignore
        this.goodsShopMarkupService.deleteElement(this.element.id).subscribe(() => {
          window.scroll(0, 0);
          window.location.reload();
        });
      }
    });
  }
}
