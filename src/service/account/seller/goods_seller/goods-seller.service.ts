import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GoodsSellerDataRequest} from '../../../../entity/account/seller/goods_seller/goods-seller-data-request';
import {GlobalConstants} from '../../../../common/global-constants';

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

}
