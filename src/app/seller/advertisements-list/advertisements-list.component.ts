import {Component, OnInit} from '@angular/core';
import {AdvertisementService} from '../../../service/advertisement/advertisement.service';
import {GoodsOrderResponse} from '../../../entity/order/goods-order-response';
import {PaginationRequest} from '../../../entity/pagination-request';
import {UserGoodsOrderDataResponse} from '../../../entity/order/user-goods-order-data-response';
import {GoodsAdvertisementResponse} from '../../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';
import {Router} from '@angular/router';
import {GoodsAdvertisementForSearchResponse} from '../../../entity/advertisement/goodsAdvertisement/goods-advertisement-for-search-response';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-advertisements-list',
  templateUrl: './advertisements-list.component.html',
  styleUrls: ['./advertisements-list.component.scss']
})
export class AdvertisementsListComponent implements OnInit {

  constructor(private titleService: Title,
              private advertisementService: AdvertisementService,
              private router: Router) {

  }

  pagination = new PaginationRequest();
  listMode = 0;
  totalPages = 0;
  totalElems = 0;

  sellerId = localStorage.getItem('andro_user_id');

  advertisements = new Array<GoodsAdvertisementForSearchResponse>();


  ngOnInit(): void {
    this.titleService.setTitle('Мої товари - Workshop');
    this.pagination.size = 10;
    this.pagination.page = 0;
    this.pagination.direction = 'DESC';
    this.pagination.field = 'id';
    this.loadAdvertisements();
  }

  getImage(image: string | null, sellerId: number): string {
    return this.advertisementService.getAdvertisementImagePath(image, sellerId);
  }

  loadAdvertisements(): void {
    this.advertisementService.getSellerAdvertisementsPage(this.sellerId, this.pagination).subscribe((r) => {
      this.totalPages = r.totalPages;
      this.advertisements = r.data;
      this.totalElems = r.totalElements;
      // this.advertisements = r.data.map((x) => Object.assign(new GoodsAdvertisementResponse(), x));
      // console.log(this.advertisements);
    });
  }

  loadNewPage($event: PaginationRequest): void {
    this.pagination = $event;
    this.loadAdvertisements();
  }

  navigateToAdvertisementManage(id: any, type: string): void {
    this.router.navigateByUrl('/client/seller/advertisement-manage?advertisementId='
      + id
      // + '&advertisementType='
      // + type
    );
  }

}
