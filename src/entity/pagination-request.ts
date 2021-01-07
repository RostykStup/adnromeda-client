export class PaginationRequest{
  size = 60;
  page = 0;
  field: string | null = null;
  direction: 'ASC' | 'DESC' = 'ASC';
}
