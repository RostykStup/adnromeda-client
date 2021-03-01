import {DiscountResponse} from './discount-response';

export class CheckDiscountCreatingResponse {
  canCreate = false;
  conflictDiscount = new DiscountResponse();
}
