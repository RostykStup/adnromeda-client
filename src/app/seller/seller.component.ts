import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {GoodsSellerProfileResponse} from '../../entity/account/seller/goods_seller/goods-seller-profile-response';
import {GoodsSellerService} from '../../service/account/seller/goods_seller/goods-seller.service';
import {ImagesService} from '../../common/images.service';
import {NavigationService} from '../../common/navigation.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {

  constructor(private titleService: Title, private goodsSellerService: GoodsSellerService, private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        // @ts-ignore
        document.getElementById('seller-module-content').scrollTop = 0;
      }
    });
  }

  opened = true;

  // @ts-ignore
  goodsSellerProfile: GoodsSellerProfileResponse;

  ngOnInit(): void {
    this.goodsSellerService.getGoodsSellerProfileData().subscribe((r) => {
      this.goodsSellerProfile = r;
    });
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
