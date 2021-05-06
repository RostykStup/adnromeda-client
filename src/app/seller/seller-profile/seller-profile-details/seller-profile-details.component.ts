import {Component, OnInit} from '@angular/core';
import {GoodsSellerService} from '../../../../service/account/seller/goods_seller/goods-seller.service';
import {GoodsSellerMainDataRequest} from '../../../../entity/account/seller/goods_seller/goods-seller-main-data-request';
import {GoodsSellerProfileResponse} from '../../../../entity/account/seller/goods_seller/goods-seller-profile-response';

@Component({
  selector: 'app-seller-profile-details',
  templateUrl: './seller-profile-details.component.html',
  styleUrls: ['./seller-profile-details.component.scss']
})
export class SellerProfileDetailsComponent implements OnInit {

  constructor(private goodsSellerService: GoodsSellerService) {
    this.goodsSellerService.getGoodsSellerProfileData().subscribe((r) => {
      this.profile = r;
      this.request.description = r.description;
      this.request.shopName = r.name;
    });
  }

  // @ts-ignore
  profile: GoodsSellerProfileResponse;

  request = new GoodsSellerMainDataRequest();
  update = false;

  ngOnInit(): void {
  }

  clickUpdateNameDescription(): void {
    this.update = true;
  }

  clickCancelNameDescription(): void {
    this.update = false;
    this.request.description = this.profile.description;
    this.request.shopName = this.profile.name;
  }

  clickChangeNameDescription(): void {
    this.goodsSellerService.updateGoodsSellerMainData(this.request).subscribe(() => {
      window.location.reload();
    });
  }
}
