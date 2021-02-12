import {Component, OnInit} from '@angular/core';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CurrencyService} from '../../../../service/country/currency.service';
import {GoodsAdvertisementStatisticsResponse} from '../../../../entity/statistics/advertisement/GoodsAdvertisementStatisticsResponse';
import {CountryService} from '../../../../service/country/country.service';
import {DeliveryService} from '../../../../service/country/delivery.service';
import {DeliveryTypeResponse} from '../../../../entity/country/delivery-type-response';
import {ChooseDeliveryDialogComponent} from '../../dialogs/choose-delivery-dialog/choose-delivery-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {RestCountry} from '../../../../entity/country/rest-country';
import {PaginationRequest} from '../../../../entity/pagination-request';
import {FeedbackService} from '../../../../service/feedback/feedback.service';
import {PaginationResponse} from '../../../../entity/pagination-response';
import {GoodsAdvertisementFeedbackResponse} from '../../../../entity/feedback/goods-advertisement-feedback-response';
import {CartService} from '../../../../service/cart/cart.service';
import {ItemAddedToCartDialogComponent} from '../../dialogs/item-added-to-cart-dialog/item-added-to-cart-dialog.component';
import {AccountService} from '../../../../service/account/account.service';
import {LoginDialogComponent} from '../../navigation-bar/login-dialog/login-dialog.component';
import {ImageDialogComponent} from '../../dialogs/image-dialog/image-dialog.component';
import {GoodsAdvertisementResponse} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';

@Component({
  selector: 'app-advertisement-view',
  templateUrl: './advertisement-view.component.html',
  styleUrls: ['./advertisement-view.component.scss']
})
export class AdvertisementViewComponent implements OnInit {

  constructor(private advertisementService: AdvertisementService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private currencyService: CurrencyService,
              public countryService: CountryService,
              private deliveryService: DeliveryService,
              public dialog: MatDialog,
              private feedbackService: FeedbackService,
              private cartService: CartService,
              private accountService: AccountService) {

  }

  advertisement = new GoodsAdvertisementResponse();
  // @ts-ignore
  statics: GoodsAdvertisementStatisticsResponse;

  userCurrency = '';
  deliveries = new Array<DeliveryTypeResponse>();
  currentDelivery = new DeliveryTypeResponse();
  userCountry = new RestCountry();

  feedbackPagination = new PaginationRequest();

  feedbacks = new PaginationResponse<GoodsAdvertisementFeedbackResponse>();
  feedbacksList = new Array<GoodsAdvertisementFeedbackResponse>();

  pickerCount = 1;

  viewImage = '';
  imagesForCarousel = new Array<string>();

  addInfoMode: 1 | 2 = 1;

