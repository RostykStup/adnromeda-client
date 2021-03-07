import {GoodsSellerAdvertisementCategoryResponse} from './goods-seller-advertisement-category-response';

export class GoodsSellerAdvertisementCategoryWithChildrenResponse {
  category = new GoodsSellerAdvertisementCategoryResponse();
  children = new Array<GoodsSellerAdvertisementCategoryWithChildrenResponse>();
}
