import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {AccountLoginRequest} from '../../entity/account/account-login-request';
import {AuthenticationResponse} from '../../entity/account/authentication-response';
import {AccountDataRequest} from '../../entity/account/account-data-request';
import {WholesaleGoodsAdvertisementRequest} from '../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-goods-advertisement-request';
import {RetailGoodsAdvertisementRequest} from '../../entity/advertisement/goodsAdvertisement/retailGoodsAdvertisement/retail-goods-advertisement-request';
import {GoodsAdvertisementForSearchResponse} from '../../entity/advertisement/goodsAdvertisement/goods-advertisement-for-search-response';
import {GoodsAdvertisementSearchRequest} from '../../entity/advertisement/goodsAdvertisement/goods-advertisement-search-request';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  constructor(private httpClient: HttpClient) {
  }

  advertisementURL = GlobalConstants.API_URL + 'advertisement';

  wholesaleAdvertisementURL = GlobalConstants.API_URL + 'wholesale-goods';

  retailAdvertisementURL = GlobalConstants.API_URL + 'retail-goods';


  getAdvertisementCount(id: number): Observable<number> {
    const url = this.advertisementURL + '/count?id=' + id;
    return this.httpClient.get<number>(url);
  }

  createWholeSaleAdvertisement(request: WholesaleGoodsAdvertisementRequest): Observable<any> {
    const url = this.advertisementURL + '/wholesale';
    return this.httpClient.post(
      url,
      request,
      {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  createRetailAdvertisement(request: RetailGoodsAdvertisementRequest): Observable<any> {
    const url = this.advertisementURL + '/retail';
    return this.httpClient.post(
      url,
      request,
      {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  findAllByFilters(request: GoodsAdvertisementSearchRequest): Observable<any> {
    const fromCountryCode = request.fromCountryCode !== null ? 'fromCountryCode=' + request.fromCountryCode + '&' : '';
    const image = request.image ? 'image=' + request.image + '&' : '';
    const pageDirection = 'paginationRequest.direction=' + request.paginationRequest.direction + '&';
    const pageField = request.paginationRequest.field !== null ? 'paginationRequest.field=' + request.paginationRequest.field + '&' : '';
    const pagePage = 'paginationRequest.page=' + request.paginationRequest.page + '&';
    const pageSize = 'paginationRequest.size=' + request.paginationRequest.size + '&';
    const rating = request.rating !== null ? 'rating=' + request.rating + '&' : '';
    const title = request.title !== null ? 'title=' + request.title : '';
    const url = this.advertisementURL + '/filter?' + fromCountryCode + image + pageDirection + pageField + pagePage + pageSize + rating + title;
    return this.httpClient.get<any>(url);
  }

  getAdvertisementImagePath(imageName: string | null, sellerId: number): string {
    return imageName !== null && imageName !== '' ? GlobalConstants.API_URL + 'image/user_' + sellerId + '/advertisements/' + imageName : 'https://sunliberty.com.ua/wp-content/themes/brixel/images/No-Image-Found-400x264.png';
  }

}
