import {Component, ElementRef, OnInit} from '@angular/core';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OrderService} from '../../../../service/order/order.service';
import {GoodsOrderResponse} from '../../../../entity/order/goods-order-response';
import {GoodsAdvertisementFeedbackRequest} from '../../../../entity/feedback/goods-advertisement-feedback-request';
import {GoodsOrderItemResponse} from '../../../../entity/order/goods-order-item-response';
import {Image} from '../../seller/create-advertisement/create-advertisement.component';
import {GoodsSellerFeedbackRequest} from '../../../../entity/feedback/goods-seller-feedback-request';
import {$e} from 'codelyzer/angular/styles/chars';
import {FeedbackService} from '../../../../service/feedback/feedback.service';
import {InfoDialogComponent} from '../../dialogs/info-dialog/info-dialog.component';

export class FeedbackContainer {
  image = '';
  title = '';
  advertisementId = 0;
  openText = false;
  feedback = new GoodsAdvertisementFeedbackRequest();

  constructor(order: GoodsOrderItemResponse) {
    this.image = order.image;
    this.title = order.title;
    this.advertisementId = order.advertisementId;
    this.feedback.orderItem = order.id;
  }
}

@Component({
  selector: 'app-order-feedback',
  templateUrl: './order-feedback.component.html',
  styleUrls: ['./order-feedback.component.scss']
})
export class OrderFeedbackComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private advertisementService: AdvertisementService,
              private orderService: OrderService,
              public dialog: MatDialog,
              private feedbackService: FeedbackService) {
  }

  order = new GoodsOrderResponse();
  feedbackContainers = new Array<FeedbackContainer>();

  sellerFeedBack = new GoodsSellerFeedbackRequest();

  validationItemsRating = true;
  validationSellerRating = true;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.orderService.getGoodsOrderByIdAndUser(params.orderId).subscribe((r) => {
        this.order = r;
        this.sellerFeedBack.orderId = this.order.id;
        this.order.items.forEach((i) => {
          this.feedbackContainers.push(new FeedbackContainer(i));
        });
      });
    });
  }

  changeRatingValue($event: number, orderItem: number): void {
    this.validationItemsRating = true;
    const index = this.getIndexOfItemInContainer(orderItem);
    this.feedbackContainers[index].openText = true;
    this.feedbackContainers[index].feedback.rating = $event;
  }

  getIndexOfItemInContainer(orderItem: number): number {
    for (let i = 0; i < this.feedbackContainers.length; i++) {
      if (this.feedbackContainers[i].feedback.orderItem === orderItem) {
        return i;
      }
    }
    return -1;
  }

  getImage(image: string | null, sellerId: number): string {
    return this.advertisementService.getAdvertisementImagePath(image, sellerId);
  }

  uploadImage(orderItem: number): void {
    const element = document.getElementById('image_' + orderItem) as HTMLInputElement;
    element.click();
  }

  handleUpload(event: any, orderItem: number): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (this.feedbackContainers[this.getIndexOfItemInContainer(orderItem)].feedback.images.length < 5) {
        if (reader.result !== null) {
          this.feedbackContainers[this.getIndexOfItemInContainer(orderItem)].feedback.images.push(reader.result.toString());
          // tslint:disable-next-line:no-unused-expression
          event.target.files.clean;
        }
      }
    };
  }

  deleteImage(image: string, orderItem: number): void {

    const imageIndex = this.feedbackContainers[this.getIndexOfItemInContainer(orderItem)].feedback.images.indexOf(image);

    if (imageIndex > -1) {
      this.feedbackContainers[this.getIndexOfItemInContainer(orderItem)].feedback.images.splice(imageIndex, 1);
    }
    // const index = this.images.indexOf(image, 0);
    // if (index > -1) {
    //   this.images.splice(index, 1);
    //   this.images.push(new Image());
    // }
  }

  clickFeedbackButton(): void {
    if (this.validateDidRatingIsPicked()) {
    // if (false) {
      let i = 0;
      this.feedbackService.createGoodsSellerFeedback(this.sellerFeedBack).subscribe(() => {

        this.feedbackContainers.forEach((c) => {
          this.feedbackService.createGoodsAdvertisementFeedback(c.feedback).subscribe(() => {
            i++;
            if (i === this.feedbackContainers.length) {
              const dialogRef = this.dialog.open(InfoDialogComponent, {
                data: {text: 'Відгук успішно збережено! Дякуємо що робите Andromeda кращим'}
              });
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigateByUrl('/');
              });
            }
          });
        });
      });
    }
  }

  validateDidRatingIsPicked(): boolean {

    this.feedbackContainers.forEach((c) => {
      if (c.feedback.rating === 0) {
        this.validationItemsRating = false;
      }
    });

    this.validationSellerRating = this.sellerFeedBack.service !== 0 && this.sellerFeedBack.communication !== 0;

    return this.validationItemsRating && this.validationSellerRating;
  }

  changeSellerServiceRating($event: number): void {
    this.sellerFeedBack.service = $event;
  }

  changeSellerCommunicationRating($event: number): void {
    this.sellerFeedBack.communication = $event;
  }
}
