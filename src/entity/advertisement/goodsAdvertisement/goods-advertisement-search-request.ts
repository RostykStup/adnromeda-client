import {PaginationRequest} from '../../pagination-request';

export class GoodsAdvertisementSearchRequest {
  title: string | null = null;
  fromCountryCode: string | null = null;
  image = false;
  rating = false;
  paginationRequest = new PaginationRequest();
}
