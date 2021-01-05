export class WholesalePriceUnitRequest {
  min: number | any = '';
  max: number | any = '';
  price: number | any = '';

  isValidPrice = true;

  isValidSides = true;

  isValidWithOthers = true;

  isDigit = true;

  isValid(): boolean {
    return this.isValidSides && this.isValidPrice && this.isValidWithOthers;
  }

  getTwoDigitPrice(): string {
    return Number(this.price).toFixed(2);
  }
}
