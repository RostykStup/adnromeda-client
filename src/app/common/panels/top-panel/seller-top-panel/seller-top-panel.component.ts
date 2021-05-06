import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationService} from '../../../../../common/navigation.service';

@Component({
  selector: 'app-seller-top-panel',
  templateUrl: './seller-top-panel.component.html',
  styleUrls: ['./seller-top-panel.component.scss']
})
export class SellerTopPanelComponent implements OnInit {

  @Output() changeLeftPanel: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  clickChangePanelState(): void {
    this.changeLeftPanel.emit();
  }

  getSellerUrl(): string {
    return NavigationService.getSellerUrl();
  }
}
