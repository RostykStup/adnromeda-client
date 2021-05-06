import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-seller-partners',
  templateUrl: './seller-partners.component.html',
  styleUrls: ['./seller-partners.component.scss']
})
export class SellerPartnersComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Торгові партнери - Workshop');
  }

}
