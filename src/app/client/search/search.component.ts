import {Component, OnInit} from '@angular/core';
import {GoodsAdvertisementSearchRequest} from '../../../entity/advertisement/goodsAdvertisement/goods-advertisement-search-request';
import {AdvertisementService} from '../../../service/advertisement/advertisement.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GoodsAdvertisementForSearchResponse} from '../../../entity/advertisement/goodsAdvertisement/goods-advertisement-for-search-response';
import {CurrencyResponse} from '../../../entity/country/currency-response';
import {CurrencyService} from '../../../service/country/currency.service';
import {PaginationRequest} from '../../../entity/pagination-request';
import {AccountService} from '../../../service/account/account.service';
import {InfoDialogComponent} from '../dialogs/info-dialog/info-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../../../styles/input.scss', './search.component.scss']
})
export class SearchComponent implements OnInit {


  constructor(private advertisementService: AdvertisementService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private currencyService: CurrencyService,
              private accountService: AccountService,
              private dialog: MatDialog) {
  }

  searchValue = '';
  searchRequest = new GoodsAdvertisementSearchRequest();

  viewStyle: 'table' | 'rows' = 'table';

  priceDirection: any = null;

  sortType: 'statistics.creationDate' | null | 'statistics.sold' | 'priceToSort' = null;

  advertisements = Array<GoodsAdvertisementForSearchResponse>();

  tableViewAdvertisements = Array<Array<GoodsAdvertisementForSearchResponse>>();

  sortField: any;
  totalPages = 0;
  totalElements = 0;


  ngOnInit(): void {
    this.searchRequest.paginationRequest.direction = 'ASC';
    // this.searchRequest.paginationRequest.size = 5;
    this.searchRequest.paginationRequest.size = 60;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.searchValue = params.value;

      this.searchRequest.title = this.searchValue;
      if (params.page === undefined) {
        this.searchRequest.paginationRequest.page = 0;
      } else {
        this.searchRequest.paginationRequest.page = params.page - 1;
      }

      if (params.sortType !== undefined) {
        if (params.sortType === null) {
          this.searchRequest.paginationRequest.field = null;
          this.sortType = null;
        } else {
          this.searchRequest.paginationRequest.field = params.sortType;
          // @ts-ignore
          this.sortType = this.searchRequest.paginationRequest.field;
        }
      }

      if (params.direction !== undefined) {
        this.searchRequest.paginationRequest.direction = params.direction;
      }

      if (params.image === 'true') {
        this.searchRequest.image = true;
      }

      if (params.rating === 'true') {
        this.searchRequest.rating = true;
      }


      setTimeout(() => {
        this.loadAdvertisements();
      }, 300);
    });
  }


  changeViewStyle(style: 'table' | 'rows'): void {
    this.viewStyle = style;
  }

  makeTableViewAdvertisements(): void {
    this.tableViewAdvertisements = Array<Array<GoodsAdvertisementForSearchResponse>>();
    let rowIndex = -1;
    for (let i = 0; i < this.advertisements.length; i++) {
      if (i % 5 === 0) {
        rowIndex++;
        this.tableViewAdvertisements.push(new Array<GoodsAdvertisementForSearchResponse>());
      }
      this.tableViewAdvertisements[rowIndex].push(this.advertisements[i]);
    }
  }


  getAdvertisementImage(imageName: string | null, sellerId: number): string {
    return this.advertisementService.getAdvertisementImagePath(imageName, sellerId);
  }

  loadAdvertisements(): void {
    this.advertisementService.findAllByFilters(this.searchRequest).subscribe((r) => {
      this.advertisements = r.data;
      this.totalPages = r.totalPages;
      this.totalElements = r.totalElements;
      this.makeTableViewAdvertisements();
      this.advertisements.forEach((a) => {
        if (this.accountService.isLogged()) {
          this.advertisementService.isInUserFavorites(a.id).subscribe((r) => {
            a.isInFavorites = r;
          });
        }
        // a.priceWithUserCurrency = this.generatePriceWithUserCurrency(a);
      });
    });
  }

  makeRequestWithOtherSortType(sort: 'statistics.creationDate' | null | 'statistics.sold' | 'priceToSort', order: 'ASC' | 'DESC'): void {
    this.sortType = sort;
    if (sort === 'priceToSort') {
      this.priceDirection = order;
    } else {
      this.priceDirection = null;
    }
    this.searchRequest.paginationRequest.field = sort;
    this.searchRequest.paginationRequest.direction = order;
    this.makeAndNavigateToOtherSearchRequest();
    // this.loadAdvertisements();
  }

  makeAndNavigateToOtherSearchRequest(): void {
    const url = 'client/search?value=' + this.searchValue
      + '&page=' + (this.searchRequest.paginationRequest.page + 1)
      + (this.searchRequest.paginationRequest.field !== null ? '&sortType=' + this.searchRequest.paginationRequest.field : '')
      + (this.searchRequest.paginationRequest.field !== null ? '&direction=' + this.searchRequest.paginationRequest.direction : '')
      + (this.searchRequest.rating ? '&rating=true' : '')
      + (this.searchRequest.image ? '&image=true' : '');
    console.log(url);
    // this.router.navigateByUrl(url);
    window.open(url, '_self');
    // window.location.reload();
  }

  onlyImageClick($event: any): void {
    this.searchRequest.image = $event.target.checked;
    this.searchRequest.paginationRequest.page = 0;

    this.makeAndNavigateToOtherSearchRequest();
  }

  ratingClick($event: any): void {

    this.searchRequest.rating = $event.target.checked;
    this.searchRequest.paginationRequest.page = 0;
    this.makeAndNavigateToOtherSearchRequest();
  }

  navigateToAdvertisement(id: number): void {
    window.open('client/advertisement-view?id=' + id);
    // this.router.navigateByUrl();
  }

  changePage($event: PaginationRequest): void {
    this.searchRequest.paginationRequest = $event;
    this.makeAndNavigateToOtherSearchRequest();
  }

  clickAddToFavorites(advertisement: GoodsAdvertisementForSearchResponse): void {
    if (advertisement.isInFavorites) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          text: 'Видалити зі збережених?'
        }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data.result) {
          this.advertisementService.deleteFromUserFavorites(advertisement.id).subscribe(() => {
            this.changeAdvertisementIsOnFavorites(advertisement, false);
          });
        }
      });
    } else {
      this.advertisementService.addToUserFavorites(advertisement.id).subscribe(() => {
        const dataValid = {
          text: 'Успішно додано до збережених'
        };

        const dialogRef = this.dialog.open(InfoDialogComponent, {
          data: dataValid
        });
        dialogRef.afterClosed().subscribe(result => {
          this.changeAdvertisementIsOnFavorites(advertisement, true);
        });
      });
    }
  }

  changeAdvertisementIsOnFavorites(advertisement: GoodsAdvertisementForSearchResponse, state: boolean): void {
    this.advertisements[this.advertisements.indexOf(advertisement)].isInFavorites = state;
  }
}
