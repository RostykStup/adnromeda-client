import {PaginationRequest} from '../../pagination-request';

export class GoodsAdvertisementSearchRequest {
  title: string | null = null;
  fromCountryCode: string | null = null;
  image: boolean | null = null;
  rating: string | null = null;
  paginationRequest = new PaginationRequest();
}
