import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationService} from '../../../../../common/navigation.service';
import {AccountsControlDialogComponent} from '../../../../dialogs/accounts-control-dialog/accounts-control-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-seller-top-panel',
  templateUrl: './seller-top-panel.component.html',
  styleUrls: ['./seller-top-panel.component.scss']
})
export class SellerTopPanelComponent implements OnInit {

  @Output() changeLeftPanel: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  clickChangePanelState(): void {
    this.changeLeftPanel.emit();
  }

  getSellerUrl(): string {
    return NavigationService.getSellerUrl();
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
