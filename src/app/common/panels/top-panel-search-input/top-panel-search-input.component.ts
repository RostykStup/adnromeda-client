import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationRequest} from '../../../../entity/pagination-request';

@Component({
  selector: 'app-top-panel-search-input',
  templateUrl: './top-panel-search-input.component.html',
  styleUrls: ['./top-panel-search-input.component.scss']
})
export class TopPanelSearchInputComponent implements OnInit {

  constructor() {
  }

  @Input() placeholder = 'Пошук';
  @Output() valueSearch: EventEmitter<string> = new EventEmitter();
  @Input() value = '';

  ngOnInit(): void {
  }

  voidEmitSearchValue(): void {
    this.valueSearch.emit(this.value);
  }

}
