import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AccountService} from '../../../../service/account/account.service';
import {InfoDialogComponent} from '../info-dialog/info-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item-added-to-cart-dialog',
  templateUrl: './item-added-to-cart-dialog.component.html',
  styleUrls: ['./item-added-to-cart-dialog.component.scss']
})
export class ItemAddedToCartDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    private accountService: AccountService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  close(): void {
    this.dialogRef.close();
  }

  goToCart(): void {
    this.router.navigateByUrl('client/user/cart').then(r =>
      this.dialogRef.close()
    );
  }
}
