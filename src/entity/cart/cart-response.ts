import {CartSellerPositionResponse} from './cart-seller-position-response';

export class CartResponse{
  allItems = 0;
  positions = new Array<CartSellerPositionResponse>();
}
