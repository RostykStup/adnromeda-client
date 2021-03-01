export class DiscountRequest {
  discountType: 'DISCOUNT_PERCENT' | 'DISCOUNT_NEW_PRICE' = 'DISCOUNT_NEW_PRICE';
  discountValue = 0;

  startDate = '';

  endDate = '';

  forAllParameters = false;

  goodsAdvertisementId = 0;

  valuesPriceCountId = 0;


  constructor() {
    this.startDate = this.getToday();
  }

  private getToday(): string {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      // @ts-ignore
      dd = '0' + dd;
    }
    if (mm < 10) {
      // @ts-ignore
      mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
  }
}
