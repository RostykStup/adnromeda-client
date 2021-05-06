import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AdvertisementService} from '../../../service/advertisement/advertisement.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationService} from '../../../common/navigation.service';
import {GoodsAdvertisementResponse} from '../../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';
import {PaginationRequest} from '../../../entity/pagination-request';
import {GoodsAdvertisementForSearchResponse} from '../../../entity/advertisement/goodsAdvertisement/goods-advertisement-for-search-response';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss']
})
export class GoodsListComponent implements OnInit {

  constructor(private titleService: Title,
              private advertisementService: AdvertisementService,
              private route: ActivatedRoute,
              private router: Router,
              private navigationService: NavigationService) {

  }

  advertisements = new Array<GoodsAdvertisementForSearchResponse>();
  pagination = new PaginationRequest();
  totalPages = 0;
  totalElements = 0;

  sellerId = localStorage.getItem('andro_user_id');

  ngOnInit(): void {
    this.titleService.setTitle('Мої товари - Andromeda Workshop');
    this.pagination = this.navigationService.getPaginationFromCurrentRoute();
    if (this.route.snapshot.queryParamMap.get('page') == null) {
      this.pagination.page = 0;
      this.pagination.field = 'title';
      this.pagination.size = 15;
      this.pagination.direction = 'ASC';
      this.navigateNew();
    } else {
      this.loadAdvertisements();
    }
  }

  navigateNew(): void {
    this.router.navigateByUrl(
      NavigationService.getSellerGoodsListUrl() + '?'
      + NavigationService.convertPaginationRequestToParamsQuery(this.pagination)
    ).then(() => {
      this.loadAdvertisements();
    });
  }

  loadAdvertisements(): void {
    this.advertisementService.getSellerAdvertisementsPage(null, this.pagination).subscribe((r) => {
      this.advertisements = r.data;
      this.totalPages = r.totalPages;
      this.totalElements = r.totalElements;
    });
  }

  changePagination(pagination: PaginationRequest): void {
    this.pagination = pagination;
    this.navigateNew();
  }

}
