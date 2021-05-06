import {Component, OnInit} from '@angular/core';
import {GlobalConstants} from '../../common/global-constants';
import {NavigationService} from '../../common/navigation.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    const role = GlobalConstants.getUserRole();
    if (role === 'ROLE_SELLER') {
      window.open(NavigationService.getSellerUrl(), '_self');
    }
  }

  openLeftPanel(): void {
  }
}
