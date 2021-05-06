import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PaginationRequest} from '../../../../entity/pagination-request';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../../../../common/navigation.service';

@Component({
  selector: 'app-seller-goods-list-view-title',
  templateUrl: './seller-goods-list-view-title.component.html',
  styleUrls: ['./seller-goods-list-view-title.component.scss']
})
export class SellerGoodsListViewTitleComponent implements OnInit {

  @Output() changePagination: EventEmitter<PaginationRequest> = new EventEmitter();

  constructor(private route: ActivatedRoute, private navigationService: NavigationService) {
  }

  pagination = new PaginationRequest();

  ngOnInit(): void {
    this.pagination = this.navigationService.getPaginationFromCurrentRoute();
  }

  changeDirection(field: string): void {
    if (this.pagination.field === field) {
      if (this.pagination.direction === 'ASC') {
        this.pagination.direction = 'DESC';
      } else {
        this.pagination.direction = 'ASC';
      }
    } else {
      this.pagination.field = field;
      this.pagination.direction = 'DESC';
    }
    this.changePagination.emit(this.pagination);
  }

}
