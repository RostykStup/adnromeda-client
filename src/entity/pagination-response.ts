export class PaginationResponse<T> {
  data = new Array<T>();

  totalElements = 0;
  totalPages = 0;
}
