import {Component, OnInit} from '@angular/core';
import {GoodsAdvertisementSearchRequest} from '../../../entity/advertisement/goodsAdvertisement/goods-advertisement-search-request';
import {AdvertisementService} from '../../../service/advertisement/advertisement.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GoodsAdvertisementForSearchResponse} from '../../../entity/advertisement/goodsAdvertisement/goods-advertisement-for-search-response';
import {CurrencyResponse} from '../../../entity/country/currency-response';
import {CurrencyService} from '../../../service/country/currency.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../../../styles/input.scss', './search.component.scss']
})
export class SearchComponent implements OnInit {


  constructor(private advertisementService: AdvertisementService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private currencyService: CurrencyService) {
  }

  searchValue = '';
  searchRequest = new GoodsAdvertisementSearchRequest();

  viewStyle: 'table' | 'rows' = 'table';

  priceDirection: any = null;

  sortType: 'statistics.creationDate' | null | 'statistics.sold' | 'priceToSort' = null;

  advertisements = Array<GoodsAdvertisementForSearchResponse>();

  tableViewAdvertisements = Array<Array<GoodsAdvertisementForSearchResponse>>();

  sortField: any;

  ngOnInit(): void {
    this.searchRequest.paginationRequest.page = 0;
    this.searchRequest.paginationRequest.direction = 'ASC';
    this.searchRequest.paginationRequest.size = 60;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.searchValue = params.value;
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
      this.makeTableViewAdvertisements();
      this.advertisements.forEach((a) => {
        a.priceWithUserCurrency = this.generatePriceWithUserCurrency(a);
      });
    });
  }

  generatePriceWithUserCurrency(advertisement: GoodsAdvertisementForSearchResponse): string {
    let currency = localStorage.getItem('andro_user_currency');
    if (currency === null || currency === '') {
      currency = 'USD';
    }
    if (advertisement.type === 'goods_wholesale') {
      return this.currencyService.exchangeCurrencies('USD', currency, advertisement.priceMin).toFixed(2)
        + ' - '
        + this.currencyService.exchangeCurrencies('USD', currency, advertisement.priceMax).toFixed(2)
        + ' '
        + currency;
    } else if (advertisement.type === 'goods_retail') {
      return this.currencyService.exchangeCurrencies('USD', currency, advertisement.price).toFixed(2)
        + ' '
        + currency;
    }
    return ' - ';
  }

  makeRequestWithOtherSortType(sort: 'statistics.creationDate' | null | 'statistics.sold' | 'priceToSort', order: 'ASC' | 'DESC'): void {
    this.sortType = sort;
    if (sort === 'priceToSort'){
      this.priceDirection = order;
    } else {
      this.priceDirection = null;
    }
    this.searchRequest.paginationRequest.field = sort;
    this.searchRequest.paginationRequest.direction = order;
    this.loadAdvertisements();
  }

  onlyImageClick($event: any): void {
    this.searchRequest.image = $event.target.checked;
    this.loadAdvertisements();
  }

  ratingClick($event: any): void {
    this.searchRequest.rating = $event.target.checked;
    this.loadAdvertisements();
  }
}
