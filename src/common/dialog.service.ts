import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {PaginationRequest} from '../entity/pagination-request';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../service/account/account.service';
import {AccountsControlDialogComponent} from '../app/dialogs/accounts-control-dialog/accounts-control-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../app/dialogs/confirm-dialog/confirm-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog,) {
  }

  openConfirmationButton(text: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text
      }
    });
    return dialogRef.afterClosed();
  }

  openAccountDialog(): void {
    const dialogRef = this.dialog.open(AccountsControlDialogComponent, {
      data: null,
      panelClass: 'account-control-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
