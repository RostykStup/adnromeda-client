import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ParametersValuesPriceCountResponse} from '../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-price-count-response';
import {DiscountRequest} from '../../../entity/advertisement/goodsAdvertisement/discount/discount-request';
import {DiscountResponse} from '../../../entity/advertisement/goodsAdvertisement/discount/discount-response';
import {DiscountService} from '../../../service/advertisement/discount/discount.service';
import {Validator} from '../../../common/validator';
import {DateService} from '../../../service/date/date.service';
import {InfoDialogComponent} from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-create-discount-dialog',
  templateUrl: './create-discount-dialog.component.html',
  styleUrls: ['./create-discount-dialog.component.scss']
})
export class CreateDiscountDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateDiscountDialogComponent>,
    private discountService: DiscountService,
    private dateService: DateService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(data);
    this.today = this.discountRequest.startDate;
  }

  discountRequest = new DiscountRequest();

  // @ts-ignore
  chosenParameter: ParametersValuesPriceCountResponse;

  validationPrice = true;
  validationPercents = true;
  validationCorrect = true;
  today = '';
  withEndDate = false;

  getPriceWithDiscount(discount: DiscountRequest, price: number): string {
    return this.discountService.getPriceByDiscountRequest(discount, price).toFixed(2);
  }

  inputDiscountValue($event: any): void {
    const price = $event.target.value;
    this.validationCorrect = Validator.validateNumberForPrice(price);
    if (this.validationCorrect) {
      this.discountRequest.discountValue = Number(price);
    } else {
      this.discountRequest.discountValue = 0;
    }
    this.validateForValues();
  }

  validateForValues(): void {
    // this.validationCorrect = Validator.validateNumberForPrice(this.discountRequest.discountValue);
    if (this.discountRequest.discountType === 'DISCOUNT_NEW_PRICE') {
      this.validationPercents = true;
      this.validationPrice = this.discountRequest.discountValue < this.chosenParameter.price;
    } else if (this.discountRequest.discountType === 'DISCOUNT_PERCENT') {
      this.validationPrice = true;
      this.validationPercents = this.discountRequest.discountValue < 100;
    }
  }

  validateAll(): boolean {
    this.validationCorrect = Validator.validateNumberForPrice(this.discountRequest.discountValue);
    this.validateForValues();
    return this.validationPrice && this.validationPercents && this.validationCorrect;
  }

  changeType(): void {
    this.validateForValues();
  }

  changeParamValue($event: ParametersValuesPriceCountResponse): void {
    this.chosenParameter = $event;
    this.validateForValues();
    this.discountRequest.valuesPriceCountId = this.chosenParameter.id;
    // console.log(this.chosenParameter);
  }

  getMinEndDate(): string {
    const date = new Date(this.discountRequest.startDate);
    return this.dateService.getDateString(date);
  }


  changeStartDate($event: any): void {
    // console.log($event.target.value);
    const startDate = new Date(this.discountRequest.startDate);
    const endDate = new Date(this.discountRequest.endDate);
    if (endDate <= startDate) {
      endDate.setDate(startDate.getDate());
      this.discountRequest.endDate = this.dateService.getDateString(endDate);
    }
  }


  changeWithEndDate($event: any): void {
    this.withEndDate = !$event.target.checked;
  }


  createDiscount(): void {
    if (this.validateAll()) {
      if (!this.withEndDate) {
        this.discountRequest.endDate = '';
      }
      this.discountService.checkCanCreateDiscount(this.discountRequest).subscribe((r) => {
        if (r.canCreate) {
          this.discountService.createDiscount(this.discountRequest).subscribe(() => {
            window.location.reload();
          });
        } else {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            data: {
              text: 'Немоєжливо створити знижку через конфлікти з датами'
            }
          });
          dialogRef.afterClosed().subscribe();
        }
      });
    }
  }
}
