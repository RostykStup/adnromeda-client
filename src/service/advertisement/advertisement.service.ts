import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {GoodsAdvertisementSearchRequest} from '../../entity/advertisement/goodsAdvertisement/goods-advertisement-search-request';
import {PaginationRequest} from '../../entity/pagination-request';
import {PaginationResponse} from '../../entity/pagination-response';
import {GoodsAdvertisementResponse} from '../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';
import {PropertyRequest} from '../../entity/advertisement/goodsAdvertisement/property-request';
import {GoodsAdvertisementStatisticsResponse} from '../../entity/statistics/advertisement/GoodsAdvertisementStatisticsResponse';
import {GoodsAdvertisementMonthStatisticsResponse} from '../../entity/statistics/advertisement/goods-advertisement-month-statistics-response';
import {GoodsAdvertisementsForMainPageResponse} from '../../entity/advertisement/goodsAdvertisement/goods-advertisements-for-main-page-response';
import {GoodsAdvertisementRequest} from '../../entity/advertisement/goodsAdvertisement/goods-advertisement-request';
import {GoodsAdvertisementForSearchResponse} from '../../entity/advertisement/goodsAdvertisement/goods-advertisement-for-search-response';
import {NavigationService} from '../../common/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  constructor(private httpClient: HttpClient, private navigationService: NavigationService) {
  }

  advertisementURL = GlobalConstants.API_URL + 'advertisement';


  getMainPageAdvertisements(request: PaginationRequest): Observable<GoodsAdvertisementsForMainPageResponse> {
    const url = this.advertisementURL + '/get-for-main';
    let params = new HttpParams();
    params = params.append('page', request.page.toString());
    params = params.append('size', request.size.toString());
    return this.httpClient.get<GoodsAdvertisementsForMainPageResponse>(url, {
      headers: this.navigationService.getCurrentRequestAuthorizationHeader(),
      params
    });
  }

  sendGoodsAdvertisementCreateRequest(request: GoodsAdvertisementRequest): Observable<any> {
    return this.httpClient.post(this.advertisementURL, request, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }


  getSellerAdvertisementsPage(id: string | null, request: PaginationRequest): Observable<PaginationResponse<GoodsAdvertisementForSearchResponse>> {
    const url = this.advertisementURL + '/seller?' + (id !== null ? 'id=' + id : '')
      + '&' + NavigationService.convertPaginationRequestToParamsQuery(request);
    return this.httpClient.get<PaginationResponse<GoodsAdvertisementForSearchResponse>>(url,
      {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getAdvertisementParameterCount(paramsId: number): Observable<number> {
    const url = this.advertisementURL + '/count?paramsId=' + paramsId;
    return this.httpClient.get<number>(url);
  }


  findAllByFilters(request: GoodsAdvertisementSearchRequest): Observable<PaginationResponse<GoodsAdvertisementForSearchResponse>> {
    console.log(request);
    return this.httpClient.post<PaginationResponse<GoodsAdvertisementForSearchResponse>>(
      this.advertisementURL + '/filter', request, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getAdvertisementImagePath(imageName: string | null, sellerId: number): string {
    return imageName !== null && imageName !== '' ? GlobalConstants.API_URL + 'image/user_' + sellerId + '/advertisements/' + imageName : 'https://sunliberty.com.ua/wp-content/themes/brixel/images/No-Image-Found-400x264.png';
  }

  changeAdvertisementTitle(id: number, title: string): Observable<any> {
    const url = this.advertisementURL + '/change-title?id=' + id;
    return this.httpClient.put(url, title, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  changeAdvertisementCount(id: number, count: number): Observable<any> {
    const url = this.advertisementURL + '/change-count?id=' + id;
    return this.httpClient.put(url, count, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  changeAdvertisementDescription(id: number, description: string): Observable<any> {
    const url = this.advertisementURL + '/change-description?id=' + id;
    return this.httpClient.put(url, description, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  changeAdvertisementProperties(id: number, properties: Array<PropertyRequest>): Observable<any> {
    const url = this.advertisementURL + '/change-properties?id=' + id;
    return this.httpClient.put(url, properties, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  changeAdvertisementDeliveries(id: number, deliveries: Array<number>): Observable<any> {
    const url = this.advertisementURL + '/change-deliveries?id=' + id;
    return this.httpClient.put(url, deliveries, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  changeAdvertisementOnlySellerDelivery(id: number, isOnly: boolean): Observable<any> {
    const url = this.advertisementURL + '/change-sellerDelivery?id=' + id + '&isOnly=' + isOnly;
    return this.httpClient.put(url, null, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  addImageToAdvertisement(id: number, image: string): Observable<string> {
    const url = this.advertisementURL + '/add-image?id=' + id;
    return this.httpClient.put<string>(url, image, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  makeMainImageToGoodsAdvertisement(id: number, image: string): Observable<any> {
    const url = this.advertisementURL + '/main-image?id=' + id + '&image=' + image;
    return this.httpClient.put(url, null, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  deleteGoodsAdvertisementImage(id: number, image: string): Observable<any> {
    const url = this.advertisementURL + '/delete-image?id=' + id + '&image=' + image;
    return this.httpClient.put(url, null, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getAdvertisementStatistics(id: number): Observable<GoodsAdvertisementStatisticsResponse> {
    const url = this.advertisementURL + '/statistics?id=' + id;
    return this.httpClient.get<GoodsAdvertisementStatisticsResponse>(url);
  }

  getAdvertisementMonthStatistics(id: number, month: string, year: string): Observable<GoodsAdvertisementMonthStatisticsResponse> {
    const url = this.advertisementURL + '/month-statistics?id=' + id + '&month=' + month + '&year=' + year;
    return this.httpClient.get<GoodsAdvertisementMonthStatisticsResponse>(url);
  }

  addToUserFavorites(id: number): Observable<any> {
    const url = this.advertisementURL + '/add-to-favorites?id=' + id;
    return this.httpClient.put(url, null, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  deleteFromUserFavorites(id: number): Observable<any> {
    const url = this.advertisementURL + '/remove-from-favorites?id=' + id;
    return this.httpClient.put(url, null, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  isInUserFavorites(id: number): Observable<boolean> {
    const url = this.advertisementURL + '/is-in-favorites?id=' + id;
    return this.httpClient.get<boolean>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getUserFavoritesAdvertisementsPage(pagination: PaginationRequest): Observable<PaginationResponse<GoodsAdvertisementResponse>> {
    let params = new HttpParams();
    params = params.append('page', pagination.page.toString());
    params = params.append('size', pagination.size.toString());
    const url = this.advertisementURL + '/favorites';
    return this.httpClient.get<PaginationResponse<GoodsAdvertisementResponse>>(
      url,
      {
        headers: this.navigationService.getCurrentRequestAuthorizationHeader(),
        params
      }
    );
  }

  setAdvertisementView(id: number): Observable<any> {
    const url = this.advertisementURL + '/view?id=' + id;
    return this.httpClient.put(url, null, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  findByIdOrTitleContains(value: string, sellerId: string | null): Observable<Array<GoodsAdvertisementForSearchResponse>> {
    const url = this.advertisementURL + '/find-by-value?value=' + value
      + (sellerId !== null ? '&sellerId=' + sellerId : '');
    return this.httpClient.get<Array<GoodsAdvertisementForSearchResponse>>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }


  getGoodsAdvertisementById(id: number): Observable<GoodsAdvertisementResponse> {
    const url = this.advertisementURL + '?id=' + id;
    return this.httpClient.get<GoodsAdvertisementResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }
}
