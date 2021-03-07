import {GoodsAdvertisementForSearchResponse} from '../../../../../advertisement/goodsAdvertisement/goods-advertisement-for-search-response';

export class GoodsShopMarkupAdvertisementViewResponse {
  id = 0;

  goodsAdvertisement = new GoodsAdvertisementForSearchResponse();

  viewType: 'VIEW_CHOSEN_ADVERTISEMENT' | 'VIEW_POPULAR_ADVERTISEMENT' | 'VIEW_MOST_ORDERED_ADVERTISEMENT' = 'VIEW_CHOSEN_ADVERTISEMENT';

}
