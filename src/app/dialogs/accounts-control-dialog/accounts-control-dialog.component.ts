import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AccountService} from '../../../service/account/account.service';
import {UserService} from '../../../service/account/user/user.service';
import {CountryService} from '../../../service/country/country.service';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {NavigationService} from '../../../common/navigation.service';
import {AccountMainData} from '../../../entity/account/account-main-data';
import {ImagesService} from '../../../common/images.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accounts-control-dialog',
  templateUrl: './accounts-control-dialog.component.html',
  styleUrls: ['./accounts-control-dialog.component.scss']
})
export class AccountsControlDialogComponent {

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
              private accountService: AccountService,
              public dialog: MatDialog,
              private router: Router,
              private navigationService: NavigationService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    const numbers = this.accountService.getLoggedAuthNumbers();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < numbers.length; i++) {
      this.accounts.push(accountService.getAccountMainDataByAuthNum(numbers[i]));
    }
    this.currentAccount = accountService.getAccountMainDataByAuthNum(navigationService.getAuthNumFromCurrentRoute());
  }

  currentAccount: AccountMainData;
  accounts = new Array<AccountMainData>();

  getAvatarImage(image: string | null, id: number): string {
    return ImagesService.getAvatarImage(image, id);
  }

  getRoleUkrLabel(userRole: string): string {
    switch (userRole) {
      case 'ROLE_USER':
        return 'Покупець Andromeda';
      case 'ROLE_SELLER':
        return 'Продавець Andromeda';
      case 'ROLE_MODERATOR':
        return 'Модератор Andromeda';
    }
    return 'error';
  }

  clickLogout(): void {
    this.accountService.logOut(this.currentAccount.authNum);
    this.dialogRef.close();
    this.router.navigateByUrl('u');
  }


  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close();
    });
  }

  changeAccount(account: AccountMainData): void {
    if (account.userRole === this.currentAccount.userRole) {
      this.router.navigateByUrl(this.navigationService.createUrlWithAuthParameter(account.authNum));
    } else {
      if (account.userRole === 'ROLE_SELLER') {
        this.router.navigateByUrl('s?' + this.navigationService.getAuthQueryByAccountNum(account.authNum));
      } else if (account.userRole === 'ROLE_USER') {
        this.router.navigateByUrl('u?' + this.navigationService.getAuthQueryByAccountNum(account.authNum));
      }
    }

    this.dialogRef.close();
  }
}
