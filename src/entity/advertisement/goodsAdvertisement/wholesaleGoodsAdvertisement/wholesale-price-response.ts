import {WholesalePriceUnitResponse} from './wholesale-price-unit-response';

export class WholesalePriceResponse {
  id = 0;

  // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
  date = '';

  priceUnits = Array<WholesalePriceUnitResponse>();
}
