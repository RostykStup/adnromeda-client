import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../service/account/account.service';
import {UserDataResponse} from '../../../entity/account/user/user-data-response';
import {UserService} from '../../../service/account/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private accountService: AccountService,
              private userService: UserService) {
  }

  user = new UserDataResponse();

  ngOnInit(): void {
    // this.loadUser();

    // if (!this.accountService.isLogged()) {
    //   window.open('/client', '_self');
    // }
  }

  getAvatar(): string {
    return this.accountService.getAvatarImagePath(this.user.avatar, this.user.id);
  }

  loadUser(): void {
    this.userService.loadUserData().subscribe((r) => {
      this.user = r;
    });
  }

  logoutButtonClick(): void {
    // this.accountService.logOut();
    // window.open('/client', '_self');
  }
}
