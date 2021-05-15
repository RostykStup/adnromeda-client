import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GoodsAdvertisementRequest} from '../../../../entity/advertisement/goodsAdvertisement/goods-advertisement-request';

@Component({
  selector: 'app-goods-images-creation',
  templateUrl: './goods-images-creation.component.html',
  styleUrls: ['./goods-images-creation.component.scss']
})
export class GoodsImagesCreationComponent implements OnInit {

  constructor() {
  }

  @Input() advertisement = new GoodsAdvertisementRequest();
  @Output() goNextStep: EventEmitter<GoodsAdvertisementRequest> = new EventEmitter();

  mainImage: string | null = null;
  images = new Array<string>();

  ngOnInit(): void {
  }

  handleMainUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // @ts-ignore
      this.mainImage = reader.result.toString();

      event.target.value = '';
    };
  }

  handleUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // @ts-ignore
      this.images.push(reader.result.toString());

      event.target.value = '';
    };
  }

  clickNextStep(): void {
    this.advertisement.mainImage = this.mainImage;
    this.advertisement.images = this.images;
    this.goNextStep.emit(this.advertisement);
  }

  deleteImage(i: number): void {
    this.images.splice(i, 1);
  }
}
