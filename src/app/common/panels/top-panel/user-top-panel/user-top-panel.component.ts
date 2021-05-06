import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountService} from '../../../../../service/account/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '../../../../../service/notification/notification.service';
import {LoginDialogComponent} from '../../../../dialogs/login-dialog/login-dialog.component';
import {PaginationRequest} from '../../../../../entity/pagination-request';

@Component({
  selector: 'app-user-top-panel',
  templateUrl: './user-top-panel.component.html',
  styleUrls: ['./user-top-panel.component.scss']
})
export class UserTopPanelComponent implements OnInit {

  @Output() openLeftPanel: EventEmitter<any> = new EventEmitter();

  constructor(private accountService: AccountService,
              private router: Router,
              public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) {
  }

  profileLink = 'seller-profile';

  isLogged = false;

  newNotificationsCount = '';

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
  }


  logOut(): void {
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

    dialogRef.afterClosed().subscribe(result => { // дії пілся закриття вікна
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

  openLeftPanelClick(): void {
    this.openLeftPanel.emit();
  }

  clickAccountButton(): void {
    if (this.accountService.isLogged()) {

    } else {
      this.openLoginDialog();
    }
  }
}
