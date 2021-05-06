import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GoodsSellerAdvertisementCategoryWithChildrenResponse} from '../../../../../../entity/account/seller/goods_seller/category/elements/goods-seller-advertisement-category-with-children-response';
import {GoodsSellerAdvertisementCategoryResponse} from '../../../../../../entity/account/seller/goods_seller/category/elements/goods-seller-advertisement-category-response';
@Component({
  selector: 'app-goods-seller-category-picker',
  templateUrl: './goods-seller-category-picker.component.html',
  styleUrls: ['./goods-seller-category-picker.component.scss']
})
export class GoodsSellerCategoryPickerComponent implements OnInit {

  // @ts-ignore
  @Input() categories: Array<GoodsSellerAdvertisementCategoryWithChildrenResponse>;
  @Input() hireNumber = 0;
  // @Input() parent = new GoodsSellerAdvertisementCategoryResponse();

  @Output() event: EventEmitter<GoodsSellerAdvertisementCategoryResponse | null> = new EventEmitter();

  chosenCategory: GoodsSellerAdvertisementCategoryWithChildrenResponse | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

  reloadCategories(event: any): void {
    const id = event.target.value;
    this.chosenCategory = null;
    setTimeout(() => {
      this.chosenCategory = this.findCategoryById(id);
      // console.log(this.chosenCategory);
      if (!this.chosenCategory.category.hasChildren) {
        this.event.emit(this.chosenCategory.category);
      } else {
        this.event.emit(null);
      }
    }, 50);
    // console.log(id);

  }

  findCategoryById(id: number): GoodsSellerAdvertisementCategoryWithChildrenResponse {
    let returnCategory = new GoodsSellerAdvertisementCategoryWithChildrenResponse();
    this.categories.forEach((c) => {
      if (c.category.id == id) {
        returnCategory = c;
      }
    });
    return returnCategory;
  }

  categoryEvent($event: GoodsSellerAdvertisementCategoryResponse | null): void {
    this.event.emit($event);
  }
}
