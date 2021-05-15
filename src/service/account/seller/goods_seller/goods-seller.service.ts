import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GoodsSellerDataRequest} from '../../../../entity/account/seller/goods_seller/goods-seller-data-request';
import {GlobalConstants} from '../../../../common/global-constants';
import {GoodsSellerProfileResponse} from '../../../../entity/account/seller/goods_seller/goods-seller-profile-response';
import {GoodsSellerDataResponse} from '../../../../entity/account/seller/goods_seller/goods-seller-data-response';
import {GoodsSellerStatisticsResponse} from '../../../../entity/statistics/account/seller/goods-seller-statistics-response';
import {GoodsSellerMonthStatisticsResponse} from '../../../../entity/statistics/account/seller/goods-seller-month-statistics-response';
import {GoodsSellerAdvertisementCategoryWithChildrenResponse} from '../../../../entity/account/seller/goods_seller/category/elements/goods-seller-advertisement-category-with-children-response';
import {GoodsSellerAdvertisementCategoryRequest} from '../../../../entity/account/seller/goods_seller/category/elements/goods-seller-advertisement-category-request';
import {ImageRequest} from '../../../../entity/account/image-request';
import {GoodsSellerMainDataRequest} from '../../../../entity/account/seller/goods_seller/goods-seller-main-data-request';
import {NavigationService} from '../../../../common/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsSellerService {
  constructor(private httpClient: HttpClient, private navigationService: NavigationService) {
  }

  goodsSellerURL = GlobalConstants.API_URL + 'goods-seller';

  updateGoodsSellerData(goodsSelleDataRequest: GoodsSellerDataRequest): Observable<any> {
    const url = this.goodsSellerURL + '/update';
    return this.httpClient.put<any>(url, goodsSelleDataRequest, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  updateGoodsSellerMainData(request: GoodsSellerMainDataRequest): Observable<any> {
    const url = this.goodsSellerURL + '/main-data';
    return this.httpClient.put<any>(url, request, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getGoodsSellerProfileData(): Observable<GoodsSellerProfileResponse> {
    const url = this.goodsSellerURL + '/profile-data';
    return this.httpClient.get<GoodsSellerProfileResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getGoodsSellerStatistics(): Observable<GoodsSellerStatisticsResponse> {
    const url = this.goodsSellerURL + '/statistics';
    return this.httpClient.get<GoodsSellerStatisticsResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getGoodsSellerMonthStatistics(month: string, year: string): Observable<GoodsSellerMonthStatisticsResponse> {
    const url = this.goodsSellerURL + '/month-statistics?' + '&month=' + month + '&year=' + year;
    return this.httpClient.get<GoodsSellerMonthStatisticsResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }


  getGoodsSellerProfileForView(id: number): Observable<GoodsSellerProfileResponse> {
    const url = this.goodsSellerURL + '?id=' + id;
    return this.httpClient.get<GoodsSellerProfileResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  loadSellerData(): Observable<GoodsSellerDataResponse> {
    const url = this.goodsSellerURL + '/data';
    return this.httpClient.get<GoodsSellerDataResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getSellerCategoriesTree(id: number): Observable<Array<GoodsSellerAdvertisementCategoryWithChildrenResponse>> {
    const url = this.goodsSellerURL + '/category-tree?id=' + id;
    return this.httpClient.get<Array<GoodsSellerAdvertisementCategoryWithChildrenResponse>>(url);
  }

  createGoodsSellerCategory(category: GoodsSellerAdvertisementCategoryRequest): Observable<any> {
    const url = this.goodsSellerURL + '/create-category';
    return this.httpClient.post(url, category, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  changeGoodsSellerBanner(request: ImageRequest): Observable<any> {
    const url = this.goodsSellerURL + '/banner';
    return this.httpClient.put(url, request, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }
}
