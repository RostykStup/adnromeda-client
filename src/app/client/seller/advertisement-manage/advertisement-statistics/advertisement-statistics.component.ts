import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AdvertisementService} from '../../../../../service/advertisement/advertisement.service';
import {DeliveryService} from '../../../../../service/country/delivery.service';
import {WholesalePriceUnitRequest} from '../../../../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-price-unit-request';
import {GoodsAdvertisementStatisticsResponse} from '../../../../../entity/statistics/advertisement/GoodsAdvertisementStatisticsResponse';
import {GoodsAdvertisementMonthStatisticsResponse} from '../../../../../entity/statistics/advertisement/goods-advertisement-month-statistics-response';

@Component({
  selector: 'app-advertisement-statistics',
  templateUrl: './advertisement-statistics.component.html',
  styleUrls: ['./advertisement-statistics.component.scss']
})
export class AdvertisementStatisticsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private advertisementService: AdvertisementService,
              private deliveryService: DeliveryService) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = params.advertisementId;
      this.advertisementService.getAdvertisementStatistics(this.id).subscribe((r) => {
        this.statistics = r;
        console.log(this.statistics);
        this.loadMothAdvertisementStatistics();
      });
    });
  }

  id = 0;
  month = new Date().getMonth().toString();
  year = new Date().getFullYear().toString();

  statistics = new GoodsAdvertisementStatisticsResponse();
  monthStatistics = new GoodsAdvertisementMonthStatisticsResponse();

  ngOnInit(): void {
  }

  loadMothAdvertisementStatistics(): void {
    this.advertisementService.getAdvertisementMonthStatistics(this.id, this.month, this.year).subscribe((r) => {
      this.monthStatistics = r;
    });
  }

  changeMonthStatistics($event: string): void {
    this.month = $event.substr(0, 2);
    this.year = $event.substr(3,4);

    this.loadMothAdvertisementStatistics();
  }
}
