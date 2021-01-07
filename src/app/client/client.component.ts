import { Component, OnInit } from '@angular/core';
import {AdvertisementService} from '../../service/advertisement/advertisement.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(private advertisementService: AdvertisementService) { }



  ngOnInit(): void {
  }

}
