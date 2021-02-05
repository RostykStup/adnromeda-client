import {CategoryResponse} from '../../category/category-response';
import {PaginationResponse} from '../../pagination-response';
import {GoodsAdvertisementForSearchResponse} from './goods-advertisement-for-search-response';

export class GoodsAdvertisementsForMainPageResponse {
  category = new CategoryResponse();
  responses: any;
}
