import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AdvertisementService} from '../../../../../service/advertisement/advertisement.service';
import {Validator} from '../../../../../common/validator';
import {PropertyRequest} from '../../../../../entity/advertisement/goodsAdvertisement/property-request';
import {PropertyResponse} from '../../../../../entity/advertisement/goodsAdvertisement/property-response';
import {DeliveryService} from '../../../../../service/country/delivery.service';
import {DeliveryTypeResponse} from '../../../../../entity/country/delivery-type-response';
import {GoodsAdvertisementResponse} from '../../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';

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
      // this.advertisementService.getSellerGoodsAdvertisementForEditing(params.advertisementId).subscribe((r) => {
      //   this.advertisement = r;
      //   this.editTitle = this.advertisement.title;
      //   this.editCount = this.advertisement.count;
      //   this.editDescription = this.advertisement.description;
      //   this.editOnlySeller = this.advertisement.onlySellerCountry;
      //   this.viewImage = this.advertisement.mainImage;
      //   this.rewriteEditProperties();
      //   this.loadAdvertisementDeliveries();
      //   this.loadAllDeliveries();
      // });
    });
  }

  advertisement = new GoodsAdvertisementResponse();
  advertisementDeliveries = new Array<DeliveryTypeResponse>();

  allCountryDeliveryList = new Array<DeliveryTypeResponse>();

  editTitle = '';
  editCount: number | any = 0;
  editDescription = '';
  editProperties = new Array<PropertyRequest>();
  editDeliveries = new Array<number>();
  editOnlySeller = false;


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
  deliveryUpdate = false;

  cantDeleteMainShow = false;
  cantImagesMoreShow = false;

  viewImage = '';

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

  countButtonClick(): void {
    const countInput = document.getElementById('advertisement-count-input') as HTMLInputElement;
    if (!countInput.disabled) {
      this.validateCount = this.editCount;
      if (this.validateCount) {
        this.advertisementService.changeAdvertisementCount(this.advertisement.id, this.editCount).subscribe(() => {
          // this.advertisement.count = this.editCount;
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
    // @ts-ignore
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
    this.advertisementDeliveries = new Array<DeliveryTypeResponse>();
    this.deliveryService.getDeliveriesByAdvertisementId(this.advertisement.id).subscribe((r) => {
      this.advertisementDeliveries = r;
    });
  }

  loadAllDeliveries(): void {
    this.deliveryService.getDeliveriesByAccountCountry().subscribe((r) => {
      this.allCountryDeliveryList = r;
    });
  }

  makeDeliveriesChecked(): void {
    this.allCountryDeliveryList.forEach((dc) => {
      dc.checked = false;
      this.advertisementDeliveries.forEach((d) => {
        if (dc.title === d.title) {
          dc.checked = true;
        }
      });
      // dc.checked = this.advertisementDeliveries.indexOf(dc) > -1;
    });
  }

  clickChangeDeliveries(): void {
    if (this.deliveryUpdate) {
      this.editDeliveries = new Array<number>();
      this.allCountryDeliveryList.forEach((d) => {
        if (d.checked) {
          this.editDeliveries.push(d.id);
        }
      });
      this.advertisementService.changeAdvertisementDeliveries(this.advertisement.id, this.editDeliveries).subscribe(() => {
        this.advertisementDeliveries = new Array<DeliveryTypeResponse>();
        this.deliveryService.getDeliveriesByAdvertisementId(this.advertisement.id).subscribe((r) => {
          this.advertisementDeliveries = r;
          this.advertisementService.changeAdvertisementOnlySellerDelivery(this.advertisement.id, this.editOnlySeller).subscribe(() => {
            this.advertisement.onlySellerCountry = this.editOnlySeller;
          });
          this.deliveryUpdate = !this.deliveryUpdate;
        });
      });
    } else {
      this.makeDeliveriesChecked();
      this.editOnlySeller = this.advertisement.onlySellerCountry;
      this.deliveryUpdate = !this.deliveryUpdate;
    }

  }

  cancelDeliveryClick(): void {
    this.editDeliveries = new Array<number>();
    this.deliveryUpdate = false;
  }

  handleUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // @ts-ignore
      this.advertisementService.addImageToAdvertisement(this.advertisement.id, reader.result.toString()).subscribe((r) => {
        this.advertisement.images.push(r);
        this.viewImage = r;
        event.target.value = '';
      }, error => {
        if (this.advertisement.mainImage) {
          this.advertisement.images.push(error.error.text);
        } else {
          this.advertisement.mainImage = error.error.text;
        }
        this.viewImage = error.error.text;
        event.target.value = '';
      });
    };
  }


  getImage(image: string | null, sellerId: number): string {
    return this.advertisementService.getAdvertisementImagePath(image, sellerId);
  }

  clickAddImageButton(): void {
    this.cantDeleteMainShow = false;
    const imageInput = document.getElementById('add-image-input') as HTMLInputElement;
    if (this.advertisement.images.length < 4) {
      imageInput.click();
    } else {
      this.cantImagesMoreShow = true;
    }
  }


  deleteImageClick(): void {
    this.cantImagesMoreShow = false;
    if (this.viewImage !== this.advertisement.mainImage) {
      this.advertisementService.deleteGoodsAdvertisementImage(this.advertisement.id, this.viewImage).subscribe(() => {
        this.advertisement.images.splice(this.advertisement.images.indexOf(this.viewImage), 1);
        this.viewImage = this.advertisement.mainImage;
      });
    } else {
      this.cantDeleteMainShow = true;

    }
  }

  clickMainButton(): void {
    this.cantImagesMoreShow = false;
    const newMain = this.viewImage;
    this.advertisementService.makeMainImageToGoodsAdvertisement(this.advertisement.id, newMain).subscribe(() => {
      this.advertisement.images.splice(this.advertisement.images.indexOf(this.viewImage), 1);
      this.advertisement.images.push(this.advertisement.mainImage);
      this.advertisement.mainImage = newMain;
      this.viewImage = this.advertisement.mainImage;
    });
  }
}
