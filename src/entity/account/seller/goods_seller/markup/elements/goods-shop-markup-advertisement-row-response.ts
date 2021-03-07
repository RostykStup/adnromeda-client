import {GoodsAdvertisementForSearchResponse} from '../../../../../advertisement/goodsAdvertisement/goods-advertisement-for-search-response';

export class GoodsShopMarkupAdvertisementRowResponse {
  id = 0;

  rowType: 'ROW_POPULAR_ADVERTISEMENTS' | 'ROW_MOST_ORDERED_ADVERTISEMENTS' | 'ROW_NEW_ADVERTISEMENTS' = 'ROW_NEW_ADVERTISEMENTS';

  advertisements = new Array<GoodsAdvertisementForSearchResponse>();
}
