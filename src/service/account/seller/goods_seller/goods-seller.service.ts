import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GoodsSellerDataRequest} from '../../../../entity/account/seller/goods_seller/goods-seller-data-request';
import {GlobalConstants} from '../../../../common/global-constants';
import {GoodsSellerProfileResponse} from '../../../../entity/account/seller/goods_seller/goods-seller-profile-response';
import {GoodsSellerDataResponse} from '../../../../entity/account/seller/goods_seller/goods-seller-data-response';
import {GoodsSellerStatisticsResponse} from '../../../../entity/statistics/account/seller/goods-seller-statistics-response';
import {GoodsSellerMonthStatisticsResponse} from '../../../../entity/statistics/account/seller/goods-seller-month-statistics-response';
import {GoodsSellerAdvertisementCategoryWithChildrenResponse} from '../../../../entity/account/seller/goods_seller/category/goods-seller-advertisement-category-with-children-response';
import {GoodsSellerAdvertisementCategoryRequest} from '../../../../entity/account/seller/goods_seller/category/goods-seller-advertisement-category-request';

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

  getGoodsSellerStatistics(): Observable<GoodsSellerStatisticsResponse> {
    const url = this.goodsSellerURL + '/statistics';
    return this.httpClient.get<GoodsSellerStatisticsResponse>(url, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  getGoodsSellerMonthStatistics(month: string, year: string): Observable<GoodsSellerMonthStatisticsResponse> {
    const url = this.goodsSellerURL + '/month-statistics?' + '&month=' + month + '&year=' + year;
    return this.httpClient.get<GoodsSellerMonthStatisticsResponse>(url, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }


  getGoodsSellerProfileForView(id: number): Observable<GoodsSellerProfileResponse> {
    const url = this.goodsSellerURL + '?id=' + id;
    return this.httpClient.get<GoodsSellerProfileResponse>(url, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  loadSellerData(): Observable<GoodsSellerDataResponse> {
    const url = this.goodsSellerURL + '/data';
    return this.httpClient.get<GoodsSellerDataResponse>(url, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  getSellerCategoriesTree(id: number): Observable<Array<GoodsSellerAdvertisementCategoryWithChildrenResponse>> {
    const url = this.goodsSellerURL + '/category-tree?id=' + id;
    return this.httpClient.get<Array<GoodsSellerAdvertisementCategoryWithChildrenResponse>>(url);
  }

  createGoodsSellerCategory(category: GoodsSellerAdvertisementCategoryRequest): Observable<any> {
    const url = this.goodsSellerURL + '/create-category';
    return this.httpClient.post(url, category, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }
}
