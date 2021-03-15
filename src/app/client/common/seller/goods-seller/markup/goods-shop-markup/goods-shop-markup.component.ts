import {Component, Input, OnInit} from '@angular/core';
import {GoodsShopMarkupService} from '../../../../../../../service/account/seller/goods_seller/goods-shop-markup.service';
import {GoodsShopMarkupResponse} from '../../../../../../../entity/account/seller/goods_seller/markup/goods-shop-markup-response';
import {GoodsShopMarkupLineResponse} from '../../../../../../../entity/account/seller/goods_seller/markup/goods-shop-markup-line-response';
import {ConfirmDialogComponent} from '../../../../../dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ChooseLineTypeDialogComponent} from '../dialogs/choose-line-type-dialog/choose-line-type-dialog.component';

@Component({
  selector: 'app-goods-shop-markup',
  templateUrl: './goods-shop-markup.component.html',
  styleUrls: ['./goods-shop-markup.component.scss']
})
export class GoodsShopMarkupComponent implements OnInit {

  @Input() markup = new GoodsShopMarkupResponse();

  @Input() markupViewType: 'update' | 'view' = 'view';

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.markup.lines.sort((l) => l.order);
    this.sortLines();
  }

  changeLineOrder(event: 'up' | 'down', line: GoodsShopMarkupLineResponse): void {
    const index = this.markup.lines.indexOf(line);
    let test;
    if (event === 'up') {
      this.markup.lines[index].order = this.markup.lines[index].order - 1;
      this.markup.lines[index - 1].order = this.markup.lines[index - 1].order + 1;
    } else {
      this.markup.lines[index].order = this.markup.lines[index].order + 1;
      this.markup.lines[index + 1].order = this.markup.lines[index + 1].order - 1;
    }
    this.sortLines();
  }

  sortLines(): void {
    this.markup.lines.sort(((a, b) => (a.order > b.order) ? 1 : (a.order === b.order) ? ((a.order > b.order) ? 1 : -1) : -1));
  }

  deleteLine(line: GoodsShopMarkupLineResponse): void {
    const index = this.markup.lines.indexOf(line);
    for (let i = index; i < this.markup.lines.length; i++) {
      this.markup.lines[i].order = this.markup.lines[i].order - 1;
    }
    this.markup.lines.splice(index, 1);
  }

  addLineDialogOpen(): void {
    const dialogRef = this.dialog.open(ChooseLineTypeDialogComponent, {
      data: null
    });
    dialogRef.afterClosed().subscribe();
  }
}
