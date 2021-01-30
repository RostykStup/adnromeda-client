import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../../service/account/account.service';
import {GoodsSellerService} from '../../../../service/account/seller/goods_seller/goods-seller.service';
import {Router} from '@angular/router';
import {GoodsSellerProfileResponse} from '../../../../entity/account/seller/goods_seller/goods-seller-profile-response';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent implements OnInit {

  constructor(private accountService: AccountService,
              private goodsSellerService: GoodsSellerService,
              private router: Router) {
  }

  profile = new GoodsSellerProfileResponse();

  ngOnInit(): void {
    this.goodsSellerService.getGoodsSellerProfile().subscribe((r) => {
      this.profile = r;
      console.log(r);
      this.openStartLines();
    });

    // setInterval(() => {
    //   console.log('time');
    // }, 1000);
  }

  getAvatar(): string {
    return this.accountService.getAvatarImagePath(this.profile.avatar, this.profile.id);
  }


  openStartLines(): void {
    const titleInput = document.querySelectorAll('.open-line-input');
    titleInput.forEach((t) => {
      // @ts-ignore
      t.checked = true;
    });
  }


}
