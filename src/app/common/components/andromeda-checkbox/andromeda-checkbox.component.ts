import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GoodsAdvertisementRequest} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-request';

@Component({
  selector: 'app-andromeda-checkbox',
  templateUrl: './andromeda-checkbox.component.html',
  styleUrls: ['./andromeda-checkbox.component.scss']
})
export class AndromedaCheckboxComponent implements OnInit {

  constructor() {
  }

  @Input() text = '';
  @Input() statement: 'check' | 'uncheck' | 'indeterminate' = 'uncheck';

  @Output() changeState: EventEmitter<boolean> = new EventEmitter();
  @Input() available = true;

  ngOnInit(): void {
  }

  changeStatement(): void {
    if (!this.available) {
      return;
    }
    switch (this.statement) {
      case 'check':
        this.statement = 'uncheck';
        break;
      case 'uncheck':
        this.statement = 'check';
        break;
      case 'indeterminate':
        this.statement = 'check';
        break;
    }
    this.emitChange();
  }

  emitChange(): void {
    this.changeState.emit(this.statement === 'check');
  }
}
