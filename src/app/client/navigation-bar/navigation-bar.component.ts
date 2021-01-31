import {Component, HostListener, OnInit} from '@angular/core';
import {AccountService} from '../../../service/account/account.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['../../../styles/input.scss', './navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(private accountService: AccountService,
              private router: Router,
              public dialog: MatDialog) {
  }

  profileLink = 'seller-profile';

  isLogged = false;

  isOpenProfileMenu = false;
  userRole : any;

  value = '';

  ngOnInit(): void {
    this.isLogged = this.accountService.isLogged();
    this.userRole = localStorage.getItem('andro_user_role');
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
    window.open('client/search?value=' + this.value + '&page=1', '_self');
    // this.router.navigateByUrl();
  }

  navigateToCart(): void {
    // [routerLink]="'user/cart'"
    this.router.navigateByUrl('client/user/cart');
    // window.open();

  }
}
