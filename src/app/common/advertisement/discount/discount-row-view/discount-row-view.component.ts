import {Component, Input, OnInit} from '@angular/core';
import {DiscountResponse} from '../../../../../entity/advertisement/goodsAdvertisement/discount/discount-response';
import {DiscountService} from '../../../../../service/advertisement/discount/discount.service';
import {ConfirmDialogComponent} from '../../../../dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ParametersValuesPriceCountResponse} from '../../../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-price-count-response';
import {DiscountsForParametersValuesPriceCountResponse} from '../../../../../service/advertisement/discount/discounts-for-parameters-values-price-count-response';

@Component({
  selector: 'app-discount-row-view',
  templateUrl: './discount-row-view.component.html',
  styleUrls: ['./discount-row-view.component.scss']
})
export class DiscountRowViewComponent implements OnInit {

  // @ts-ignore
  @Input() discount: DiscountResponse;

  // @ts-ignore
  @Input() param: DiscountsForParametersValuesPriceCountResponse;

  constructor(private discountService: DiscountService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  getPriceWithDiscount(discount: DiscountResponse, price: number): string {
    return this.discountService.getPriceByDiscount(discount, price).toFixed(2);
  }

  closeDiscount(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: 'Ви впевнені що хочете завершити дану знижку?'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data.result) {
        this.discountService.closeDiscount(id).subscribe((r) => {
          window.location.reload();
        });
      }
    });
  }

  deleteDiscount(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: 'Ви впевнені що хочете видалити дану знижку?'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data.result) {
        this.discountService.deleteDiscount(id).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

}
