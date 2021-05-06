import {Component, Input, OnInit} from '@angular/core';
import {GoodsAdvertisementRequest} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-request';

@Component({
  selector: 'app-goods-main-info',
  templateUrl: './goods-main-info.component.html',
  styleUrls: ['./goods-main-info.component.scss']
})
export class GoodsMainInfoComponent implements OnInit {

  @Input() advertisement = new GoodsAdvertisementRequest();

  constructor() {
  }

  ngOnInit(): void {
  }

}
