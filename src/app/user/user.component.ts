import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../common/navigation.service';
import {AccountService} from '../../service/account/account.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private accountService: AccountService,
              private navigationService: NavigationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  // @ts-ignore
  authNum: number | null = null;
  // @ts-ignore
  currentUrl: string;

  routerSubscribe = this.router.events.subscribe((e) => {
    if (e instanceof NavigationEnd) {
      this.controlAuthProcedure();
      this.currentUrl = e.url;
      if (document.getElementById('user-module-body') != null) {
        // @ts-ignore
        document.getElementById('user-module-body').scrollTop = 0;
      }
    }
  });

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.controlAuthProcedure();

  }

  isAuthNumInQuery(): boolean {
    return this.route.snapshot.queryParamMap.has('auth');
  }

  controlAuthProcedure(): void {
    if (this.accountService.isLogged()) {
      if (this.isAuthNumInQuery()) {
        this.authNum = this.navigationService.getAuthNumFromCurrentRoute();
        if (!this.accountService.isLoggedByAuthNum(this.authNum)) {
          this.router.navigateByUrl(this.navigationService.createUrlWithAuthParameter(this.accountService.getAuthNumForEmptyParam()));
        }
        if (this.accountService.getAccountMainDataByAuthNum(this.authNum).userRole === 'ROLE_SELLER') {
          // console.log('this is seller');
          this.routerSubscribe.unsubscribe();
          this.router.navigateByUrl('s?' + this.navigationService.getAuthQueryByAccountNum(this.authNum));
        }
      } else {
        if (this.authNum === null) {
          this.authNum = this.accountService.getAuthNumForEmptyParam();
        }
        // this.router.navigateByUrl(this.navigationService.addAuthParamToUrl(this.authNum));
        this.router.navigateByUrl(this.navigationService.createUrlWithAuthParameter(this.authNum));
      }
    }
  }

  controlNavigation(): string {
    const account = this.accountService.getAccountMainDataByAuthNum(this.navigationService.getAuthNumFromCurrentRoute());
    if (account.userRole === 'ROLE_SELLER') {
      this.router.navigateByUrl('s' + '?' + this.navigationService.getAuthQueryByAccountNum(account.authNum));
    }
    return account.userRole;
  }


}
