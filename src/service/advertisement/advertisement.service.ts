import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {AccountLoginRequest} from '../../entity/account/account-login-request';
import {AuthenticationResponse} from '../../entity/account/authentication-response';
import {AccountDataRequest} from '../../entity/account/account-data-request';
import {WholesaleGoodsAdvertisementRequest} from '../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-goods-advertisement-request';
import {RetailGoodsAdvertisementRequest} from '../../entity/advertisement/goodsAdvertisement/retailGoodsAdvertisement/retail-goods-advertisement-request';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  constructor(private httpClient: HttpClient) {
  }

  advertisementURL = GlobalConstants.API_URL + 'advertisement';

  wholesaleAdvertisementURL = GlobalConstants.API_URL + 'wholesale-goods';

  retailAdvertisementURL = GlobalConstants.API_URL + 'retail-goods';

  createWholeSaleAdvertisement(request: WholesaleGoodsAdvertisementRequest): Observable<any> {
    return this.httpClient.post(
      this.wholesaleAdvertisementURL,
      request,
      {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  createRetailAdvertisement(request: RetailGoodsAdvertisementRequest): Observable<any> {
    return this.httpClient.post(
      this.retailAdvertisementURL,
      request,
      {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

}
