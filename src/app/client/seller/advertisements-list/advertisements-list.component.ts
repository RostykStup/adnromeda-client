import {Component, OnInit} from '@angular/core';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';
import {GoodsOrderResponse} from '../../../../entity/order/goods-order-response';
import {PaginationRequest} from '../../../../entity/pagination-request';
import {UserGoodsOrderDataResponse} from '../../../../entity/order/user-goods-order-data-response';
import {GoodsAdvertisementResponse} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';
import {RetailGoodsAdvertisementResponse} from '../../../../entity/advertisement/goodsAdvertisement/retailGoodsAdvertisement/retail-goods-advertisement-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-advertisements-list',
  templateUrl: './advertisements-list.component.html',
  styleUrls: ['../../../../styles/button.scss', './advertisements-list.component.scss']
})
export class AdvertisementsListComponent implements OnInit {

  constructor(private advertisementService: AdvertisementService,
              private router: Router) {

  }

  pagination = new PaginationRequest();
  listMode = 0;
  totalPages = 0;
  totalElems = 0;

  sellerId = localStorage.getItem('andro_user_id');

  advertisements = new Array<GoodsAdvertisementResponse>();


  ngOnInit(): void {
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


  getAdvertisementPrice(advertisement: GoodsAdvertisementResponse): string {
    // @ts-ignore
    if (advertisement.price.price !== undefined) {
      // @ts-ignore
      return advertisement.price.price + '';
    } else {

      // @ts-ignore
      return advertisement.price.priceUnits[advertisement.price.priceUnits.length - 1].price
        + ' - '
        // @ts-ignore
        + advertisement.price.priceUnits[0].price;
    }
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
