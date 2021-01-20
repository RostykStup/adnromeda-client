import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AdvertisementService} from '../../../../../service/advertisement/advertisement.service';
import {WholesaleGoodsAdvertisementResponse} from '../../../../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-goods-advertisement-response';
import {RetailGoodsAdvertisementResponse} from '../../../../../entity/advertisement/goodsAdvertisement/retailGoodsAdvertisement/retail-goods-advertisement-response';
import {Validator} from '../../../../../common/validator';
import {RetailPriceRequest} from '../../../../../entity/advertisement/goodsAdvertisement/retailGoodsAdvertisement/retail-price-request';
import {WholesalePriceRequest} from '../../../../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-price-request';
import {WholesalePriceUnitRequest} from '../../../../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-price-unit-request';
import {WholesalePriceResponse} from '../../../../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-price-response';
import {WholesalePriceUnitResponse} from '../../../../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-price-unit-response';
import {PropertyRequest} from '../../../../../entity/advertisement/goodsAdvertisement/property-request';
import {PropertyResponse} from '../../../../../entity/advertisement/goodsAdvertisement/property-response';
import {DeliveryService} from '../../../../../service/country/delivery.service';
import {DeliveryTypeResponse} from '../../../../../entity/country/delivery-type-response';

@Component({
  selector: 'app-advertisement-updating',
  templateUrl: './advertisement-updating.component.html',
  styleUrls: ['../../../../../styles/input.scss', './advertisement-updating.component.scss']
})
export class AdvertisementUpdatingComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private advertisementService: AdvertisementService,
              private deliveryService: DeliveryService) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      // console.log('update advertisement - ' + params.advertisementId);
      // console.log('update advertisement - ' + params.advertisementType);
      this.advertisementService.getSellerGoodsAdvertisementForEditing(params.advertisementId).subscribe((r) => {
        this.advertisement = r;
        this.editTitle = this.advertisement.title;
        this.editCount = this.advertisement.count;
        this.editDescription = this.advertisement.description;
        this.rewriteEditProperties();
        this.loadAdvertisementDeliveries();

        if (this.advertisement.type === 'goods_retail') {
          // @ts-ignore
          this.newRetail.price = this.advertisement.price.price;
        } else {
          // @ts-ignore
          this.advertisement.price.priceUnits.forEach((p) => {
            const price = new WholesalePriceUnitRequest();
            price.price = p.price;
            price.max = p.max;
            price.min = p.min;
            this.newWholesale.priceUnits.push(price);
          });
        }
      });
    });
  }

  // @ts-ignore
  advertisement: WholesaleGoodsAdvertisementResponse | RetailGoodsAdvertisementResponse;
  advertisementDeliveries = new Array<DeliveryTypeResponse>();

  allCountryDeliveryList = new Array<DeliveryTypeResponse>();

  editTitle = '';
  editCount: number | any = 0;
  newRetail = new RetailPriceRequest();
  newWholesale = new WholesalePriceRequest();
  editDescription = '';
  editProperties = new Array<PropertyRequest>();
  editDeliveries = new Array<number>();

  isNumberRetail = true;
  isDigitRetail = true;
  transitionPriceRetail = '';

  validateTitle = true;
  validateCount = true;
  validationWholesalePrice = true;
  cantAddPriceAlert = true;
  validateProperties = true;

  wholesaleUpdate = false;
  descriptionUpdate = false;

  ngOnInit(): void {
  }

  titleButtonClick(): void {
    const titleInput = document.getElementById('advertisement-title-input') as HTMLInputElement;
    if (!titleInput.disabled) {
      this.validateTitle = Validator.validateSizeMinMax(this.editTitle, 5, 200);
      if (this.validateTitle) {
        this.advertisementService.changeAdvertisementTitle(this.advertisement.id, this.editTitle).subscribe(() => {
          this.advertisement.title = this.editTitle;
          titleInput.disabled = !titleInput.disabled;
        });
      }
    } else {
      titleInput.disabled = !titleInput.disabled;
    }
  }

  clickCancelTitle(): void {
    const titleInput = document.getElementById('advertisement-title-input') as HTMLInputElement;
    titleInput.disabled = true;
    this.validateTitle = true;
    this.editTitle = this.advertisement.title;
  }

  validateNumber(n: any): void {
    // this.validationPrice = true;
    this.isNumberRetail = Validator.validateNumberForPrice(n);
    this.isDigitRetail = Validator.validatePriceForTwoDigits(n);
    this.transitionPriceRetail = Number(n).toFixed(2);
  }

  clickChangeRetailPriceButton(): void {
    const titleInput = document.getElementById('retail-price-input') as HTMLInputElement;
    if (!titleInput.disabled) {
      // this.validateTitle = Validator.validateSizeMinMax(this.editTitle, 5, 200);
      // if (this.validateTitle) {
      //   this.advertisementService.changeAdvertisementTitle(this.advertisement.id, this.editTitle).subscribe(() => {
      //     this.advertisement.title = this.editTitle;
      //   });
      // }
      if (this.isNumberRetail) {
        this.newRetail.price = Number(this.newRetail.price);

        this.advertisementService.changeRetailAdvertisementPrice(this.newRetail, this.advertisement.id).subscribe(() => {
          // @ts-ignore
          this.advertisement.price.price = this.newRetail.price;
          titleInput.disabled = !titleInput.disabled;
        });
      }
    } else {
      titleInput.disabled = !titleInput.disabled;
    }
  }

  clickCancelRetailPriceButton(): void {
    const titleInput = document.getElementById('retail-price-input') as HTMLInputElement;
    titleInput.disabled = true;
    // @ts-ignore
    this.newRetail.price = this.advertisement.price.price;
    this.isNumberRetail = true;
    this.isDigitRetail = true;
  }

  validateUnitPrice(price: WholesalePriceUnitRequest): void {
    this.validationWholesalePrice = true;
    const index = this.newWholesale.priceUnits.indexOf(price, 0);
    if (index > -1) {
      // console.log(Validator.validateNumberForPrice(price.price));
      this.newWholesale.priceUnits[index].isValidPrice = Validator.validateNumberForPrice(price.price);
      this.newWholesale.priceUnits[index].isDigit = Validator.validatePriceForTwoDigits(price.price);
    }
  }

  validateUnitSidesAndValidWithOther(price: WholesalePriceUnitRequest): void {
    const index = this.newWholesale.priceUnits.indexOf(price, 0);
    this.validationWholesalePrice = true;
    if (index > -1) {
      if (price.max !== '') {
        if ((+index === +(this.newWholesale.priceUnits.length - 1))) {
          if (price.max === null) {
            this.newWholesale.priceUnits[index].isValidSides = true;
          } else {
            this.newWholesale.priceUnits[index].isValidSides = price.min < price.max;
          }
        } else {
          this.newWholesale.priceUnits[index].isValidSides = price.min < price.max;
          this.newWholesale.priceUnits[index + 1].min = price.max + 1;
          this.validateUnitSidesAndValidWithOther(this.newWholesale.priceUnits[index + 1]);
        }
      }
      if (index > 0) {
        this.newWholesale.priceUnits[index].isValidWithOthers =
          this.newWholesale.priceUnits[index].min > this.newWholesale.priceUnits[index - 1].max;
        // console.log(this.wholesalePrice.priceUnits[index].isValidWithOthers);
      }
    }
  }

  isFirst(price: WholesalePriceUnitRequest): boolean {
    const index = this.newWholesale.priceUnits.indexOf(price, 0);
    return index === 0;
  }

  addNewWholesalePrice(): void {
    const p = this.newWholesale.priceUnits[this.newWholesale.priceUnits.length - 1];
    if ((p.max !== '' && p.max !== null) && p.min !== '') {
      const price = new WholesalePriceUnitRequest();
      price.min = p.max + 1;
      this.newWholesale.priceUnits.push(price);
      this.cantAddPriceAlert = true;
    } else {
      this.cantAddPriceAlert = false;
    }
  }

  isValidNextSide(price: WholesalePriceUnitRequest): boolean {
    const index = this.newWholesale.priceUnits.indexOf(price, 0);

    if (+index !== +(this.newWholesale.priceUnits.length - 1)) {
      if (price.max >= this.newWholesale.priceUnits[index + 1].min && this.newWholesale.priceUnits[index + 1].min !== '') {
        return false;
      }
    }
    return true;
  }

  removeWholesalePrice(price: WholesalePriceUnitRequest): void {
    if (this.newWholesale.priceUnits.length === 1) {
      return;
    }
    const index = this.newWholesale.priceUnits.indexOf(price, 0);
    if (index > -1) {
      this.newWholesale.priceUnits.splice(index, 1);
    }

    this.newWholesale.priceUnits.forEach((p) => {
      // this.validatePrice(p);
      this.validateUnitPrice(p);
      this.validateUnitSidesAndValidWithOther(p);
    });
  }

  wholeSaleUpdateClick(): void {
    if (this.wholesaleUpdate) {
      if (this.validateWholesale()) {
        this.mapWholesalePriceToNumbers();
        this.advertisementService.changeWholesaleAdvertisementPrice(this.newWholesale, this.advertisement.id).subscribe(() => {
          this.newWholesale.priceUnits.forEach((p) => {
            this.advertisement.price = new WholesalePriceResponse();
            const price = new WholesalePriceUnitResponse();
            price.price = p.price;
            price.max = p.max;
            price.min = p.min;
            this.advertisement.price.priceUnits.push(price);
          });
          this.wholesaleUpdate = !this.wholesaleUpdate;
        });
      }
    } else {
      this.wholesaleUpdate = !this.wholesaleUpdate;
    }
  }

  wholeSaleCancelClick(): void {
    this.wholesaleUpdate = false;
    this.newWholesale = new WholesalePriceRequest();
    // @ts-ignore
    this.advertisement.price.priceUnits.forEach((p) => {
      const price = new WholesalePriceUnitRequest();
      price.min = p.min;
      price.max = p.max;
      price.price = p.price;

      this.newWholesale.priceUnits.push(price);
    });
  }

  validateWholesale(): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.newWholesale.priceUnits.length; i++) {
      const p = this.newWholesale.priceUnits[i];

      this.validateUnitPrice(p);
      this.validateUnitSidesAndValidWithOther(p);
      if (!(p.isValidWithOthers && p.isValidSides && p.isValidPrice && (this.newWholesale.priceUnits.length >= 2))) {
        return false;
      }
    }
    return true;
  }

  mapWholesalePriceToNumbers(): void {
    this.newWholesale.priceUnits.forEach((p) => {
      p.max = Number(p.max);
      p.min = Number(p.min);

      if (p.max === 0) {
        p.max = null;
      } else {
        p.max = Number(p.max);
      }
    });
  }


  countButtonClick(): void {
    const countInput = document.getElementById('advertisement-count-input') as HTMLInputElement;
    if (!countInput.disabled) {
      this.validateCount = this.editCount;
      if (this.validateCount) {
        this.advertisementService.changeAdvertisementCount(this.advertisement.id, this.editCount).subscribe(() => {
          this.advertisement.count = this.editCount;
          countInput.disabled = !countInput.disabled;
        });
      }
    } else {
      countInput.disabled = !countInput.disabled;
    }
  }

  clickCancelCount(): void {
    const titleInput = document.getElementById('advertisement-title-input') as HTMLInputElement;
    titleInput.disabled = true;
    this.validateTitle = true;
    this.editTitle = this.advertisement.title;

  }

  descriptionEditClick(): void {
    this.trimAllEditProperties();
    if (this.descriptionUpdate) {
      if (this.validateProperties) {
        console.log('can do request');
        this.advertisementService.changeAdvertisementDescription(this.advertisement.id, this.editDescription).subscribe(() => {
          this.advertisement.description = this.editDescription;
          this.advertisementService.changeAdvertisementProperties(this.advertisement.id, this.editProperties).subscribe(() => {
            this.rewriteAdvertisementProperties();
            this.descriptionUpdate = !this.descriptionUpdate;
          });
        });
      }
    } else {
      this.descriptionUpdate = !this.descriptionUpdate;
    }
  }

  descriptionCancelClick(): void {
    this.descriptionUpdate = false;
    this.editDescription = this.advertisement.description;
    this.rewriteEditProperties();
  }

  rewriteEditProperties(): void {
    this.editProperties = new Array<PropertyRequest>();
    this.advertisement.properties.forEach((p) => {
      const prop = new PropertyRequest();
      prop.value = p.value;
      prop.name = p.name;
      this.editProperties.push(prop);
    });
  }

  rewriteAdvertisementProperties(): void {
    this.advertisement.properties = new Array<PropertyResponse>();
    this.editProperties.forEach((p) => {
      const prop = new PropertyResponse();
      prop.value = p.value;
      prop.name = p.name;
      this.advertisement.properties.push(prop);
    });
  }

  removeProperty(property: PropertyRequest): void {
    if (this.editProperties.length === 1) {
      return;
    }
    const index = this.editProperties.indexOf(property, 0);
    if (index > -1) {
      this.editProperties.splice(index, 1);
    }
    console.log(this.editProperties.length);
  }

  addNewProperty(): void {
    this.editProperties.push(new PropertyRequest());
  }


  trimAllEditProperties(): void {
    this.validateProperties = true;
    this.editProperties.forEach((p) => {
      p.value = p.value.trim();
      p.name = p.name.trim();
      if (p.value === '' || p.value === null || p.name === '' || p.name === null) {
        this.validateProperties = false;
      }
    });
  }

  loadAdvertisementDeliveries(): void {
    this.deliveryService.getDeliveriesByAdvertisementId(this.advertisement.id).subscribe((r) => {
      this.advertisementDeliveries = r;
    });
  }

  loadAllDeliveries(): void {
    this.deliveryService.getDeliveriesByAccountCountry().subscribe((r) => {
      this.allCountryDeliveryList = r;
    });
  }

}
