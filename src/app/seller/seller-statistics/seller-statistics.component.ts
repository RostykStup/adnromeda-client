import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AdvertisementService} from '../../../service/advertisement/advertisement.service';
import {DeliveryService} from '../../../service/country/delivery.service';
import {GoodsAdvertisementStatisticsResponse} from '../../../entity/statistics/advertisement/GoodsAdvertisementStatisticsResponse';
import {GoodsAdvertisementMonthStatisticsResponse} from '../../../entity/statistics/advertisement/goods-advertisement-month-statistics-response';
import {GoodsSellerService} from '../../../service/account/seller/goods_seller/goods-seller.service';
import {GoodsSellerStatisticsResponse} from '../../../entity/statistics/account/seller/goods-seller-statistics-response';
import {GoodsSellerMonthStatisticsResponse} from '../../../entity/statistics/account/seller/goods-seller-month-statistics-response';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-seller-statistics',
  templateUrl: './seller-statistics.component.html',
  styleUrls: ['./seller-statistics.component.scss']
})
export class SellerStatisticsComponent implements OnInit {

  constructor(private titleService: Title, private goodsSellerService: GoodsSellerService) {
    this.goodsSellerService.getGoodsSellerStatistics().subscribe((r) => {
      this.statistics = r;
      this.loadMothSellerStatistics();
    });

  }

  month = new Date().getMonth().toString();
  year = new Date().getFullYear().toString();

  statistics = new GoodsSellerStatisticsResponse();
  monthStatistics = new GoodsSellerMonthStatisticsResponse();

  ngOnInit(): void {
    this.titleService.setTitle('Аналітика магазину - Workshop');
  }

  loadMothSellerStatistics(): void {

    this.goodsSellerService.getGoodsSellerMonthStatistics(this.month, this.year).subscribe((r) => {
      this.monthStatistics = r;
    });
  }

  changeMonthStatistics($event: string): void {
    this.month = $event.substr(0, 2);
    this.year = $event.substr(3, 4);

    this.loadMothSellerStatistics();
  }

}
