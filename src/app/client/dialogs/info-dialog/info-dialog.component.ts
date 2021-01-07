import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AccountService} from '../../../../service/account/account.service';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  close(): void {
    this.dialogRef.close();
  }
}
