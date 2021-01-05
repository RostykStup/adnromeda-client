import {Component, OnInit} from '@angular/core';
import {GoodsAdvertisementRequest} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-request';
import {RetailGoodsAdvertisementRequest} from '../../../../entity/advertisement/goodsAdvertisement/retailGoodsAdvertisement/retail-goods-advertisement-request';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';
import {Validator} from '../../../../common/validator';
import {CategoryService} from '../../../../service/category/category.service';
import {CategoryResponse} from '../../../../entity/category/category-response';
import {SubcategoryService} from '../../../../service/category/subcategory.service';
import {SubcategoryResponse} from '../../../../entity/category/subcategory-response';
import {CurrencyResponse} from '../../../../entity/country/currency-response';
import {CurrencyService} from '../../../../service/country/currency.service';
import {WholesalePriceRequest} from '../../../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-price-request';
import {WholesalePriceUnitRequest} from '../../../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-price-unit-request';
import {PropertyRequest} from '../../../../entity/advertisement/goodsAdvertisement/property-request';
import {DeliveryTypeResponse} from '../../../../entity/country/delivery-type-response';
import {DeliveryService} from '../../../../service/country/delivery.service';

export class Image {
  src = '';
  // src:
}

@Component({
  selector: 'app-create-advertisement',
  templateUrl: './create-advertisement.component.html',
  styleUrls: ['../../../../styles/input.scss', './create-advertisement.component.scss']
})
export class CreateAdvertisementComponent implements OnInit {

  constructor(private advertisementService: AdvertisementService,
              private categoryService: CategoryService,
              private subcategoryService: SubcategoryService,
              private currencyService: CurrencyService,
              private deliveryTypeService: DeliveryService) {
  }

  isNumber = true;
  digit = true;

  advertisement = new GoodsAdvertisementRequest();
  categories = Array<CategoryResponse>();
  subcategories = Array<SubcategoryResponse>();
  currencies = Array<CurrencyResponse>();
  wholesalePrice = new WholesalePriceRequest();
  deliveryTypes = Array<DeliveryTypeResponse>();
  categoryId = 0;
  subcategoryId = 0;

  images = Array<Image>();

  icon = 'https://img.icons8.com/material-outlined/24/ff0000/box-important--v1.png';
  questionIcon = 'https://img.icons8.com/material-outlined/24/000000/help.png';

  priceType = 0;
  retailPrice = '';

  transitionPrice: any;
  transitionCurrency: any;
  defaultImage = 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png';

  validationTitle = true;
  validationSubcategory = true;
  validationPrice = true;
  validationEmptyPrice = true;
  validateProperties = true;
  validateCount = true;


  ngOnInit(): void {
    this.categoryService.getAll().subscribe((r) => {
      this.categories = r;
    });
    this.currencyService.getAll().subscribe((r) => {
      this.currencies = r;
      this.advertisement.currencyId = this.currencies[0].id;
      this.reloadCurrency();
    });
    this.deliveryTypeService.getDeliveriesByAccountCountry().subscribe((r) => {
      this.deliveryTypes = r;
    });
    this.wholesalePrice.priceUnits.push(new WholesalePriceUnitRequest());
    this.advertisement.properties.push(new PropertyRequest());

    for (let i = 0; i < 5; i++) {
      this.images.push(new Image());
    }
  }

  validateNumber(n: any): void {
    this.isNumber = Validator.validateNumberForPrice(n);
    this.digit = Validator.validatePriceForTwoDigits(n);
    this.transitionPrice = Number(n).toFixed(2);
  }

  loadSubcategories(): void {
    this.subcategoryService.getAllByCategoryId(this.categoryId).subscribe((r) => {
      this.subcategories = r;
    });
  }

  changePriceType(n: number): void {
    this.priceType = n;
  }

  reloadCurrency(): void {
    this.currencies.forEach((c) => {
      if (c.id == this.advertisement.currencyId) {
        this.transitionCurrency = c.code;
      }
    });
  }

  addTest(): void {
  }

  addNewWholesalePrice(): void {
    this.wholesalePrice.priceUnits.push(new WholesalePriceUnitRequest());
  }

  removeWholesalePrice(price: WholesalePriceUnitRequest): void {
    if (this.wholesalePrice.priceUnits.length === 1) {
      return;
    }
    const index = this.wholesalePrice.priceUnits.indexOf(price, 0);
    if (index > -1) {
      this.wholesalePrice.priceUnits.splice(index, 1);
    }

    this.wholesalePrice.priceUnits.forEach((p) => {
      // this.validatePrice(p);
      this.validateUnitPrice(p);
      this.validateUnitSides(p);
    });
  }

  validatePrice(price: WholesalePriceUnitRequest): boolean {
    return Validator.validateNumberForPrice(price);
  }

