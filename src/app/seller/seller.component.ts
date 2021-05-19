import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {GoodsSellerProfileResponse} from '../../entity/account/seller/goods_seller/goods-seller-profile-response';
import {GoodsSellerService} from '../../service/account/seller/goods_seller/goods-seller.service';
import {ImagesService} from '../../common/images.service';
import {NavigationService} from '../../common/navigation.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {AccountService} from '../../service/account/account.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {

  constructor(private titleService: Title,
              private goodsSellerService: GoodsSellerService,
              private router: Router,
              private accountService: AccountService,
              private navigationService: NavigationService,
              private route: ActivatedRoute) {

  }

  // @ts-ignore
  authNum: number | null = null;
  // @ts-ignore
  currentUrl: string;
  opened = true;

  // @ts-ignore
  goodsSellerProfile: GoodsSellerProfileResponse;

  ngOnInit(): void {
    this.controlAuthProcedure();
    if (this.controlNavigation() === 'ROLE_SELLER') {
      this.goodsSellerService.getGoodsSellerProfileData().subscribe((r) => {
        this.goodsSellerProfile = r;
      });
      this.router.events.forEach((e) => {
        if (e instanceof NavigationStart) {
          if (document.getElementById('seller-module-content') != null) {
            // @ts-ignore
            document.getElementById('seller-module-content').scrollTop = 0;
          }
        }
        if (e instanceof NavigationEnd) {
          this.controlAuthProcedure();
          this.currentUrl = e.url;
        }
      });
    }
    this.currentUrl = this.router.url;
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
    if (account.userRole === 'ROLE_USER') {
      this.router.navigateByUrl('u' + '?' + this.navigationService.getAuthQueryByAccountNum(account.authNum));
    }
    return account.userRole;
  }

  changeLeftPanel(): void {
    setTimeout(() => {
      this.opened = !this.opened;
    }, 250);
  }

  getAvatarImage(): string {
    return ImagesService.getAvatarImage(this.goodsSellerProfile.avatar, this.goodsSellerProfile.id);
  }

  getSellerUrl(): string {
    return NavigationService.getSellerUrl();
  }

}
