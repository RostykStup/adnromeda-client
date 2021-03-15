export class GoodsShopMarkupAdvertisementViewRequest {
  goodsAdvertisementId = 0;
  viewType: 'VIEW_CHOSEN_ADVERTISEMENT' | 'VIEW_POPULAR_ADVERTISEMENT' | 'VIEW_MOST_ORDERED_ADVERTISEMENT' = 'VIEW_POPULAR_ADVERTISEMENT';
  elementId = 0;
}
