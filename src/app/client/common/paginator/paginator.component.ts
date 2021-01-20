import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationRequest} from '../../../../entity/pagination-request';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() pagination = new PaginationRequest();
  @Input() totalPages = 2;

  @Output() pageChange: EventEmitter<PaginationRequest> = new EventEmitter();

  constructor() {

  }


  ngOnInit(): void {
    // console.log('paginator - ' + this.totalPages);
  }

  counter(): Array<any> {
    const array = [];

    if (this.totalPages <= 10) {
      for (let i = 0; i < this.totalPages; i++) {
        array[i] = i;
      }
      return array;
    }
    array[0] = 0;
    array[1] = -1;
    if (this.pagination.page >= 3 && (this.pagination.page + 5 < this.totalPages - 2)) {

      let page = this.pagination.page - 1;
      for (let i = 2; i < 9; i++) {
        array[i] = page;
        page++;
      }
      array[9] = -1;
      array[10] = this.totalPages - 1;

    } else if (this.pagination.page >= 3) {

      let page = this.totalPages - 8;
      for (let i = 2; i <= 9; i++) {
        array[i] = page;
        page++;
      }

    } else if ((this.pagination.page + 5 < this.totalPages - 2)) {
      // let page = this.pagination.page;
      for (let i = 0; i < 8; i++) {
        array[i] = i;
      }
      array[8] = -1;
      array[9] = this.totalPages - 1;
    }

    return array;
  }


  pageButtonClick(page: number): void {
    this.pagination.page = page;
    this.pageChange.emit(this.pagination);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  plusButtonClick(): void {
    this.pagination.page = this.pagination.page + 1;
    this.pageChange.emit(this.pagination);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  minusButtonClick(): void {
    this.pagination.page = this.pagination.page - 1;
    this.pageChange.emit(this.pagination);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
