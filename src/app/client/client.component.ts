import {Component, OnInit} from '@angular/core';
import {AdvertisementService} from '../../service/advertisement/advertisement.service';
import {GoodsAdvertisementSearchRequest} from '../../entity/advertisement/goodsAdvertisement/goods-advertisement-search-request';
import {CurrencyService} from '../../service/country/currency.service';
import {CountryService} from '../../service/country/country.service';
import {PaginationRequest} from '../../entity/pagination-request';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(private advertisementService: AdvertisementService,
              private currencyService: CurrencyService,
              private countryService: CountryService) {
  }

  // searchRequest = new GoodsAdvertisementSearchRequest();

  ngOnInit(): void {
    // this.currencyService.loadExchange();
    // this.searchRequest.fromCountryCode = 'UA';
    // this.searchRequest.image = true;
    // this.searchRequest.title = 'моб';
    // this.searchRequest.paginationRequest.size = 60;
    // this.searchRequest.paginationRequest.field = 'id';
    // this.searchRequest.paginationRequest.direction = 'ASC';
    // this.searchRequest.paginationRequest.page = 0;

    // this.advertisementService.findAllByFilters(this.searchRequest).subscribe((r) => {
    //   console.log(r);
    // });
  }

}
