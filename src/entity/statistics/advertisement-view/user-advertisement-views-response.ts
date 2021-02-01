import {UserAdvertisementViewsDateSectionResponse} from './user-advertisement-views-date-section-response';

export class UserAdvertisementViewsResponse{
  totalPages = 0;
  totalElements = 0;

  sections = new Array<UserAdvertisementViewsDateSectionResponse>();
}
