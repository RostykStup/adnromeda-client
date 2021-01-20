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
import {WholesaleGoodsAdvertisementRequest} from '../../../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-goods-advertisement-request';
import {InfoDialogComponent} from '../../dialogs/info-dialog/info-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

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
              private deliveryTypeService: DeliveryService,
              public dialog: MatDialog,
              private router: Router) {
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
  transitionCurrencyCode: any;
  defaultImage = 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png';

  validationTitle = true;
  validationSubcategory = true;
  validationPrice = true;
  validationEmptyPrice = true;
  validateProperties = true;
  validateCount = true;
  cantAddPriceAlert = true;


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
    // this.validationPrice = true;
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
        this.transitionCurrencyCode = c.code;
      }
    });
  }

  addNewWholesalePrice(): void {
    const p = this.wholesalePrice.priceUnits[this.wholesalePrice.priceUnits.length - 1];
    if (p.max !== '' && p.min !== '') {
      const price = new WholesalePriceUnitRequest();
      price.min = p.max + 1;
      this.wholesalePrice.priceUnits.push(price);
      this.cantAddPriceAlert = true;
    } else {
      this.cantAddPriceAlert = false;
    }
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
      this.validateUnitSidesAndValidWithOther(p);
    });
  }

  validatePrice(price: WholesalePriceUnitRequest): boolean {
    return Validator.validateNumberForPrice(price);
  }

  validateUnitPrice(price: WholesalePriceUnitRequest): void {
    this.validationPrice = true;
    const index = this.wholesalePrice.priceUnits.indexOf(price, 0);
    if (index > -1) {
      // console.log(Validator.validateNumberForPrice(price.price));
      this.wholesalePrice.priceUnits[index].isValidPrice = Validator.validateNumberForPrice(price.price);
      this.wholesalePrice.priceUnits[index].isDigit = Validator.validatePriceForTwoDigits(price.price);
    }
  }

  validateUnitSidesAndValidWithOther(price: WholesalePriceUnitRequest): void {
    const index = this.wholesalePrice.priceUnits.indexOf(price, 0);
    this.validationPrice = true;
    if (index > -1) {
      if (price.max !== '') {
        if ((+index === +(this.wholesalePrice.priceUnits.length - 1))) {
          if (price.max === null) {
            this.wholesalePrice.priceUnits[index].isValidSides = true;
          } else {
            this.wholesalePrice.priceUnits[index].isValidSides = price.min < price.max;
          }
        } else {
          this.wholesalePrice.priceUnits[index].isValidSides = price.min < price.max;
          this.wholesalePrice.priceUnits[index + 1].min = price.max + 1;
          this.validateUnitSidesAndValidWithOther(this.wholesalePrice.priceUnits[index + 1]);
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

  handleUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      for (let i = 0; i < this.images.length; i++) {
        // console.log);
        if (this.images[i].src === '') {
          // @ts-ignore
          this.images[i].src = reader.result.toString();
          break;
        }
      }
      event.target.files.clean;
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
      // if (true) {
      let saveAdvertisement;
      this.advertisement.count = Number(this.advertisement.count);
      this.advertisement.subcategoryId = Number(this.subcategoryId);

      if (this.advertisement.properties.length === 1) {
        if (this.advertisement.properties[0].value === '') {
          this.advertisement.properties = null;
        }
      }

      this.deliveryTypes.forEach((d) => {
        if (d.checked) {
          this.advertisement.deliveryTypes.push(Number(d.id));
        }
      });

      if (this.images[0].src !== '') {
        this.advertisement.mainImage = this.images[0].src;
        for (let i = 1; i <= 4; i++) {
          if (this.images[i].src !== '') {
            this.advertisement.images.push(this.images[i].src);
          }
        }
      }

      const dataOk = {
        text: 'Товар успішно додано до вашого магазину'
      };

      if (this.priceType === 1) {
        saveAdvertisement = new RetailGoodsAdvertisementRequest();
        saveAdvertisement.loadDataFromGoodsAdvertisementRequest(this.advertisement);
        saveAdvertisement.price.price = Number(this.retailPrice);

        this.advertisementService.createRetailAdvertisement(saveAdvertisement).subscribe(() => {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            data: dataOk
          });
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigateByUrl('/client/seller/advertisements');
          });
        }, error => {
          alert(error.code);
        });
      } else {
        this.mapWholesalePriceToNumbers();
        saveAdvertisement = new WholesaleGoodsAdvertisementRequest();
        saveAdvertisement.loadDataFromGoodsAdvertisementRequest(this.advertisement);
        saveAdvertisement.price = this.wholesalePrice;
        this.advertisementService.createWholeSaleAdvertisement(saveAdvertisement).subscribe(() => {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            data: dataOk
          });
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigateByUrl('/client/seller/advertisements');
          });
        }, error => {
          alert(error.code);
        });
      }
    } else {
      const dataValid = {
        text: 'Неправильно заповнені поля, перевірте введені дані'
      };

      const dialogRef = this.dialog.open(InfoDialogComponent, {
        data: dataValid
      });
      dialogRef.afterClosed().subscribe(result => {
      });
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
      // @ts-ignore
      this.advertisement.properties.forEach((p) => {
        if (p.name == '' || p.value == '') {
          this.validateProperties = false;
        }
      });
    }
    return this.validationTitle && this.validationPrice && this.validationSubcategory && this.validateProperties && this.validateCount;
  }

  validateWholesalePrice(): boolean {
    for (let i = 0; i < this.wholesalePrice.priceUnits.length; i++) {
      let p = this.wholesalePrice.priceUnits[i];
      this.validateUnitPrice(p);
      this.validateUnitSidesAndValidWithOther(p);
      if (!(p.isValidWithOthers && p.isValidSides && p.isValidPrice && (this.wholesalePrice.priceUnits.length >= 2))) {
        return false;
      }
    }
    return true;
  }

  trimAllProperties(): void {
    // @ts-ignore
    this.advertisement.properties.forEach((p) => {
      p.name = p.name.trim();
      p.value = p.value.trim();
    });
  }

  mapWholesalePriceToNumbers(): void {
    this.wholesalePrice.priceUnits.forEach((p) => {
      p.min = Number(p.min);
      p.max = Number(p.max);
      if (p.max === 0) {
        p.max = null;
      } else {
        p.max = Number(p.max);
      }
    });
  }

  isFirst(price: WholesalePriceUnitRequest): boolean {
    const index = this.wholesalePrice.priceUnits.indexOf(price, 0);
    return index === 0;
  }

}
