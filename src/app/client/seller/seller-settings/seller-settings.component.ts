import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../../service/account/account.service';
import {UserService} from '../../../../service/account/user/user.service';
import {MatDialog} from '@angular/material/dialog';
import {UserDataResponse} from '../../../../entity/account/user/user-data-response';
import {UserDataRequest} from '../../../../entity/account/user/user-data-request';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {UserSettingsRequest} from '../../../../entity/account/user/user-settings-request';
import {GoodsSellerService} from '../../../../service/account/seller/goods_seller/goods-seller.service';
import {GoodsSellerDataResponse} from '../../../../entity/account/seller/goods_seller/goods-seller-data-response';
import {GoodsSellerDataRequest} from '../../../../entity/account/seller/goods_seller/goods-seller-data-request';

@Component({
  selector: 'app-seller-settings',
  templateUrl: './seller-settings.component.html',
  styleUrls: ['../../../../styles/button.scss', '../../../../styles/input.scss', './seller-settings.component.scss']
})
export class SellerSettingsComponent implements OnInit {

  constructor(private accountService: AccountService,
              private goodsSellerService: GoodsSellerService,
              private dialog: MatDialog) {
  }

  seller = new GoodsSellerDataResponse();

  changeUserName = false;

  changeNotificationSettings = false;

  ngOnInit(): void {
    this.loadUser();
  }

  getAvatar(): string {
    return this.accountService.getAvatarImagePath(this.seller.avatar, this.seller.id);
  }

  loadUser(): void {
    this.goodsSellerService.loadSellerData().subscribe((r) => {
      this.seller = r;
    });
  }

  clickChangeAvatarButton(): void {
    const imageInput = document.getElementById('avatar-input') as HTMLInputElement;
    imageInput.click();
  }

  handleUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const request = new GoodsSellerDataRequest();
      // @ts-ignore
      request.avatar = reader.result.toString();
      this.goodsSellerService.updateGoodsSellerData(request).subscribe(() => {
        window.location.reload();
      });
      // event.target.files.clean;
    };
    // this.advertisement.images.push(reader.result.toString());
  }

  clickDeleteAvatarButton(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: 'Видалити аватар?'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data.result) {
        // this.userService.deleteUserAvatar().subscribe(() => {
        //   window.location.reload();
        // });
      }
    });
  }

  clickUserNameChangeButton(): void {
    const usernameInput = document.getElementById('username-input') as HTMLInputElement;
    if (usernameInput.disabled) {
      this.changeUserName = true;
      usernameInput.disabled = false;
    } else {

      const request = new GoodsSellerDataRequest();
      request.shopName = usernameInput.value;

      this.goodsSellerService.updateGoodsSellerData(request).subscribe(() => {
        window.location.reload();
      });

      this.changeUserName = false;
      usernameInput.disabled = true;
    }
  }

  clickChangeNotificationSettings(): void {
    if (this.changeNotificationSettings) {
      const request = new GoodsSellerDataRequest();
      request.sendNewOrderNotifications = this.seller.settings.sendNewOrderNotifications;
      request.sendOrderReceivedNotifications = this.seller.settings.sendOrderReceivedNotifications;
      this.goodsSellerService.updateGoodsSellerData(request).subscribe(() => {
        window.location.reload();
      });
    }
    this.changeNotificationSettings = !this.changeNotificationSettings;
  }

  sendOrderClick($event: any): void {
    this.seller.settings.sendNewOrderNotifications = $event.target.checked;
  }

  sendReceivedClick($event: any) {
    this.seller.settings.sendOrderReceivedNotifications = $event.target.checked;
  }
}