  validateUnitPrice(price: WholesalePriceUnitRequest): void {
    const index = this.wholesalePrice.priceUnits.indexOf(price, 0);
    if (index > -1) {
      // console.log(Validator.validateNumberForPrice(price.price));
      this.wholesalePrice.priceUnits[index].isValidPrice = Validator.validateNumberForPrice(price.price);
      this.wholesalePrice.priceUnits[index].isDigit = Validator.validatePriceForTwoDigits(price.price);
    }
  }

  validateUnitSides(price: WholesalePriceUnitRequest): void {
    const index = this.wholesalePrice.priceUnits.indexOf(price, 0);
    if (index > -1) {
      console.log(price.max);
      if (price.max !== '') {
        console.log(+index === +(this.wholesalePrice.priceUnits.length - 1));

        if ((+index === +(this.wholesalePrice.priceUnits.length - 1)) && price.max === null) {
          this.wholesalePrice.priceUnits[index].isValidSides = true;
        } else {
          this.wholesalePrice.priceUnits[index].isValidSides = price.min < price.max;
        }

      }
      if (index > 0) {
        this.wholesalePrice.priceUnits[index].isValidWithOthers =
          this.wholesalePrice.priceUnits[index].min > this.wholesalePrice.priceUnits[index - 1].max;
        // console.log(this.wholesalePrice.priceUnits[index].isValidWithOthers);
      }
    }
  }

  getTwoDigitPrice(price: WholesalePriceUnitRequest): string {
    return Number(price.price).toFixed(2);
  }

  isValidNextSide(price: WholesalePriceUnitRequest): boolean {
    const index = this.wholesalePrice.priceUnits.indexOf(price, 0);

    if (+index !== +(this.wholesalePrice.priceUnits.length - 1)) {
      if (price.max >= this.wholesalePrice.priceUnits[index + 1].min && this.wholesalePrice.priceUnits[index + 1].min !== '') {
        return false;
      }
    }
    return true;
  }

  handleUpload(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      for (let i = 0; i < this.images.length; i++) {
        // console.log);
        if (this.images[i].src === '') {
          this.images[i].src = reader.result.toString();
          break;
        }
      }

      // this.advertisement.images.push(reader.result.toString());
    };
  }

  addNewProperty(): void {
    this.advertisement.properties.push(new PropertyRequest());
  }

  removeProperty(property: PropertyRequest): void {
    if (this.advertisement.properties.length === 1) {
      return;
    }
    const index = this.advertisement.properties.indexOf(property, 0);
    if (index > -1) {
      this.advertisement.properties.splice(index, 1);
    }
  }

  uploadImage(): void {
    const element = <HTMLInputElement> document.getElementById('image-input');
    element.click();
  }

  deleteImage(image: Image): void {
    const index = this.images.indexOf(image, 0);
    if (index > -1) {
      this.images.splice(index, 1);
      this.images.push(new Image());
    }
  }

  createGoodsAdvertisement(): void {
    if (this.validateAll()) {

    }
  }

  validateAll(): boolean {
    this.advertisement.title = this.advertisement.title.trim();
    this.advertisement.description = this.advertisement.description.trim();
    this.validationTitle = Validator.validateSizeMin(this.advertisement.title.trim(), 1);
    this.validationSubcategory = (this.subcategoryId !== 0);

    this.validateCount = this.advertisement.count;

    this.validationPrice = true;
    this.validationEmptyPrice = true;
    if (this.priceType === 0) {
      this.validationPrice = false;
    } else if (this.priceType === 1) {
      if (this.retailPrice.trim() == '') {
        this.validationEmptyPrice = false;
      } else {
        this.validationPrice = this.isNumber && this.digit;
      }
    } else {
      this.validationPrice = this.validateWholesalePrice();
    }

    this.trimAllProperties();
    this.validateProperties = true;
    if (this.advertisement.properties.length === 1) {
      this.validateProperties = (this.advertisement.properties[0].value == '' && this.advertisement.properties[0].name == '') ||
        (this.advertisement.properties[0].value !== '' && this.advertisement.properties[0].name !== '');
    } else {
      this.advertisement.properties.forEach((p) => {
        if (p.name == '' || p.value == '') {
          this.validateProperties = false;
        }
      });
    }
    return true;
  }

  validateWholesalePrice(): boolean {
    for (let i = 0; i < this.wholesalePrice.priceUnits.length; i++) {
      let p = this.wholesalePrice.priceUnits[i];
      this.validateUnitPrice(p);
      this.validateUnitSides(p);
      if (!(p.isValidWithOthers && p.isValidSides && p.isValidPrice)) {
        return false;
      }
    }
    return true;
  }

  trimAllProperties(): void {
    this.advertisement.properties.forEach((p) => {
      p.name = p.name.trim();
      p.value = p.value.trim();
    });
  }
}
