import {Component, OnInit} from '@angular/core';
import {GoodsAdvertisementRequest} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-request';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';
import {Validator} from '../../../../common/validator';
import {CategoryService} from '../../../../service/category/category.service';
import {CategoryResponse} from '../../../../entity/category/category-response';
import {SubcategoryService} from '../../../../service/category/subcategory.service';
import {SubcategoryResponse} from '../../../../entity/category/subcategory-response';
import {CurrencyResponse} from '../../../../entity/country/currency-response';
import {CurrencyService} from '../../../../service/country/currency.service';
import {PropertyRequest} from '../../../../entity/advertisement/goodsAdvertisement/property-request';
import {DeliveryTypeResponse} from '../../../../entity/country/delivery-type-response';
import {DeliveryService} from '../../../../service/country/delivery.service';
import {InfoDialogComponent} from '../../dialogs/info-dialog/info-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ParameterRequest} from '../../../../entity/advertisement/goodsAdvertisement/parameter/parameter-request';
import {ParameterValueRequest} from '../../../../entity/advertisement/goodsAdvertisement/parameter/parameter-value-request';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {ParametersValuesPriceCountRequest} from '../../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-price-count-request';

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

  advertisement = new GoodsAdvertisementRequest();
  categories = Array<CategoryResponse>();
  subcategories = Array<SubcategoryResponse>();
  currencies = Array<CurrencyResponse>();
  deliveryTypes = Array<DeliveryTypeResponse>();
  categoryId = 0;
  subcategoryId = 0;

  parameters = new Array<ParameterRequest>();

  paramsValuesCountPrices = new Array<ParametersValuesPriceCountRequest>();
  noParamsValuesCountPrice = new ParametersValuesPriceCountRequest();

  images = Array<Image>();

  icon = 'https://img.icons8.com/material-outlined/24/ff0000/box-important--v1.png';
  questionIcon = 'https://img.icons8.com/material-outlined/24/000000/help.png';

  transitionPrice: any;
  transitionCurrencyCode: any;
  defaultImage = 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png';

  validationTitle = true;
  validationSubcategory = true;
  validateProperties = true;

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((r) => {
      this.categories = r;
    });
    this.deliveryTypeService.getDeliveriesByAccountCountry().subscribe((r) => {
      this.deliveryTypes = r;
    });
    this.advertisement.properties.push(new PropertyRequest());

    for (let i = 0; i < 5; i++) {
      this.images.push(new Image());
    }
  }

  loadSubcategories(): void {
    this.subcategoryService.getAllByCategoryId(this.categoryId).subscribe((r) => {
      this.subcategories = r;
    });
  }

  handleUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i].src === '') {
          // @ts-ignore
          this.images[i].src = reader.result.toString();
          break;
        }
      }
      // tslint:disable-next-line:no-unused-expression
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
    const element = document.getElementById('image-input') as HTMLInputElement;
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
      this.advertisement.subcategoryId = Number(this.subcategoryId);

      if (this.advertisement.properties.length === 1) {
        if (this.advertisement.properties[0].value === '') {
          // @ts-ignore
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

      if (!this.advertisement.hasParameters) {
        this.advertisement.valuesPriceCounts.push(this.noParamsValuesCountPrice);
      } else {
        this.advertisement.parameters = this.parameters;
        this.paramsValuesCountPrices.forEach((p) => {
          const jsonObject = {
            price: p.price,
            count: p.count,
            valueParam: {}
          };
          p.valueParam.forEach((value, key) => {
            // @ts-ignore
            jsonObject.valueParam[key] = value;
          });
          this.advertisement.valuesPriceCounts.push(jsonObject);
        });
      }

      // console.log((this.advertisement | JSON));
      console.log(JSON.stringify(this.advertisement));


      const dataOk = {
        text: 'Товар успішно додано до вашого магазину'
      };

      this.advertisementService.sendGoodsAdvertisementCreateRequest(this.advertisement).subscribe(() => {
        const dialogRef = this.dialog.open(InfoDialogComponent, {
          data: dataOk
        });
        dialogRef.afterClosed().subscribe(result => {
          window.open('client/seller/advertisements', '_self');
        });
      });

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

    this.trimAllProperties();
    this.validateProperties = true;
    if (this.advertisement.properties.length === 1) {
      // tslint:disable-next-line:triple-equals
      this.validateProperties = (this.advertisement.properties[0].value == '' && this.advertisement.properties[0].name == '') ||
        (this.advertisement.properties[0].value !== '' && this.advertisement.properties[0].name !== '');
    } else {
      // @ts-ignore
      this.advertisement.properties.forEach((p) => {
        // tslint:disable-next-line:triple-equals
        if (p.name == '' || p.value == '') {
          this.validateProperties = false;
        }
      });
    }
    return this.validationTitle && this.validationSubcategory && this.validateProperties && this.validateParameters();
  }

  validateParameters(): boolean {
    if (this.advertisement.hasParameters) {
      // @ts-ignore
      this.paramsValuesCountPrices.forEach((p) => {
        p.price = Number(p.price);
        if (isNaN(p.price)) {
          return false;
        }
      });
      return true;
      // return false;
    } else {
      this.noParamsValuesCountPrice.price = Number(this.noParamsValuesCountPrice.price);
      return this.noParamsValuesCountPrice.count >= 0 && Validator.validateNumberForPrice(this.noParamsValuesCountPrice.price);
    }
  }


  trimAllProperties(): void {
    if (this.advertisement.properties !== null) {
      if (this.advertisement.properties.length > 0) {
        // @ts-ignore
        this.advertisement.properties.forEach((p) => {
          p.name = p.name.trim();
          p.value = p.value.trim();
        });
      }
    }
  }

  enterPriceInput($event: any): void {
    const price = $event.target.value;
    if (!Validator.validateNumberForPrice(price) || !Validator.validatePriceForTwoDigits(price)) {
      $event.target.classList.add('incorrect');
    } else {
      $event.target.classList.remove('incorrect');
    }
  }

  addParameter(): void {
    const input = document.getElementById('new-param-title-input') as HTMLInputElement;
    input.value = input.value.trim();
    if (input.value.length > 1) {
      const parameter = new ParameterRequest();
      parameter.title = input.value;
      this.parameters.push(parameter);
      input.value = '';
    }

  }

  addParameterValue(parameter: ParameterRequest): void {
    const input = document.getElementById('param-' + parameter.title + '-value-input') as HTMLInputElement;
    input.value = input.value.trim();
    if (input.value.length > 0) {
      const value = new ParameterValueRequest();
      value.title = input.value;
      this.parameters[this.parameters.indexOf(parameter)].values.push(value);
      input.value = '';
      this.recreateNewParamsValuesCountPricesRequest();
    }
  }


  deleteParameter(parameter: ParameterRequest): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: 'Ви впевнені що хочете видалити параметр?'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data.result) {
        this.parameters.splice(this.parameters.indexOf(parameter), 1);
        this.recreateNewParamsValuesCountPricesRequest();
      }
    });
  }

  deleteParameterValue(parameter: ParameterRequest, value: ParameterValueRequest): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: 'Ви впевнені що хочете видалити варіант параметру?'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data.result) {
        parameter.values.splice(parameter.values.indexOf(value), 1);
        this.recreateNewParamsValuesCountPricesRequest();
      }
    });
  }


  recreateNewParamsValuesCountPricesRequest(): void {
    if (this.parameters.length === 0) {
      this.paramsValuesCountPrices = new Array<ParametersValuesPriceCountRequest>();
      return;
    }
    let size = 1;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.parameters.length; i++) {
      size = size * this.parameters[i].values.length;
    }
    this.paramsValuesCountPrices = new Array<ParametersValuesPriceCountRequest>();

    const parameterLength = new Array<number>();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.parameters.length; i++) {
      parameterLength[i] = this.getParameterLength(i, size, (i === 0 ? 0 : parameterLength[i - 1]));
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < size; i++) {
      const param = new ParametersValuesPriceCountRequest();
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.parameters.length; j++) {
        const paramValuesIndex = Math.floor(i / parameterLength[j]) % this.parameters[j].values.length;
        param.valueParam.set(this.parameters[j].title, this.parameters[j].values[paramValuesIndex].title);
      }
      this.paramsValuesCountPrices.push(param);
    }

  }

  getParameterLength(index: number, size: number, previousLength: number): number {
    if (index === 0) {
      return size / this.parameters[index].values.length;
    } else {
      return previousLength / this.parameters[index].values.length;
    }
  }
}
