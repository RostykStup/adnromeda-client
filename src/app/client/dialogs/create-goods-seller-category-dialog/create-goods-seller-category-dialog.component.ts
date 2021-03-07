import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DiscountService} from '../../../../service/advertisement/discount/discount.service';
import {DateService} from '../../../../service/date/date.service';
import {GoodsSellerAdvertisementCategoryWithChildrenResponse} from '../../../../entity/account/seller/goods_seller/category/goods-seller-advertisement-category-with-children-response';
import {GoodsSellerAdvertisementCategoryResponse} from '../../../../entity/account/seller/goods_seller/category/goods-seller-advertisement-category-response';
import {GoodsSellerAdvertisementCategoryRequest} from '../../../../entity/account/seller/goods_seller/category/goods-seller-advertisement-category-request';
import {GoodsSellerService} from '../../../../service/account/seller/goods_seller/goods-seller.service';

@Component({
  selector: 'app-create-goods-seller-category-dialog',
  templateUrl: './create-goods-seller-category-dialog.component.html',
  styleUrls: ['../../../../styles/input.scss', '../../../../styles/button.scss', './create-goods-seller-category-dialog.component.scss']
})
export class CreateGoodsSellerCategoryDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateGoodsSellerCategoryDialogComponent>,
    private goodsSellerService: GoodsSellerService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.parentCategory = data.parent;
    this.category.parentId = this.parentCategory.id;
  }

  parentCategory = new GoodsSellerAdvertisementCategoryResponse();
  category = new GoodsSellerAdvertisementCategoryRequest();

  createCategory(): void {
    this.goodsSellerService.createGoodsSellerCategory(this.category).subscribe(() => {
      window.location.reload();
    });
  }
}
