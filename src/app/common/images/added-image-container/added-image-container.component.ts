import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParametersValuesPriceCountRequest} from '../../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-price-count-request';

@Component({
  selector: 'app-added-image-container',
  templateUrl: './added-image-container.component.html',
  styleUrls: ['./added-image-container.component.scss']
})
export class AddedImageContainerComponent implements OnInit {

  constructor() {
  }

  // @ts-ignore
  @Input() imageSrc: string;
  @Input() size = '100px';
  @Output() clickDeleteBtnClick: EventEmitter<any> = new EventEmitter();


  ngOnInit(): void {
  }

  deleteClick(): void {
    this.clickDeleteBtnClick.emit();
  }
}
