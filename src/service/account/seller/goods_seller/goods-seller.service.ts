import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GoodsSellerDataRequest} from '../../../../entity/account/seller/goods_seller/goods-seller-data-request';
import {GlobalConstants} from '../../../../common/global-constants';
import {GoodsSellerProfileResponse} from '../../../../entity/account/seller/goods_seller/goods-seller-profile-response';

@Injectable({
  providedIn: 'root'
})
export class GoodsSellerService {
  constructor(private httpClient: HttpClient) {
  }

  goodsSellerURL = GlobalConstants.API_URL + 'goods-seller';

  updateGoodsSellerData(goodsSelleDataRequest: GoodsSellerDataRequest): Observable<any> {
    const url = this.goodsSellerURL + '/update';
    return this.httpClient.put<any>(url, goodsSelleDataRequest, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  getGoodsSellerProfile(): Observable<GoodsSellerProfileResponse> {
    return this.httpClient.get<GoodsSellerProfileResponse>(this.goodsSellerURL, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  getGoodsSellerProfileForView(id: number): Observable<GoodsSellerProfileResponse> {
    const url = this.goodsSellerURL + '?id=' + id;
    return this.httpClient.get<GoodsSellerProfileResponse>(url, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

}
