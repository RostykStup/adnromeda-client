import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../../service/account/account.service';
import {UserService} from '../../../../service/account/user/user.service';
import {UserDataResponse} from '../../../../entity/account/user/user-data-response';
import {UserDataRequest} from '../../../../entity/account/user/user-data-request';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UserSettingsRequest} from '../../../../entity/account/user/user-settings-request';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['../../../../styles/input.scss', '../../../../styles/button.scss', './settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  constructor(private accountService: AccountService,
              private userService: UserService,
              private dialog: MatDialog) {
  }

  user = new UserDataResponse();

  changeUserName = false;
  changeNotificationSettings = false;

  ngOnInit(): void {
    this.loadUser();
  }

  getAvatar(): string {
    return this.accountService.getAvatarImagePath(this.user.avatar, this.user.id);
  }

  loadUser(): void {
    this.userService.loadUserData().subscribe((r) => {
      this.user = r;
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
      const request = new UserDataRequest();
      // @ts-ignore
      request.avatar = reader.result.toString();
      this.userService.changeUserData(request).subscribe(() => {
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
        this.userService.deleteUserAvatar().subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

  clickUserNameChangeButton(): void {
    const usernameInput = document.getElementById('username-input') as HTMLInputElement;
    if (usernameInput.disabled) {
      this.changeUserName = true;
      usernameInput.disabled = false;
    } else {

      const request = new UserDataRequest();
      request.username = usernameInput.value;

      this.userService.changeUserData(request).subscribe(() => {
        window.location.reload();
      });

      this.changeUserName = false;
      usernameInput.disabled = true;
    }
  }

  clickChangeNotificationSettings(): void {
    if (this.changeNotificationSettings) {
      const request = new UserSettingsRequest();
      request.getSendOrdersNotifications = this.user.settings.getSendOrdersNotifications;
      this.userService.changeUserSettings(request).subscribe(() => {
        window.location.reload();
      });
    }
    this.changeNotificationSettings = !this.changeNotificationSettings;
  }

  sendOrderClick($event: any): void{
    this.user.settings.getSendOrdersNotifications = $event.target.checked;
  }
}
