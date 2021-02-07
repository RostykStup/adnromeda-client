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
  deliveryTypes = Array<DeliveryTypeResponse>();
  categoryId = 0;
  subcategoryId = 0;

  images = Array<Image>();

  icon = 'https://img.icons8.com/material-outlined/24/ff0000/box-important--v1.png';
  questionIcon = 'https://img.icons8.com/material-outlined/24/000000/help.png';

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
        // console.log);
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

    this.validationPrice = true;
    this.validationEmptyPrice = true;

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
    return this.validationTitle && this.validationPrice && this.validationSubcategory && this.validateProperties && this.validateCount;
  }


  trimAllProperties(): void {
    // @ts-ignore
    this.advertisement.properties.forEach((p) => {
      p.name = p.name.trim();
      p.value = p.value.trim();
    });
  }

}
