import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Validator} from '../../../../common/validator';
import {AccountLoginRequest} from '../../../../entity/account/account-login-request';
import {AccountService} from '../../../../service/account/account.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['../../../../styles/input.scss', './login-dialog.component.scss', '../../../../styles/button.scss']
})
export class LoginDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  accountLoginRequest = new AccountLoginRequest();

  mode = 1;

  confirmationPassword = '';

  passwordInputType = 'password';
  confirmPasswordInputType = 'password';
  passwordInputTypeIcon = 'https://img.icons8.com/material-outlined/24/ffffff/invisible.png';
  confirmPasswordInputTypeIcon = 'https://img.icons8.com/material-outlined/24/ffffff/invisible.png';

  validationEmail = true;
  validationPassword = true;
  validationConfirmPassword = true;
  existAccount = false;
  validationLoginPassword = true;
  validateAuth = true;

  isPasswordEquals(): void {
    this.validationConfirmPassword = Validator.validateEquals(this.accountLoginRequest.password, this.confirmationPassword);
  }

  clickModeButton(num: number): void {
    this.mode = num;
    this.accountLoginRequest = new AccountLoginRequest();
    this.confirmationPassword = '';
    this.validateAuth = true;
    this.validationEmail = true;
    this.validationPassword = true;
    this.validationLoginPassword = true;
  }

  loginButtonClick(): void {
    if (this.validateLogin()) {
      this.accountService.login(this.accountLoginRequest).subscribe((r) => {
        this.accountService.writeAuthenticationToLocalStorage(r);
        this.dialogRef.close();
      }, (error) => {
        if (error.status === 403) {
          this.validateAuth = false;
        }
      });
    }
  }

  accountRegistrationButtonClick(): void {
    if (this.validateData()) {
      this.accountService.registerUser(this.accountLoginRequest).subscribe((r) => {
        this.accountService.writeAuthenticationToLocalStorage(r);
        this.dialogRef.close();
      }, (error) => {
        if (error.status === 403) {
          this.existAccount = true;
        }
      });
    }
  }

  validateData(): boolean {
    this.validationPassword = Validator.validateSizeMinMax(this.accountLoginRequest.password, 6, 20);
    this.validationEmail = Validator.validateEmail(this.accountLoginRequest.login);
    this.validationConfirmPassword = Validator.validateEquals(this.accountLoginRequest.password, this.confirmationPassword);
    return this.validationEmail && this.validationPassword && this.validationConfirmPassword;
  }

  validateLogin(): boolean {
    this.validationLoginPassword = Validator.validateSizeMin(this.accountLoginRequest.password, 1);
    this.validationEmail = Validator.validateEmail(this.accountLoginRequest.login);
    return this.validationLoginPassword && this.validationEmail;
  }


  changePasswordInput(): void {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
      this.passwordInputTypeIcon = 'https://img.icons8.com/material-outlined/24/ffffff/visible--v1.png';
    } else {
      this.passwordInputType = 'password';
      this.passwordInputTypeIcon = 'https://img.icons8.com/material-outlined/24/ffffff/invisible.png';
    }
  }

  changeConfirmPasswordInput(): void {
    if (this.confirmPasswordInputType === 'password') {
      this.confirmPasswordInputType = 'text';
      this.confirmPasswordInputTypeIcon = 'https://img.icons8.com/material-outlined/24/ffffff/visible--v1.png';
    } else {
      this.confirmPasswordInputType = 'password';
      this.confirmPasswordInputTypeIcon = 'https://img.icons8.com/material-outlined/24/ffffff/invisible.png';
    }
  }

  loginRostClick(): void {
    const accountRequest = new AccountLoginRequest();
    accountRequest.password = '12345678';
    accountRequest.login = 'rostyk.stup@gmail.com';
    this.accountService.login(accountRequest).subscribe((r) => {
      this.accountService.writeAuthenticationToLocalStorage(r);
      this.dialogRef.close();
    }, (error) => {
      if (error.status === 403) {
        this.validateAuth = false;
      }
    });
  }
}
