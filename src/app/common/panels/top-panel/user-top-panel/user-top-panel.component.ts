import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountService} from '../../../../../service/account/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '../../../../../service/notification/notification.service';
import {LoginDialogComponent} from '../../../../dialogs/login-dialog/login-dialog.component';
import {PaginationRequest} from '../../../../../entity/pagination-request';
import {NavigationService} from '../../../../../common/navigation.service';
import {AccountsControlDialogComponent} from '../../../../dialogs/accounts-control-dialog/accounts-control-dialog.component';

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
              private navigationService: NavigationService,
              private notificationService: NotificationService) {
  }

  profileLink = 'seller-profile';

  isLogged = false;

  newNotificationsCount = '';

  userRole: any;

  value = '';

  ngOnInit(): void {
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

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openAccountDialog(): void {
    const dialogRef = this.dialog.open(AccountsControlDialogComponent, {
      data: null,
      panelClass: 'account-control-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openLeftPanelClick(): void {
    this.openLeftPanel.emit();
  }

  clickAccountButton(): void {
    if (this.accountService.isLogged()) {
      this.openAccountDialog();
    } else {
      this.openLoginDialog();
    }
  }

  searchValue($event: string): void {
    this.router.navigateByUrl('u/search?value=' + $event + '&page=0');
  }
}
