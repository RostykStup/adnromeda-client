import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GoodsShopMarkupService} from '../../../../../../../../service/account/seller/goods_seller/goods-shop-markup.service';
import {GoodsShopMarkupAdvertisingBannerRequest} from '../../../../../../../../entity/account/seller/goods_seller/markup/elements/goods-shop-markup-advertising-banner-request';

@Component({
  selector: 'app-create-banner-dialog',
  templateUrl: './create-banner-dialog.component.html',
  styleUrls: ['./create-banner-dialog.component.scss']
})
export class CreateBannerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateBannerDialogComponent>,
    private goodsShopMarkupService: GoodsShopMarkupService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.elementId = data.elementId;
  }

  images = new Array<string>();
  elementId = 0;

  handleUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (this.images.length < 10) {
        // @ts-ignore
        this.images.push(reader.result.toString());
      }
      // tslint:disable-next-line:no-unused-expression
      event.target.files.clean;
    };
  }

  uploadImage(): void {
    const element = document.getElementById('image_upload') as HTMLInputElement;
    element.click();
  }

  deleteImage(image: string): void {
    this.images.splice(this.images.indexOf(image), 1);
  }

  createBanner(): void {
    const request = new GoodsShopMarkupAdvertisingBannerRequest();
    request.elementId = this.elementId;
    request.images = this.images;
    this.goodsShopMarkupService.createBanner(request).subscribe(() => {
      window.location.reload();
    })
  }

}
