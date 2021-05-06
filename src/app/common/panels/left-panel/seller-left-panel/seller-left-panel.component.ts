import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-seller-left-panel',
  templateUrl: './seller-left-panel.component.html',
  styleUrls: ['./seller-left-panel.component.scss']
})
export class SellerLeftPanelComponent implements OnInit {

  constructor() {
  }

  opened = true;

  ngOnInit(): void {
  }

  changePanelState(): void {
    setTimeout(() => {
      this.opened = !this.opened;
    }, 100);
  }

}
