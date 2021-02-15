import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Validator} from '../../../../common/validator';
import {AccountLoginRequest} from '../../../../entity/account/account-login-request';
import {AccountService} from '../../../../service/account/account.service';
import {AuthenticationResponse} from '../../../../entity/account/authentication-response';
import {UserService} from '../../../../service/account/user/user.service';
import {CountryService} from '../../../../service/country/country.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['../../../../styles/input.scss', './login-dialog.component.scss', '../../../../styles/button.scss']
})
export class LoginDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private accountService: AccountService,
    private userService: UserService,
    private countryService: CountryService,
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
        if (r.userRole === 'ROLE_USER') {
          this.loadUserData();
        }
        this.dialogRef.close();
        window.location.reload();
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
    this.accountLoginRequest.login = 'rostyk.stup@gmail.com';
    this.accountLoginRequest.password = '12345678';
    this.loginButtonClick();
  }

  loginUserClick(): void {
    this.accountLoginRequest.login = 'rostyk.stup@gmail.coms';
    this.accountLoginRequest.password = '12345678';
    this.loginButtonClick();
  }

  loadUserData(): void {
    this.userService.loadUserData().subscribe((data) => {
      this.countryService.getRestCountryByCountryCodeInObservable(data.settings.countryCode).subscribe((country) => {
        localStorage.setItem('andro_user_country', country.name);
        localStorage.setItem('andro_user_country_code', country.alpha2Code);
        localStorage.setItem('andro_user_currency', data.settings.currency.code);
        window.location.reload();
      });
    });
  }
}
