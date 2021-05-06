import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-seller-feedbacks',
  templateUrl: './seller-feedbacks.component.html',
  styleUrls: ['./seller-feedbacks.component.scss']
})
export class SellerFeedbacksComponent implements OnInit {

  constructor(private titleService: Title,) { }

  ngOnInit(): void {
    this.titleService.setTitle('Відгуки - Workshop');
  }

}
