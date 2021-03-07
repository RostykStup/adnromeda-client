import {Component, Input, OnInit} from '@angular/core';
import {GoodsSellerAdvertisementCategoryWithChildrenResponse} from '../../../../../../../entity/account/seller/goods_seller/category/goods-seller-advertisement-category-with-children-response';
import {GoodsSellerAdvertisementCategoryResponse} from '../../../../../../../entity/account/seller/goods_seller/category/goods-seller-advertisement-category-response';
import {CreateDiscountDialogComponent} from '../../../../../dialogs/create-discount-dialog/create-discount-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CreateGoodsSellerCategoryDialogComponent} from '../../../../../dialogs/create-goods-seller-category-dialog/create-goods-seller-category-dialog.component';

@Component({
  selector: 'app-goods-seller-category-column-view',
  templateUrl: './goods-seller-category-column-view.component.html',
  styleUrls: ['./goods-seller-category-column-view.component.scss']
})
export class GoodsSellerCategoryColumnViewComponent implements OnInit {

  // @ts-ignore
  @Input() categories: Array<GoodsSellerAdvertisementCategoryWithChildrenResponse>;
  @Input() hireNumber = 0;
  @Input() parent = new GoodsSellerAdvertisementCategoryResponse();

  constructor(public dialog: MatDialog) {
  }

  chosenCategory: GoodsSellerAdvertisementCategoryWithChildrenResponse | null = null;

  ngOnInit(): void {
  }

  chooseCategory(category: GoodsSellerAdvertisementCategoryWithChildrenResponse): void {
    this.chosenCategory = null;
    const index = this.categories.indexOf(category);
    setTimeout(() => {
      this.chosenCategory = this.categories[index];
    }, 100);
    // this.chosenCategory
  }

  openCreateCategoryDialog(): void {
    const data = {
      parent: this.parent
    };
    const dialogRef = this.dialog.open(CreateGoodsSellerCategoryDialogComponent, {
      data,
      // maxWidth: '50%'
    });
    dialogRef.afterClosed().subscribe();
  }
}
