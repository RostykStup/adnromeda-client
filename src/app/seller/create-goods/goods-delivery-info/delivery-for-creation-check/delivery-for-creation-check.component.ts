import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {DeliveryTypeResponse} from '../../../../../entity/country/delivery-type-response';
import {AndromedaCheckboxComponent} from '../../../../common/components/andromeda-checkbox/andromeda-checkbox.component';

@Component({
  selector: 'app-delivery-for-creation-check',
  templateUrl: './delivery-for-creation-check.component.html',
  styleUrls: ['./delivery-for-creation-check.component.scss']
})
export class DeliveryForCreationCheckComponent implements OnInit {

  constructor() {
  }

  // @ts-ignore
  @ViewChildren(AndromedaCheckboxComponent) checkbox: QueryList<AndromedaCheckboxComponent>;
  @Output() changeState: EventEmitter<boolean> = new EventEmitter();


  // @ts-ignore
  @Input() delivery: DeliveryTypeResponse;
  statement = false;

  ngOnInit(): void {
  }

  changeDeliveryCheckedStatement($event: boolean): void {
    this.statement = $event;
    this.changeState.emit(this.statement);
  }

  changeDeliveryStatement(state: boolean): void {
    this.statement = state;
    this.checkbox.first.statement = (state ? 'check' : 'uncheck');
  }
}
