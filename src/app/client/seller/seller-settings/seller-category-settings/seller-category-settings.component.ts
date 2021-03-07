import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../../../service/account/account.service';
import {GoodsSellerService} from '../../../../../service/account/seller/goods_seller/goods-seller.service';
import {MatDialog} from '@angular/material/dialog';
import {getSortHeaderNotContainedWithinSortError} from '@angular/material/sort/sort-errors';
import {GoodsSellerAdvertisementCategoryWithChildrenResponse} from '../../../../../entity/account/seller/goods_seller/category/elements/goods-seller-advertisement-category-with-children-response';
import {CreateDiscountDialogComponent} from '../../../dialogs/create-discount-dialog/create-discount-dialog.component';
import {GoodsSellerAdvertisementCategoryResponse} from '../../../../../entity/account/seller/goods_seller/category/elements/goods-seller-advertisement-category-response';

@Component({
  selector: 'app-seller-category-settings',
  templateUrl: './seller-category-settings.component.html',
  styleUrls: ['../../../../../styles/button.scss', './seller-category-settings.component.scss']
})
export class SellerCategorySettingsComponent implements OnInit {

  constructor(private accountService: AccountService,
              private goodsSellerService: GoodsSellerService,
              private dialog: MatDialog) {
  }

  categoriesTree = new Array<GoodsSellerAdvertisementCategoryWithChildrenResponse>();

  chosenCategory: GoodsSellerAdvertisementCategoryResponse | null = null;

  ngOnInit(): void {
    let sellerId;
    if (localStorage.getItem('andro_user_id') === null) {
      sellerId = 0;
    } else {
      // @ts-ignore
      sellerId = +localStorage.getItem('andro_user_id');
    }
    this.goodsSellerService.getSellerCategoriesTree(sellerId).subscribe((r) => {
      this.categoriesTree = r;
    });
  }


  chooseCategoryToEdit($event: GoodsSellerAdvertisementCategoryResponse | null): void {
    this.chosenCategory = $event;
  }
}
