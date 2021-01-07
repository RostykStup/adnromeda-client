import {PaginationRequest} from '../../pagination-request';

export class GoodsAdvertisementSpecification{
  title: string | null = null;
  fromCountryCode: string | null = null;
  image: string | null = null;
  rating: string | null = null;
  paginationRequest = new PaginationRequest();
}
