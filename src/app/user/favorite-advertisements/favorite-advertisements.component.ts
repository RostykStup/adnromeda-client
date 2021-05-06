import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PaginationRequest} from '../../../entity/pagination-request';
import {NotificationService} from '../../../service/notification/notification.service';
import {AdvertisementService} from '../../../service/advertisement/advertisement.service';
import {GoodsAdvertisementResponse} from '../../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

import {UserService} from '../../../service/account/user/user.service';

@Component({
  selector: 'app-favorite-advertisements',
  templateUrl: './favorite-advertisements.component.html',
  styleUrls: ['./favorite-advertisements.component.scss']
})
export class FavoriteAdvertisementsComponent implements OnInit {

  constructor(private advertisementService: AdvertisementService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private userService: UserService) {
  }

  // listMode = 0;
  totalPages = 0;
  totalElems = 0;

  advertisements = new Array<GoodsAdvertisementResponse>();

  pagination = new PaginationRequest();


  ngOnInit(): void {
    this.pagination.page = 0;
    this.pagination.size = 10;

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.page !== undefined && params.page > 0) {
        this.pagination.page = +params.page - 1;
      } else {
        // window.open('client/user/favorites?page=1', '_self');
      }
      this.loadAdvertisements();
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


  getImage(image: string | null, sellerId: number): string {
    return this.advertisementService.getAdvertisementImagePath(image, sellerId);
  }

  loadAdvertisements(): void {
    this.advertisementService.getUserFavoritesAdvertisementsPage(this.pagination).subscribe((r) => {
      this.totalPages = r.totalPages;
      this.advertisements = r.data;
      this.totalElems = r.totalElements;
      console.log(r);
      // this.advertisements = r.data.map((x) => Object.assign(new GoodsAdvertisementResponse(), x));
      // console.log(this.advertisements);
    });
  }

  navigateToNewPage(): void {
    const url = 'client/user/favorites?page='
      + (this.pagination.page + 1);
    // +

    window.open(url, '_self');
  }

  deleteFromFavorites(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: 'Видалити зі збережених?'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data.result) {
        this.advertisementService.deleteFromUserFavorites(id).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

  changePage($event: PaginationRequest): void {
    this.pagination = $event;
    this.navigateToNewPage();
  }
}
