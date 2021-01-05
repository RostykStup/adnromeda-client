import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {AccountLoginRequest} from '../../entity/account/account-login-request';
import {AuthenticationResponse} from '../../entity/account/authentication-response';
import {AccountDataRequest} from '../../entity/account/account-data-request';
import {WholesaleGoodsAdvertisementRequest} from '../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-goods-advertisement-request';
import {RetailGoodsAdvertisementRequest} from '../../entity/advertisement/goodsAdvertisement/retailGoodsAdvertisement/retail-goods-advertisement-request';
import {CategoryResponse} from '../../entity/category/category-response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {
  }

  categoryURL = GlobalConstants.API_URL + 'category';

  getAll(): Observable<Array<CategoryResponse>> {
    const url = this.categoryURL + '/all';
    return this.httpClient.get<Array<CategoryResponse>>(url);
  }
}
