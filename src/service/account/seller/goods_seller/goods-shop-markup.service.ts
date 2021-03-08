import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../../../common/global-constants';
import {GoodsShopMarkupAdvertisingBannerRequest} from '../../../../entity/account/seller/goods_seller/markup/elements/goods-shop-markup-advertising-banner-request';
import {GoodsShopMarkupAdvertisementViewRequest} from '../../../../entity/account/seller/goods_seller/markup/elements/goods-shop-markup-advertisement-view-request';
import {GoodsShopMarkupAdvertisementRowRequest} from '../../../../entity/account/seller/goods_seller/markup/elements/goods-shop-markup-advertisement-row-request';
import {GoodsShopMarkupAdvertisingBannerResponse} from '../../../../entity/account/seller/goods_seller/markup/elements/goods-shop-markup-advertising-banner-response';
import {GoodsShopMarkupAdvertisementRowResponse} from '../../../../entity/account/seller/goods_seller/markup/elements/goods-shop-markup-advertisement-row-response';
import {GoodsShopMarkupAdvertisementViewResponse} from '../../../../entity/account/seller/goods_seller/markup/elements/goods-shop-markup-advertisement-view-response';
import {GoodsShopMarkupResponse} from '../../../../entity/account/seller/goods_seller/markup/goods-shop-markup-response';


@Injectable({
  providedIn: 'root'
})
export class GoodsSellerService {
  constructor(private httpClient: HttpClient) {
  }

  goodsShopURL = GlobalConstants.API_URL + 'goods-shop-markup';

  createBanner(banner: GoodsShopMarkupAdvertisingBannerRequest): Observable<any> {
    const url = this.goodsShopURL + '/create-banner';
    return this.httpClient.post(url, banner, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  createView(view: GoodsShopMarkupAdvertisementViewRequest): Observable<any> {
    const url = this.goodsShopURL + '/create-view';
    return this.httpClient.post(url, view, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  createRow(row: GoodsShopMarkupAdvertisementRowRequest): Observable<any> {
    const url = this.goodsShopURL + '/create-row';
    return this.httpClient.post(url, row, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  getBannerByElementId(id: number): Observable<GoodsShopMarkupAdvertisingBannerResponse> {
    const url = this.goodsShopURL + '/banner?id=' + id;
    return this.httpClient.get<GoodsShopMarkupAdvertisingBannerResponse>(url);
  }

  getRowByElementId(id: number): Observable<GoodsShopMarkupAdvertisementRowResponse> {
    const url = this.goodsShopURL + '/row?id=' + id;
    return this.httpClient.get<GoodsShopMarkupAdvertisementRowResponse>(url);
  }

  getViewByElementId(id: number): Observable<GoodsShopMarkupAdvertisementViewResponse> {
    const url = this.goodsShopURL + '/row?id=' + id;
    return this.httpClient.get<GoodsShopMarkupAdvertisementViewResponse>(url);
  }

  getMarkupBySellerId(id: number): Observable<GoodsShopMarkupResponse> {
    const url = this.goodsShopURL + '?id=' + id;
    return this.httpClient.get<GoodsShopMarkupResponse>(url);
  }

}
