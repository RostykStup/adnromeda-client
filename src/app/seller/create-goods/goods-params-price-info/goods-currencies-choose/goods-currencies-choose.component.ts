import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-goods-currencies-choose',
  templateUrl: './goods-currencies-choose.component.html',
  styleUrls: ['./goods-currencies-choose.component.scss']
})
export class GoodsCurrenciesChooseComponent implements OnInit {

  constructor() {
  }

  @Output() addCurrency: EventEmitter<string> = new EventEmitter();
  @Output() removeCurrency: EventEmitter<string> = new EventEmitter();


  ngOnInit(): void {
  }

  changeCurrencyChoose($event: boolean, currency: string): void {
    if ($event) {
      this.addCurrency.emit(currency);
    } else {
      this.removeCurrency.emit(currency);
    }
  }
}
