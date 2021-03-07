export class GoodsShopMarkupAdvertisementViewRequest {
  goodsAdvertisementId = 0;
  viewType: 'VIEW_CHOSEN_ADVERTISEMENT' | 'VIEW_POPULAR_ADVERTISEMENT' | 'VIEW_MOST_ORDERED_ADVERTISEMENT' = 'VIEW_CHOSEN_ADVERTISEMENT';
  line = 0;
  position: 1 | 2 | 3 | 4 = 1;
}
