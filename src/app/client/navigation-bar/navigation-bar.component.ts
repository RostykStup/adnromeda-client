import {Component, HostListener, OnInit} from '@angular/core';
import {AccountService} from '../../../service/account/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {NotificationService} from '../../../service/notification/notification.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['../../../styles/input.scss', './navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(private accountService: AccountService,
              private router: Router,
              public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) {
  }

  profileLink = 'seller-profile';

  isLogged = false;

  newNotificationsCount = '';

  isOpenProfileMenu = false;
  userRole: any;

  value = '';

  ngOnInit(): void {
    this.makeNewNotificationsCountRequest();
    this.isLogged = this.accountService.isLogged();
    this.userRole = localStorage.getItem('andro_user_role');
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.value === undefined || params.value === '') {
        // window.open('/client', '_self');
      } else {
        this.value = params.value;
      }
    });


    // setInterval(() => {
    //   this.makeNewNotificationsCountRequest();
    // }, 1000);
  }

  openProfileMenu(): void {
    this.isOpenProfileMenu = !this.isOpenProfileMenu;
  }

  logOut(): void {
    this.isOpenProfileMenu = !this.isOpenProfileMenu;
    this.accountService.logOut();
    this.isLogged = this.accountService.isLogged();
    this.router.navigateByUrl('/').then(r => {
      window.location.reload();
    });
  }

  makeNewNotificationsCountRequest(): void {
    if (this.accountService.isLogged()) {
      this.notificationService.getNotificationsCount().subscribe((r) => {
        if (r > 99) {
          this.newNotificationsCount = '99+';
        } else if (r === 0) {
          this.newNotificationsCount = '';
        } else {
          this.newNotificationsCount = r.toString();
        }
      });
    }

  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => { //дії пілся закриття вікна
      // this.reloadTable();
      this.isLogged = this.accountService.isLogged();
      this.userRole = localStorage.getItem('andro_user_role');
    });
  }

  makeSearch(): void {
    this.value = this.value.trim();
    // if (this.value.length > 0) {
    window.open('client/search?value=' + this.value + '&page=1', '_self');
    // }
    // this.router.navigateByUrl();
  }

  navigateToCart(): void {
    // [routerLink]="'user/cart'"
    this.router.navigateByUrl('client/user/cart');
    // window.open();

  }

  navigateToNotifications(): void {
    // [routerLink]="'user/cart'"
    if (localStorage.getItem('andro_user_role') === 'ROLE_USER') {
      window.open('client/user/notifications', '_self');
    } else {
      window.open('client/seller/notifications', '_self');
    }
    // window.open();

  }
}
