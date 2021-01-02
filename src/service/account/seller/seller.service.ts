import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SellerDataRequest} from '../../../entity/account/seller/seller-data-request';
import {GlobalConstants} from '../../../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  constructor(private httpClient: HttpClient) {
  }

  sellerURL = GlobalConstants.API_URL + 'seller';

  updateSellerData(sellerDataRequest: SellerDataRequest): Observable<any> {
    const url = this.sellerURL + '/update';
    return this.httpClient.put<any>(url, sellerDataRequest, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }
}
