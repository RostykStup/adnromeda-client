import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AdvertisementService} from '../../../../../service/advertisement/advertisement.service';
import {DeliveryService} from '../../../../../service/country/delivery.service';
import {GoodsAdvertisementStatisticsResponse} from '../../../../../entity/statistics/advertisement/GoodsAdvertisementStatisticsResponse';
import {GoodsAdvertisementMonthStatisticsResponse} from '../../../../../entity/statistics/advertisement/goods-advertisement-month-statistics-response';
import {GoodsAdvertisementResponse} from '../../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';
import {StatisticsService} from '../../../../../service/statistics/statistics.service';

@Component({
  selector: 'app-advertisement-statistics',
  templateUrl: './advertisement-statistics.component.html',
  styleUrls: ['./advertisement-statistics.component.scss']
})
export class AdvertisementStatisticsComponent implements OnInit  {

  constructor(private activatedRoute: ActivatedRoute,
              private advertisementService: AdvertisementService,
              private statisticsService: StatisticsService,
              private deliveryService: DeliveryService) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = params.advertisementId;
      this.advertisementService.getGoodsAdvertisementById(this.id).subscribe((r) => {
        this.creationDate = r.creationDate;
      });
      // this.advertisementService.getAdvertisementStatistics(this.id).subscribe((r) => {
      //   this.statistics = r;
      // });
    });
  }

  id = 0;
  month = new Date().getMonth().toString();
  year = new Date().getFullYear().toString();
  creationDate = '';

  // statistics = new GoodsAdvertisementStatisticsResponse();
  advertisement = new GoodsAdvertisementResponse();
  monthStatistics = new GoodsAdvertisementMonthStatisticsResponse();

  ngOnInit(): void {
  }
}
