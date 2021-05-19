import {Component, Input, OnInit} from '@angular/core';
import {GoodsAdvertisementResponse} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';

@Component({
  selector: 'app-advertisement-main-data',
  templateUrl: './advertisement-main-data.component.html',
  styleUrls: ['./advertisement-main-data.component.scss']
})
export class AdvertisementMainDataComponent implements OnInit {

  constructor() { }

  // @ts-ignore
  @Input() advertisement: GoodsAdvertisementResponse;


  ngOnInit(): void {
  }

}
