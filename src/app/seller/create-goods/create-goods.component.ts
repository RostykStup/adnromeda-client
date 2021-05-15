import {Component, OnInit} from '@angular/core';
import {GoodsAdvertisementRequest} from '../../../entity/advertisement/goodsAdvertisement/goods-advertisement-request';
import {$e} from 'codelyzer/angular/styles/chars';
import {Title} from '@angular/platform-browser';
import {AdvertisementService} from '../../../service/advertisement/advertisement.service';

@Component({
  selector: 'app-create-goods',
  templateUrl: './create-goods.component.html',
  styleUrls: ['./create-goods.component.scss']
})
export class CreateGoodsComponent implements OnInit {

  constructor(private  titleService: Title, private advertisementService: AdvertisementService) {
  }

  step = 0

  advertisement = new GoodsAdvertisementRequest();

  ngOnInit(): void {
    this.titleService.setTitle('Створення товару - Andromeda Workshop');
  }


  endStep($event: GoodsAdvertisementRequest): void {
    this.advertisement = $event;
    this.step++;
  }

  createAdvertisement(advertisement: GoodsAdvertisementRequest): void {
    this.advertisementService.sendGoodsAdvertisementCreateRequest(advertisement).subscribe(() => {
      this.step++;
    });
  }
}
