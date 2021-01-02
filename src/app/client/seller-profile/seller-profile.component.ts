import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent implements OnInit {

  constructor() {
  }

  tab = 1;

  ngOnInit(): void {
  }

  choseTab(num: number): void {
    this.tab = num;
  }
}
