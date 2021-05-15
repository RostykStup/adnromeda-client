import {PaginationRequest} from '../../pagination-request';

export class GoodsAdvertisementSearchRequest {
  title: string | null = null;
  fromCountryCode: string | null = null;
  image = false;
  rating = false;
  pagination = new PaginationRequest();

  currency = 'USD';
}
