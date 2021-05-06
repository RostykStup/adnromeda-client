import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationRequest} from '../../../../entity/pagination-request';

@Component({
  selector: 'app-arrow-paginator',
  templateUrl: './arrow-paginator.component.html',
  styleUrls: ['./arrow-paginator.component.scss']
})
export class ArrowPaginatorComponent implements OnInit {

  constructor() {
  }

  @Output() pageChange: EventEmitter<PaginationRequest> = new EventEmitter();

  // @ts-ignore
  @Input() pagination: PaginationRequest;
  // @ts-ignore
  @Input() totalPages: number;
  // @ts-ignore
  @Input() totalElements: number;

  @Input() sizes = [15, 30, 50];

  ngOnInit(): void {
  }

  getPagesCountLabel(): string {
    return (+(this.pagination.page * this.pagination.size) + 1) + ' - '
      + (((this.pagination.page + 1) * this.pagination.size) > this.totalElements ? this.totalElements : ((this.pagination.page + 1) * this.pagination.size))
      + ' із ' + this.totalElements;
  }

  navigateToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pagination.page = page;
      this.pageChange.emit(this.pagination);
    }
  }

  changePageSize(event: any): void {
    this.pagination.size = event.target.value;
    this.pagination.page = 0;
    this.pageChange.emit(this.pagination);
  }
}
