export class DiscountResponse {
  id = 0;
  discountType: 'DISCOUNT_PERCENT' | 'DISCOUNT_NEW_PRICE' = 'DISCOUNT_NEW_PRICE';
  discountValue = 0;
  startDate = '';

  endDate = '';

  goodsAdvertisementId = 0;

  valuesPriceCountId = 0;

  isCurrent = false;

  getPriceByDiscount(price: number): number {
    if (this.discountType === 'DISCOUNT_NEW_PRICE') {
      return this.discountValue;
    } else {
      return Math.round(price * (100.0 - this.discountValue)) / 100.0;
    }
  }
}