  ngOnInit(): void {
    this.feedbackPagination.page = 0;
    this.feedbackPagination.size = 10;
    this.feedbackPagination.field = 'id';
    this.feedbackPagination.direction = 'DESC';

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.advertisementService.setAdvertisementView(params.id).subscribe();
      // this.advertisementService.getSellerGoodsAdvertisementById(params.id).subscribe((r) => {
      //   this.advertisement = r;
      //
      //
      //   this.viewImage = this.advertisement.mainImage;
      //   this.advertisementService.getAdvertisementStatistics(this.advertisement.id).subscribe((s) => {
      //     this.statics = s;
      //   });
      //   this.deliverySetup();
      //   this.imagesForCarousel.push(this.advertisement.mainImage);
      //   this.advertisement.images.forEach((i) => {
      //     this.imagesForCarousel.push(i);
      //   });
      //   setTimeout(() => {
      //     this.loadUserCurrencyAndPrice();
      //   }, 300);
      //
      //   this.reloadFeedbacks();
      // });
    });
  }

  getAdvertisementImage(imageName: string | null): string {
    return this.advertisementService.getAdvertisementImagePath(imageName, this.advertisement.sellerId);
  }

  changeViewImage(image: any): void {
    this.viewImage = image;
  }

  clickPreviousImage(): void {
    let index = this.imagesForCarousel.indexOf(this.viewImage);
    if (index === 0) {
      index = this.imagesForCarousel.length - 1;
    } else {
      index--;
    }
    this.viewImage = this.imagesForCarousel[index];
  }

  clickNextImage(): void {
    let index = this.imagesForCarousel.indexOf(this.viewImage);
    if (index === this.imagesForCarousel.length - 1) {
      index = 0;
    } else {
      index++;
    }
    this.viewImage = this.imagesForCarousel[index];
  }

  loadUserCurrencyAndPrice(): void {
    // @ts-ignore
    this.userCurrency = localStorage.getItem('andro_user_currency') !== null && localStorage.getItem('andro_user_currency') !== ''
      ? localStorage.getItem('andro_user_currency') : 'USD';

    if (this.advertisement.type === 'goods_retail') {
      // @ts-ignore
      this.originalRetailPrice = this.advertisement.price;
      this.loadRetailPriceInUserCurrency();
    } else if (this.advertisement.type === 'goods_wholesale') {
      // @ts-ignore
      this.originalWholesalePrice = this.advertisement.price;
      this.loadWholesalePriceInUserCurrency();
    }
  }

  loadRetailPriceInUserCurrency(): void {
    // @ts-ignore
    this.retailPrice = this.currencyService.exchangeCurrencies('USD', this.userCurrency, this.advertisement.price.price);
  }


  loadWholesalePriceInUserCurrency(): void {
    this.identifyCurrentWholesalePrice();
  }

  identifyCurrentWholesalePrice(): void {
    let price = 0.0;
    // @ts-ignore
    for (const p of this.advertisement.price.priceUnits) {
      if (this.pickerCount >= p.min && (this.pickerCount <= p.max || p.max == null)) {
        price = p.price;
      }
    }
  }


  inputItemCount($event: any): void {
    let newCount = +$event.target.value;
    if (newCount === 0) {
      newCount = 1;
    } else if (newCount > this.advertisement.count) {
      newCount = this.advertisement.count;
    }
    this.pickerCount = newCount;
    if (this.advertisement.type === 'goods_wholesale') {
      this.loadWholesalePriceInUserCurrency();
    }
  }

  clickPlusCountButton(): void {
    if (this.pickerCount >= this.advertisement.count) {
      this.pickerCount = this.advertisement.count;
    } else {
      this.pickerCount++;
    }

    if (this.advertisement.type === 'goods_wholesale') {
      this.loadWholesalePriceInUserCurrency();
    }
  }

  clickMinusCountButton(): void {
    if (this.pickerCount <= 1) {
      this.pickerCount = 1;
    } else {
      this.pickerCount--;
    }

    if (this.advertisement.type === 'goods_wholesale') {
      this.loadWholesalePriceInUserCurrency();
    }
  }

  openDeliveriesDialog(): void {
    const dialogRef = this.dialog.open(ChooseDeliveryDialogComponent, {
      data: {
        delivery: this.currentDelivery,
        advertisementId: this.advertisement.id,
        userCountry: this.userCountry,
        sellerCountry: this.advertisement.countryCode
      },
      // width: '40%',
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.currentDelivery = data.delivery;
        // this.changeItemAddress(itemId, data.delivery);
      }
    });
  }

  changeAddViewMode(num: 1 | 2): void {
    this.addInfoMode = num;
  }

  reloadFeedbacks(): void {
    this.feedbackService.getFeedbacksPageForAdvertisement(this.advertisement.id, this.feedbackPagination).subscribe((r) => {
      this.feedbacks = r;
      this.feedbacksList = r.data;
    });
  }

  changeFeedbacksPage($event: PaginationRequest): void {
    this.feedbackPagination = $event;
    this.reloadFeedbacks();
  }

  getUserFlag(countryCode: string): string {
    return this.countryService.getRestCountryByCountryCode(countryCode).flag;
  }

  getFeedbackImage(userId: number, name: string): string {
    return this.feedbackService.getFeedbackImage(userId, name);
  }

  deliverySetup(): void {
    this.deliveryService.getDeliveriesByAdvertisementId(this.advertisement.id).subscribe((deliveries) => {
      this.deliveries.push(this.deliveryService.generateDefaultDeliveryType());
      deliveries.forEach((d) => {
        this.deliveries.push(d);
      });

      this.countryService.defineUserCountry().subscribe((country) => {
        this.userCountry = country;
        if (this.deliveries.length === 1) {
          this.currentDelivery = this.currentDelivery = this.deliveries[0];
          return;
        }
        if (this.userCountry.alpha2Code === this.advertisement.countryCode) {
          this.currentDelivery = this.deliveries[1];
        } else {
          // tslint:disable-next-line:prefer-for-of
          for (const del of this.deliveries) {
            if (del.isInternational) {
              this.currentDelivery = del;
              break;
            }
          }
        }
      });
    });
  }

  buyButtonClick(): void {

  }

  addToLikesButtonClick(): void {

  }

  addToCartButtonClick(): void {
    if (this.accountService.isLogged()) {
      this.cartService.addItemToCart(this.advertisement.id, this.currentDelivery.id).subscribe(() => {
        const dialogRef = this.dialog.open(ItemAddedToCartDialogComponent, {});
        dialogRef.afterClosed().subscribe(() => {
        });
      });
    } else {
      this.openLoginDialog();
    }
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
      data: null
    });
    dialogRef.afterClosed().subscribe();
  }

  openImageDialog(image: string): void {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      // width: '60%',
      maxWidth: '60%',
      // maxHeight: '60%',
      data: image,
      panelClass: 'image-dialog'
    });
    dialogRef.afterClosed().subscribe();
  }
}
