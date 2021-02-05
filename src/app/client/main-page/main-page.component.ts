import {Component, OnInit} from '@angular/core';
import {AdvertisementService} from '../../../service/advertisement/advertisement.service';
import {PaginationRequest} from '../../../entity/pagination-request';
import {GoodsAdvertisementsForMainPageResponse} from '../../../entity/advertisement/goodsAdvertisement/goods-advertisements-for-main-page-response';
import {CategoryResponse} from '../../../entity/category/category-response';
import {CategoryService} from '../../../service/category/category.service';
import {GoodsAdvertisementForSearchResponse}
  from '../../../entity/advertisement/goodsAdvertisement/goods-advertisement-for-search-response';
import {CurrencyService} from '../../../service/country/currency.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private advertisementService: AdvertisementService,
              private categoryService: CategoryService,
              private currencyService: CurrencyService) {
  }


  mainPage = new GoodsAdvertisementsForMainPageResponse();
  categories = new Array<CategoryResponse>();

  ngOnInit(): void {
    const pagination = new PaginationRequest();
    pagination.size = 10;
    pagination.page = 0;
    this.advertisementService.getMainPageAdvertisements(pagination).subscribe((r) => {
      this.mainPage = r;
      console.log(r);
      this.categoryService.getAll().subscribe((res) => {
        this.categories = res;
      });

      // @ts-ignore
      this.mainPage.responses.data.forEach((a) => {
        a.priceWithUserCurrency = this.generatePriceWithUserCurrency(a);
      });
    });
  }

  getAdvertisementImage(imageName: string | null, sellerId: number): string {
    return this.advertisementService.getAdvertisementImagePath(imageName, sellerId);
  }

  navigateToAdvertisement(id: number): void {
    window.open('client/advertisement-view?id=' + id);
    // this.router.navigateByUrl();
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

}
