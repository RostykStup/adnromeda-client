export class GoodsShopMarkupAdvertisementRowRequest {
  rowType: 'ROW_POPULAR_ADVERTISEMENTS' | 'ROW_MOST_ORDERED_ADVERTISEMENTS' | 'ROW_NEW_ADVERTISEMENTS' = 'ROW_NEW_ADVERTISEMENTS';
  line = 0;
  position: 1 | 2 | 3 | 4 = 1;
}
