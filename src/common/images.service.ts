import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalConstants} from './global-constants';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor(private httpClient: HttpClient) {
  }

  private static userAvatarPath = GlobalConstants.API_URL + 'image/user_';


  public static getAvatarImage(imageName: string | null, accountId: number): string {
    return imageName !== null && imageName !== '' ? this.userAvatarPath + accountId + '/' + imageName : 'https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png';
  }

  static getAdvertisementImage(sellerId: number, image: string) {
    return image !== null && image !== '' ? GlobalConstants.API_URL + 'image/user_' + sellerId + '/advertisements/' + image : 'https://sunliberty.com.ua/wp-content/themes/brixel/images/No-Image-Found-400x264.png';
  }
}
