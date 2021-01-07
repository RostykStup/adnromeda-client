import {Component, OnInit} from '@angular/core';
import {IpService} from '../../../service/country/ip.service';
import {CountryService} from '../../../service/country/country.service';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements OnInit {

  constructor(private ipService: IpService, private countryService: CountryService) {
  }

  userRole: string | null = '';

  isOpened = false;

  ngOnInit(): void {
    this.userRole = localStorage.getItem('andro_user_role');
    this.ipService.getCountryCodeByIp().subscribe((r) => {
      console.log(r.country_code);
    });
    console.log('haha');
  }

  open(): void {
    this.userRole = localStorage.getItem('andro_user_role');
    this.isOpened = !this.isOpened;
  }

  close(): void {
    this.isOpened = false;
  }
}
