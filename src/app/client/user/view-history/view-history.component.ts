import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../../../service/account/user/user.service';
import {UserAdvertisementViewsResponse} from '../../../../entity/statistics/advertisement-view/user-advertisement-views-response';
import {PaginationRequest} from '../../../../entity/pagination-request';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})
export class ViewHistoryComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private advertisementService: AdvertisementService) {

  }

  history = new UserAdvertisementViewsResponse();

  pagination = new PaginationRequest();

  ngOnInit(): void {
    this.pagination.size = 10;
    this.pagination.page = 0;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.page !== undefined && params.page > 0) {
        this.pagination.page = +params.page - 1;
      } else {
        window.open('client/user/history?page=1', '_self');
      }
      this.loadData();
    });
  }

  navigateToNewUrl(): void {
    const url = '/client/user/history?page=' + (this.pagination.page + 1);
    window.open(url, '_self');
  }

  loadData(): void {
    this.userService.getUserViews(this.pagination, null, null).subscribe((r) => {
      this.history = r;
      console.log(this.history);
    });
  }

  getImage(image: string | null, sellerId: number): string {
    return this.advertisementService.getAdvertisementImagePath(image, sellerId);
  }

  changePage($event: PaginationRequest): void {
    this.pagination = $event;
    this.navigateToNewUrl();
  }
}
