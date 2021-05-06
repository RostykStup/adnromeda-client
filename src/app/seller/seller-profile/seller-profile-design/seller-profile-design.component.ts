import {Component, OnInit} from '@angular/core';
import {GoodsSellerService} from '../../../../service/account/seller/goods_seller/goods-seller.service';
import {GoodsSellerProfileResponse} from '../../../../entity/account/seller/goods_seller/goods-seller-profile-response';
import {ImagesService} from '../../../../common/images.service';
import {AccountService} from '../../../../service/account/account.service';
import {ImageRequest} from '../../../../entity/account/image-request';

@Component({
  selector: 'app-seller-profile-design',
  templateUrl: './seller-profile-design.component.html',
  styleUrls: ['./seller-profile-design.component.scss']
})
export class SellerProfileDesignComponent implements OnInit {

  constructor(private goodsSellerService: GoodsSellerService, private accountService: AccountService) {
    this.goodsSellerService.getGoodsSellerProfileData().subscribe((r) => {
      this.profile = r;
      this.imageToShow = this.getAvatarImage();
      this.bannerToShow = this.getBannerImage();
    });
  }

  // @ts-ignore
  profile: GoodsSellerProfileResponse;

  changingAvatar = false;
  imageToShow = '';

  changingBanner = false;
  bannerToShow = '';

  ngOnInit(): void {
  }

  getAvatarImage(): string {
    return ImagesService.getAvatarImage(this.profile.avatar, this.profile.id);
  }

  getBannerImage(): string {
    return ImagesService.getAvatarImage(this.profile.banner, this.profile.id);
  }

  handleUpload(event: any): void {
    this.changingAvatar = true;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // @ts-ignore
      this.imageToShow = reader.result.toString();
      // tslint:disable-next-line:no-unused-expression
      event.target.value = '';
    };
  }

  handleBannerUpload(event: any): void {
    this.changingBanner = true;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // @ts-ignore
      this.bannerToShow = reader.result.toString();
      // tslint:disable-next-line:no-unused-expression
      event.target.value = '';
    };
  }

  clickChangeAvatar(): void {
    const request = new ImageRequest();
    request.image = this.imageToShow;
    this.accountService.changeAvatar(request).subscribe(() => {
      window.location.reload();
    });
  }

  clickDeleteAvatar(): void {
    const request = new ImageRequest();
    request.image = null;
    this.accountService.changeAvatar(request).subscribe(() => {
      window.location.reload();
    });
  }

  clickCancelAvatar(): void {
    this.imageToShow = this.profile.avatar != null ? this.getAvatarImage() : '';
    this.changingAvatar = false;
  }

  clickChangeBanner(): void {
    const request = new ImageRequest();
    request.image = this.bannerToShow;
    this.goodsSellerService.changeGoodsSellerBanner(request).subscribe(() => {
      window.location.reload();
    });
  }

  clickDeleteBanner(): void {
    const request = new ImageRequest();
    request.image = null;
    this.goodsSellerService.changeGoodsSellerBanner(request).subscribe(() => {
      window.location.reload();
    });
  }

  clickCancelBanner(): void {
    this.bannerToShow = this.profile.banner != null ? this.getBannerImage() : '';
    this.changingBanner = false;
  }
}
