import {Component, Input, OnInit} from '@angular/core';
import {DiscountsForParametersValuesPriceCountResponse} from '../../../../../service/advertisement/discount/discounts-for-parameters-values-price-count-response';

@Component({
  selector: 'app-discounts-view',
  templateUrl: './discounts-view.component.html',
  styleUrls: ['./discounts-view.component.scss']
})
export class DiscountsViewComponent implements OnInit {


  // @ts-ignore
  @Input() param: DiscountsForParametersValuesPriceCountResponse;

  constructor() {
  }

  ngOnInit(): void {
  }

}
