import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DeliveryService} from '../../../../service/country/delivery.service';
import {GoodsAdvertisementForSearchResponse} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-for-search-response';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';

@Component({
  selector: 'app-choose-advertisement-dialog',
  templateUrl: './choose-advertisement-dialog.component.html',
  styleUrls: ['../../../../styles/input.scss', './choose-advertisement-dialog.component.scss']
})
export class ChooseAdvertisementDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ChooseAdvertisementDialogComponent>,
    private advertisementService: AdvertisementService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.advertisementService.findByIdOrTitleContains('', null).subscribe((r) => {
      this.advertisements = r;
      console.log(this.advertisements);
    });
  }

  advertisements = new Array<GoodsAdvertisementForSearchResponse>();
  value = '';

  changeSearchValue(): void {
    this.advertisementService.findByIdOrTitleContains(this.value, null).subscribe((r) => {
      this.advertisements = r;
    });
  }

  chooseAdvertisement(adv: GoodsAdvertisementForSearchResponse): void {
    this.dialogRef.close(adv);
  }
}
